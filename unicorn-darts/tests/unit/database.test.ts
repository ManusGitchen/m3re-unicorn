import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import 'fake-indexeddb/auto'
import { useDatabase } from '@/composables/useDatabase'
import type { Player } from '@/types/player'
import type { Game, GameStatus } from '@/types/game'
import { DB_NAME, STARTING_SCORE } from '@/utils/constants'

describe('useDatabase', () => {
  let db: ReturnType<typeof useDatabase>

  beforeEach(async () => {
    // Clean up any existing database
    const deleteReq = indexedDB.deleteDatabase(DB_NAME)
    await new Promise<void>((resolve) => {
      deleteReq.onsuccess = () => resolve()
      deleteReq.onerror = () => resolve()
    })

    db = useDatabase()
    await db.init()
  })

  afterEach(async () => {
    await db.close()
    const deleteReq = indexedDB.deleteDatabase(DB_NAME)
    await new Promise<void>((resolve) => {
      deleteReq.onsuccess = () => resolve()
      deleteReq.onerror = () => resolve()
    })
  })

  describe('init', () => {
    it('should initialize database successfully', async () => {
      const database = await db.init()
      expect(database.name).toBe(DB_NAME)
      expect(database.objectStoreNames.contains('players')).toBe(true)
      expect(database.objectStoreNames.contains('games')).toBe(true)
    })
  })

  describe('Player CRUD operations', () => {
    it('should add a player', async () => {
      const playerData: Omit<Player, 'id'> = {
        name: 'John Doe',
        imageUrl: '/images/john.jpg',
        stats: {
          gamesPlayed: 0,
          gamesWon: 0,
          totalDartsThrown: 0,
          averageScore: 0,
          highestScore: 0,
          checkoutRate: 0,
          favorite180s: 0
        },
        createdAt: new Date(),
        updatedAt: new Date()
      }

      const player = await db.addPlayer(playerData)

      expect(player.id).toBeDefined()
      expect(typeof player.id).toBe('string')
      expect(player.name).toBe('John Doe')
      expect(player.imageUrl).toBe('/images/john.jpg')
    })

    it('should get a player by id', async () => {
      const playerData: Omit<Player, 'id'> = {
        name: 'Jane Smith',
        imageUrl: '/images/jane.jpg',
        stats: {
          gamesPlayed: 5,
          gamesWon: 3,
          totalDartsThrown: 150,
          averageScore: 45.5,
          highestScore: 180,
          checkoutRate: 0.6,
          favorite180s: 2
        },
        createdAt: new Date(),
        updatedAt: new Date()
      }

      const addedPlayer = await db.addPlayer(playerData)
      const retrievedPlayer = await db.getPlayer(addedPlayer.id)

      expect(retrievedPlayer).toBeDefined()
      expect(retrievedPlayer?.id).toBe(addedPlayer.id)
      expect(retrievedPlayer?.name).toBe('Jane Smith')
      expect(retrievedPlayer?.stats.gamesWon).toBe(3)
    })

    it('should return undefined for non-existent player', async () => {
      const player = await db.getPlayer('non-existent-id')
      expect(player).toBeUndefined()
    })

    it('should get all players', async () => {
      const player1: Omit<Player, 'id'> = {
        name: 'Player 1',
        imageUrl: '/images/p1.jpg',
        stats: {
          gamesPlayed: 0,
          gamesWon: 0,
          totalDartsThrown: 0,
          averageScore: 0,
          highestScore: 0,
          checkoutRate: 0,
          favorite180s: 0
        },
        createdAt: new Date(),
        updatedAt: new Date()
      }

      const player2: Omit<Player, 'id'> = {
        name: 'Player 2',
        imageUrl: '/images/p2.jpg',
        stats: {
          gamesPlayed: 0,
          gamesWon: 0,
          totalDartsThrown: 0,
          averageScore: 0,
          highestScore: 0,
          checkoutRate: 0,
          favorite180s: 0
        },
        createdAt: new Date(),
        updatedAt: new Date()
      }

      await db.addPlayer(player1)
      await db.addPlayer(player2)

      const allPlayers = await db.getAllPlayers()
      expect(allPlayers.length).toBe(2)

      // Sort by name to ensure consistent order
      const sorted = allPlayers.sort((a, b) => a.name.localeCompare(b.name))
      expect(sorted[0].name).toBe('Player 1')
      expect(sorted[1].name).toBe('Player 2')
    })

    it('should update a player', async () => {
      const playerData: Omit<Player, 'id'> = {
        name: 'Old Name',
        imageUrl: '/images/old.jpg',
        stats: {
          gamesPlayed: 0,
          gamesWon: 0,
          totalDartsThrown: 0,
          averageScore: 0,
          highestScore: 0,
          checkoutRate: 0,
          favorite180s: 0
        },
        createdAt: new Date(),
        updatedAt: new Date()
      }

      const addedPlayer = await db.addPlayer(playerData)

      const updatedPlayer = await db.updatePlayer(addedPlayer.id, {
        name: 'New Name',
        imageUrl: '/images/new.jpg'
      })

      expect(updatedPlayer.name).toBe('New Name')
      expect(updatedPlayer.imageUrl).toBe('/images/new.jpg')
      expect(updatedPlayer.updatedAt.getTime()).toBeGreaterThan(addedPlayer.updatedAt.getTime())
    })

    it('should throw error when updating non-existent player', async () => {
      await expect(
        db.updatePlayer('non-existent-id', { name: 'New Name' })
      ).rejects.toThrow('Player not found')
    })

    it('should delete a player', async () => {
      const playerData: Omit<Player, 'id'> = {
        name: 'To Delete',
        imageUrl: '/images/delete.jpg',
        stats: {
          gamesPlayed: 0,
          gamesWon: 0,
          totalDartsThrown: 0,
          averageScore: 0,
          highestScore: 0,
          checkoutRate: 0,
          favorite180s: 0
        },
        createdAt: new Date(),
        updatedAt: new Date()
      }

      const addedPlayer = await db.addPlayer(playerData)
      await db.deletePlayer(addedPlayer.id)

      const deletedPlayer = await db.getPlayer(addedPlayer.id)
      expect(deletedPlayer).toBeUndefined()
    })

    it('should throw error when deleting non-existent player', async () => {
      await expect(
        db.deletePlayer('non-existent-id')
      ).rejects.toThrow('Player not found')
    })
  })

  describe('Game CRUD operations', () => {
    it('should add a game', async () => {
      const gameData: Omit<Game, 'id'> = {
        startingScore: STARTING_SCORE,
        playerIds: ['player1', 'player2'],
        status: 'in-progress' as GameStatus,
        currentPlayerIndex: 0,
        currentRound: 1,
        scores: [
          { playerId: 'player1', currentScore: 501, dartsThrown: 0 },
          { playerId: 'player2', currentScore: 501, dartsThrown: 0 }
        ],
        turns: [],
        createdAt: new Date(),
        updatedAt: new Date()
      }

      const game = await db.addGame(gameData)

      expect(game.id).toBeDefined()
      expect(typeof game.id).toBe('string')
      expect(game.startingScore).toBe(STARTING_SCORE)
      expect(game.playerIds.length).toBe(2)
      expect(game.status).toBe('in-progress')
    })

    it('should get a game by id', async () => {
      const gameData: Omit<Game, 'id'> = {
        startingScore: STARTING_SCORE,
        playerIds: ['player1'],
        status: 'in-progress' as GameStatus,
        currentPlayerIndex: 0,
        currentRound: 1,
        scores: [
          { playerId: 'player1', currentScore: 501, dartsThrown: 0 }
        ],
        turns: [],
        createdAt: new Date(),
        updatedAt: new Date()
      }

      const addedGame = await db.addGame(gameData)
      const retrievedGame = await db.getGame(addedGame.id)

      expect(retrievedGame).toBeDefined()
      expect(retrievedGame?.id).toBe(addedGame.id)
      expect(retrievedGame?.startingScore).toBe(STARTING_SCORE)
      expect(retrievedGame?.playerIds).toEqual(['player1'])
    })

    it('should return undefined for non-existent game', async () => {
      const game = await db.getGame('non-existent-id')
      expect(game).toBeUndefined()
    })

    it('should get all games', async () => {
      const game1: Omit<Game, 'id'> = {
        startingScore: STARTING_SCORE,
        playerIds: ['player1'],
        status: 'in-progress' as GameStatus,
        currentPlayerIndex: 0,
        currentRound: 1,
        scores: [{ playerId: 'player1', currentScore: 501, dartsThrown: 0 }],
        turns: [],
        createdAt: new Date(),
        updatedAt: new Date()
      }

      const game2: Omit<Game, 'id'> = {
        startingScore: STARTING_SCORE,
        playerIds: ['player2'],
        status: 'completed' as GameStatus,
        currentPlayerIndex: 0,
        currentRound: 10,
        scores: [{ playerId: 'player2', currentScore: 0, dartsThrown: 30 }],
        turns: [],
        winnerId: 'player2',
        createdAt: new Date(),
        updatedAt: new Date(),
        completedAt: new Date()
      }

      await db.addGame(game1)
      await db.addGame(game2)

      const allGames = await db.getGames()
      expect(allGames.length).toBe(2)
    })

    it('should get games by status', async () => {
      const inProgressGame: Omit<Game, 'id'> = {
        startingScore: STARTING_SCORE,
        playerIds: ['player1'],
        status: 'in-progress' as GameStatus,
        currentPlayerIndex: 0,
        currentRound: 1,
        scores: [{ playerId: 'player1', currentScore: 501, dartsThrown: 0 }],
        turns: [],
        createdAt: new Date(),
        updatedAt: new Date()
      }

      const completedGame: Omit<Game, 'id'> = {
        startingScore: STARTING_SCORE,
        playerIds: ['player2'],
        status: 'completed' as GameStatus,
        currentPlayerIndex: 0,
        currentRound: 10,
        scores: [{ playerId: 'player2', currentScore: 0, dartsThrown: 30 }],
        turns: [],
        winnerId: 'player2',
        createdAt: new Date(),
        updatedAt: new Date(),
        completedAt: new Date()
      }

      await db.addGame(inProgressGame)
      await db.addGame(completedGame)

      const inProgressGames = await db.getGames('in-progress')
      expect(inProgressGames.length).toBe(1)
      expect(inProgressGames[0].status).toBe('in-progress')

      const completedGames = await db.getGames('completed')
      expect(completedGames.length).toBe(1)
      expect(completedGames[0].status).toBe('completed')
    })

    it('should update a game', async () => {
      const gameData: Omit<Game, 'id'> = {
        startingScore: STARTING_SCORE,
        playerIds: ['player1'],
        status: 'in-progress' as GameStatus,
        currentPlayerIndex: 0,
        currentRound: 1,
        scores: [{ playerId: 'player1', currentScore: 501, dartsThrown: 0 }],
        turns: [],
        createdAt: new Date(),
        updatedAt: new Date()
      }

      const addedGame = await db.addGame(gameData)

      const updatedGame = await db.updateGame(addedGame.id, {
        currentRound: 2,
        currentPlayerIndex: 0,
        scores: [{ playerId: 'player1', currentScore: 441, dartsThrown: 3 }]
      })

      expect(updatedGame.currentRound).toBe(2)
      expect(updatedGame.scores[0].currentScore).toBe(441)
      expect(updatedGame.updatedAt.getTime()).toBeGreaterThan(addedGame.updatedAt.getTime())
    })

    it('should throw error when updating non-existent game', async () => {
      await expect(
        db.updateGame('non-existent-id', { currentRound: 2 })
      ).rejects.toThrow('Game not found')
    })

    it('should delete a game', async () => {
      const gameData: Omit<Game, 'id'> = {
        startingScore: STARTING_SCORE,
        playerIds: ['player1'],
        status: 'in-progress' as GameStatus,
        currentPlayerIndex: 0,
        currentRound: 1,
        scores: [{ playerId: 'player1', currentScore: 501, dartsThrown: 0 }],
        turns: [],
        createdAt: new Date(),
        updatedAt: new Date()
      }

      const addedGame = await db.addGame(gameData)
      await db.deleteGame(addedGame.id)

      const deletedGame = await db.getGame(addedGame.id)
      expect(deletedGame).toBeUndefined()
    })

    it('should throw error when deleting non-existent game', async () => {
      await expect(
        db.deleteGame('non-existent-id')
      ).rejects.toThrow('Game not found')
    })
  })

  describe('Database indexes', () => {
    it('should have status index on games store', async () => {
      const database = await db.init()
      const transaction = database.transaction(['games'], 'readonly')
      const store = transaction.objectStore('games')

      expect(store.indexNames.contains('status')).toBe(true)
    })

    it('should have compound status-createdAt index on games store', async () => {
      const database = await db.init()
      const transaction = database.transaction(['games'], 'readonly')
      const store = transaction.objectStore('games')

      expect(store.indexNames.contains('status-createdAt')).toBe(true)
    })
  })
})
