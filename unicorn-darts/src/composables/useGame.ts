import { ref, computed, toRaw } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import type { Game, Turn, GameStatus } from '@/types/game'
import type { Player } from '@/types/player'
import { useDatabase } from './useDatabase'
import { calculateScore, isBust, isWin } from '@/utils/scoring'
import { v4 as uuidv4 } from 'uuid'
import { STARTING_SCORE } from '@/utils/constants'

export function useGame() {
  const db = useDatabase()

  const currentGame = ref<Game | null>(null)
  const players = ref<Player[]>([])

  const currentPlayer = computed(() => {
    if (!currentGame.value) return undefined
    const playerId = currentGame.value.playerIds[currentGame.value.currentPlayerIndex]
    return players.value.find(p => p.id === playerId)
  })

  const canUndo = computed(() => {
    return currentGame.value && currentGame.value.turns.length > 0
  })

  async function startNewGame(playerIds: string[]): Promise<Game> {
    // Load players
    players.value = await Promise.all(
      playerIds.map(id => db.getPlayer(id))
    ).then(results => results.filter(Boolean) as Player[])

    if (players.value.length === 0) {
      throw new Error('No valid players selected')
    }

    // Create game data
    const gameData: Omit<Game, 'id'> = {
      startingScore: STARTING_SCORE,
      playerIds,
      status: 'in-progress',
      currentPlayerIndex: 0,
      currentRound: 1,
      scores: playerIds.map(playerId => ({
        playerId,
        currentScore: STARTING_SCORE,
        dartsThrown: 0
      })),
      turns: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const game = await db.addGame(gameData)
    currentGame.value = game
    return game
  }

  async function loadGame(id: string): Promise<void> {
    const game = await db.getGame(id)
    if (!game) throw new Error('Game not found')

    currentGame.value = game

    // Load players
    players.value = await Promise.all(
      game.playerIds.map(id => db.getPlayer(id))
    ).then(results => results.filter(Boolean) as Player[])
  }

  async function recordTurn(throwScores: number[], lastIsDouble: boolean = false): Promise<void> {
    if (!currentGame.value) throw new Error('No active game')

    const game = currentGame.value
    const playerId = game.playerIds[game.currentPlayerIndex]
    const playerScore = game.scores.find(s => s.playerId === playerId)!

    const totalScore = throwScores.reduce((sum, s) => sum + s, 0)
    const newScore = calculateScore(playerScore.currentScore, throwScores)
    const bustDetected = isBust(playerScore.currentScore, throwScores)
    const winDetected = isWin(playerScore.currentScore, throwScores, lastIsDouble)

    // Create turn record
    const turn: Turn = {
      id: uuidv4(),
      playerId,
      round: game.currentRound,
      throws: throwScores.map(score => ({
        score,
        multiplier: 1, // MVP: not tracking individual dart details
        section: 0
      })),
      totalScore,
      remainingAfter: bustDetected ? playerScore.currentScore : newScore,
      isBust: bustDetected,
      isWin: winDetected,
      timestamp: new Date()
    }

    // Create updated game object
    const updatedGame: Game = {
      ...game,
      turns: [...game.turns, turn],
      scores: game.scores.map(s =>
        s.playerId === playerId
          ? {
              ...s,
              currentScore: bustDetected ? s.currentScore : newScore,
              dartsThrown: s.dartsThrown + throwScores.length
            }
          : s
      ),
      updatedAt: new Date()
    }

    if (winDetected) {
      updatedGame.status = 'completed'
      updatedGame.winnerId = playerId
      updatedGame.completedAt = new Date()

      // Update winner stats
      await updatePlayerStats(playerId, updatedGame)
    } else {
      // Move to next player
      updatedGame.currentPlayerIndex = (game.currentPlayerIndex + 1) % game.playerIds.length

      // Increment round if back to first player
      if (updatedGame.currentPlayerIndex === 0) {
        updatedGame.currentRound++
      }
    }

    await db.updateGame(updatedGame.id, toRaw(updatedGame))
    currentGame.value = updatedGame
  }

  async function undoLastTurn(): Promise<void> {
    if (!currentGame.value || !canUndo.value) return

    const game = currentGame.value
    const lastTurn = game.turns[game.turns.length - 1]

    // Revert player index
    const newPlayerIndex = (game.currentPlayerIndex - 1 + game.playerIds.length) % game.playerIds.length

    // Revert round if needed
    const newRound = newPlayerIndex === game.playerIds.length - 1
      ? Math.max(1, game.currentRound - 1)
      : game.currentRound

    // Create updated game object
    const updatedGame: Game = {
      ...game,
      turns: game.turns.slice(0, -1),
      scores: game.scores.map(s =>
        s.playerId === lastTurn.playerId
          ? {
              ...s,
              currentScore: lastTurn.isBust ? s.currentScore : s.currentScore + lastTurn.totalScore,
              dartsThrown: s.dartsThrown - lastTurn.throws.length
            }
          : s
      ),
      currentPlayerIndex: newPlayerIndex,
      currentRound: newRound,
      status: game.status === 'completed' ? 'in-progress' : game.status,
      winnerId: game.status === 'completed' ? undefined : game.winnerId,
      completedAt: game.status === 'completed' ? undefined : game.completedAt,
      updatedAt: new Date()
    }

    await db.updateGame(updatedGame.id, toRaw(updatedGame))
    currentGame.value = updatedGame
  }

  async function endGame(status: 'completed' | 'abandoned'): Promise<void> {
    if (!currentGame.value) return

    const updatedGame: Game = {
      ...currentGame.value,
      status,
      completedAt: new Date(),
      updatedAt: new Date()
    }

    await db.updateGame(updatedGame.id, toRaw(updatedGame))
    currentGame.value = updatedGame
  }

  async function updatePlayerStats(playerId: string, game: Game): Promise<void> {
    const player = await db.getPlayer(playerId)
    if (!player) return

    const playerTurns = game.turns.filter(t => t.playerId === playerId && !t.isBust)
    const totalScore = playerTurns.reduce((sum, t) => sum + t.totalScore, 0)
    const avgScore = playerTurns.length > 0 ? totalScore / playerTurns.length : 0
    const highestScore = Math.max(...playerTurns.map(t => t.totalScore), 0)
    const count180s = playerTurns.filter(t => t.totalScore === 180).length

    // Update cumulative stats
    const prevAvg = player.stats.averageScore
    const prevGames = player.stats.gamesPlayed
    const newGamesPlayed = prevGames + 1

    player.stats.gamesPlayed = newGamesPlayed
    player.stats.gamesWon++
    player.stats.totalDartsThrown += playerTurns.reduce((sum, t) => sum + t.throws.length, 0)
    player.stats.averageScore = (prevAvg * prevGames + avgScore) / newGamesPlayed
    player.stats.highestScore = Math.max(player.stats.highestScore, highestScore)
    player.stats.favorite180s += count180s

    player.updatedAt = new Date()
    await db.updatePlayer(playerId, player)
  }

  function getPlayerScore(playerId: string): ComputedRef<number> {
    return computed(() => {
      if (!currentGame.value) return STARTING_SCORE
      const score = currentGame.value.scores.find(s => s.playerId === playerId)
      return score?.currentScore ?? STARTING_SCORE
    })
  }

  const getCurrentRound = computed(() => currentGame.value?.currentRound ?? 1)
  const getTurnHistory = computed(() => currentGame.value?.turns ?? [])

  return {
    currentGame,
    currentPlayer,
    canUndo,
    players,
    startNewGame,
    loadGame,
    recordTurn,
    undoLastTurn,
    endGame,
    getPlayerScore,
    getCurrentRound,
    getTurnHistory
  }
}
