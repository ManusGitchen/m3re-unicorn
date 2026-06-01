import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import 'fake-indexeddb/auto'
import { useGame } from '@/composables/useGame'
import { useDatabase } from '@/composables/useDatabase'
import { usePlayer } from '@/composables/usePlayer'
import { DB_NAME } from '@/utils/constants'
import type { Player } from '@/types/player'

describe('Game Flow Integration', () => {
  let game: ReturnType<typeof useGame>
  let playerComposable: ReturnType<typeof usePlayer>
  let testPlayers: Player[]

  beforeEach(async () => {
    // Clear database
    const deleteReq = indexedDB.deleteDatabase(DB_NAME)
    await new Promise<void>((resolve) => {
      deleteReq.onsuccess = () => resolve()
      deleteReq.onerror = () => resolve()
    })

    game = useGame()
    playerComposable = usePlayer()
    const db = useDatabase()
    await db.init()

    // Create test players
    const player1 = await playerComposable.createPlayer('Alice', '/images/players/avatar1.png')
    const player2 = await playerComposable.createPlayer('Bob', '/images/players/avatar2.png')
    testPlayers = [player1, player2]
  })

  afterEach(async () => {
    const db = useDatabase()
    await db.close()
    const deleteReq = indexedDB.deleteDatabase(DB_NAME)
    await new Promise<void>((resolve) => {
      deleteReq.onsuccess = () => resolve()
      deleteReq.onerror = () => resolve()
    })
  })

  it('should start a new game with players', async () => {
    const playerIds = testPlayers.map(p => p.id)
    const newGame = await game.startNewGame(playerIds)

    expect(newGame).toBeDefined()
    expect(newGame.status).toBe('in-progress')
    expect(newGame.playerIds).toEqual(playerIds)
    expect(newGame.scores).toHaveLength(2)
    expect(newGame.scores[0].currentScore).toBe(501)
    expect(newGame.currentPlayerIndex).toBe(0)
    expect(newGame.currentRound).toBe(1)
  })

  it('should record turns and rotate players', async () => {
    await game.startNewGame(testPlayers.map(p => p.id))

    // Player 1 scores 60
    await game.recordTurn([60])
    expect(game.currentGame.value?.scores[0].currentScore).toBe(441)
    expect(game.currentGame.value?.currentPlayerIndex).toBe(1)
    expect(game.currentGame.value?.turns).toHaveLength(1)

    // Player 2 scores 100
    await game.recordTurn([100])
    expect(game.currentGame.value?.scores[1].currentScore).toBe(401)
    expect(game.currentGame.value?.currentPlayerIndex).toBe(0)
    expect(game.currentGame.value?.currentRound).toBe(2)
    expect(game.currentGame.value?.turns).toHaveLength(2)
  })

  it('should handle bust correctly - score unchanged', async () => {
    await game.startNewGame(testPlayers.map(p => p.id))

    // Player 1 scores 461 (leaving them at 40)
    await game.recordTurn([461])
    expect(game.currentGame.value?.scores[0].currentScore).toBe(40)

    // Player 2's turn - try to bust (score 600 would go way negative)
    await game.recordTurn([600])

    const player2Score = game.currentGame.value?.scores[1]
    expect(player2Score?.currentScore).toBe(501) // Player 2 should still be at 501
    expect(game.currentGame.value?.turns[1].isBust).toBe(true)
    expect(game.currentGame.value?.turns[1].remainingAfter).toBe(501)
  })

  it('should handle bust when score would equal 1', async () => {
    await game.startNewGame(testPlayers.map(p => p.id))

    // Player 1 scores 460 (leaving them at 41)
    await game.recordTurn([460])
    expect(game.currentGame.value?.scores[0].currentScore).toBe(41)

    // Player 2 scores 500 (leaving them at 1 - bust!)
    await game.recordTurn([500])

    expect(game.currentGame.value?.scores[1].currentScore).toBe(501) // Should stay at 501
    expect(game.currentGame.value?.turns[1].isBust).toBe(true)
  })

  it('should detect win and update stats', async () => {
    await game.startNewGame(testPlayers.map(p => p.id))

    // Player 1 gets to 40
    await game.recordTurn([461])

    // Player 2 turn (just for rotation)
    await game.recordTurn([50])

    // Player 1 wins with double
    await game.recordTurn([40], true)

    expect(game.currentGame.value?.status).toBe('completed')
    expect(game.currentGame.value?.winnerId).toBe(testPlayers[0].id)
    expect(game.currentGame.value?.scores[0].currentScore).toBe(0)

    // Reload player to get fresh stats from DB
    const db = useDatabase()
    const winner = await db.getPlayer(testPlayers[0].id)
    expect(winner?.stats.gamesPlayed).toBe(1)
    expect(winner?.stats.gamesWon).toBe(1)
  })

  it('should not win without double', async () => {
    await game.startNewGame(testPlayers.map(p => p.id))

    // Get to 40
    await game.recordTurn([461])
    await game.recordTurn([50])

    // Try to win without double
    await game.recordTurn([40], false)

    expect(game.currentGame.value?.status).toBe('in-progress')
    expect(game.currentGame.value?.scores[0].currentScore).toBe(0)
    expect(game.currentGame.value?.turns[2].isWin).toBe(false)
  })

  it('should undo last turn', async () => {
    await game.startNewGame(testPlayers.map(p => p.id))

    await game.recordTurn([60])
    expect(game.currentGame.value?.scores[0].currentScore).toBe(441)

    await game.undoLastTurn()
    expect(game.currentGame.value?.scores[0].currentScore).toBe(501)
    expect(game.currentGame.value?.turns).toHaveLength(0)
    expect(game.currentGame.value?.currentPlayerIndex).toBe(0)
  })

  it('should undo bust turn correctly', async () => {
    await game.startNewGame(testPlayers.map(p => p.id))

    // Player 1 scores normally
    await game.recordTurn([60])

    // Player 2 busts
    await game.recordTurn([600])
    expect(game.currentGame.value?.scores[1].currentScore).toBe(501)
    expect(game.currentGame.value?.turns[1].isBust).toBe(true)

    // Undo bust
    await game.undoLastTurn()
    expect(game.currentGame.value?.scores[1].currentScore).toBe(501)
    expect(game.currentGame.value?.turns).toHaveLength(1)
  })

  it('should handle multi-player game', async () => {
    // Add third player
    const player3 = await playerComposable.createPlayer('Charlie', '/images/players/avatar3.png')
    const allPlayers = [...testPlayers, player3]

    await game.startNewGame(allPlayers.map(p => p.id))

    // Round 1
    await game.recordTurn([50])  // Player 1
    await game.recordTurn([60])  // Player 2
    await game.recordTurn([70])  // Player 3

    expect(game.currentGame.value?.currentPlayerIndex).toBe(0)
    expect(game.currentGame.value?.currentRound).toBe(2)

    expect(game.currentGame.value?.scores[0].currentScore).toBe(451)
    expect(game.currentGame.value?.scores[1].currentScore).toBe(441)
    expect(game.currentGame.value?.scores[2].currentScore).toBe(431)
  })

  it('should track darts thrown', async () => {
    await game.startNewGame(testPlayers.map(p => p.id))

    await game.recordTurn([20, 20, 20])
    expect(game.currentGame.value?.scores[0].dartsThrown).toBe(3)

    await game.recordTurn([50])
    expect(game.currentGame.value?.scores[1].dartsThrown).toBe(1)
  })

  it('should end game manually', async () => {
    await game.startNewGame(testPlayers.map(p => p.id))

    await game.recordTurn([60])
    await game.endGame('abandoned')

    expect(game.currentGame.value?.status).toBe('abandoned')
    expect(game.currentGame.value?.completedAt).toBeDefined()
  })

  it('should load existing game', async () => {
    const newGame = await game.startNewGame(testPlayers.map(p => p.id))
    const gameId = newGame.id

    // Record some turns
    await game.recordTurn([60])
    await game.recordTurn([100])

    // Create new game instance and load
    const game2 = useGame()
    await game2.loadGame(gameId)

    expect(game2.currentGame.value?.id).toBe(gameId)
    expect(game2.currentGame.value?.turns).toHaveLength(2)
    expect(game2.players.value).toHaveLength(2)
  })

  it('should calculate player averages correctly', async () => {
    await game.startNewGame([testPlayers[0].id])

    // Score several turns
    await game.recordTurn([60])
    await game.recordTurn([80])
    await game.recordTurn([100])
    await game.recordTurn([261], true) // Win

    // Reload player to get fresh stats from DB
    const db = useDatabase()
    const player = await db.getPlayer(testPlayers[0].id)

    const expectedAvg = (60 + 80 + 100 + 261) / 4

    expect(player?.stats.averageScore).toBeCloseTo(expectedAvg, 1)
    expect(player?.stats.highestScore).toBe(261)
  })

  it('should handle edge case: undo win', async () => {
    await game.startNewGame(testPlayers.map(p => p.id))

    // Get to winning position
    await game.recordTurn([461])
    await game.recordTurn([50])
    await game.recordTurn([40], true) // Win

    expect(game.currentGame.value?.status).toBe('completed')

    // Undo win
    await game.undoLastTurn()

    expect(game.currentGame.value?.status).toBe('in-progress')
    expect(game.currentGame.value?.winnerId).toBeUndefined()
    expect(game.currentGame.value?.scores[0].currentScore).toBe(40)
  })
})
