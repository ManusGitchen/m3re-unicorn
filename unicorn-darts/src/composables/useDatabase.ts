import { v4 as uuidv4 } from 'uuid'
import type { Player } from '@/types/player'
import type { Game, GameStatus } from '@/types/game'
import { DB_NAME, DB_VERSION } from '@/utils/constants'

let dbInstance: IDBDatabase | null = null

// Helper to serialize dates to ISO strings for IndexedDB
function serializeGame(game: Game): any {
  const serialized = {
    id: game.id,
    startingScore: game.startingScore,
    playerIds: game.playerIds,
    status: game.status,
    currentPlayerIndex: game.currentPlayerIndex,
    currentRound: game.currentRound,
    scores: game.scores,
    turns: game.turns.map(turn => ({
      id: turn.id,
      playerId: turn.playerId,
      round: turn.round,
      throws: turn.throws,
      totalScore: turn.totalScore,
      remainingAfter: turn.remainingAfter,
      isBust: turn.isBust,
      isWin: turn.isWin,
      timestamp: turn.timestamp.toISOString()
    })),
    winnerId: game.winnerId,
    createdAt: game.createdAt.toISOString(),
    updatedAt: game.updatedAt.toISOString(),
    completedAt: game.completedAt?.toISOString()
  }
  // Use JSON stringify/parse to ensure all data is truly serializable
  return JSON.parse(JSON.stringify(serialized))
}

function deserializeGame(data: any): Game {
  return {
    id: data.id,
    startingScore: data.startingScore,
    playerIds: data.playerIds,
    status: data.status,
    currentPlayerIndex: data.currentPlayerIndex,
    currentRound: data.currentRound,
    scores: data.scores,
    turns: data.turns.map((turn: any) => ({
      id: turn.id,
      playerId: turn.playerId,
      round: turn.round,
      throws: turn.throws,
      totalScore: turn.totalScore,
      remainingAfter: turn.remainingAfter,
      isBust: turn.isBust,
      isWin: turn.isWin,
      timestamp: new Date(turn.timestamp)
    })),
    winnerId: data.winnerId,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
    completedAt: data.completedAt ? new Date(data.completedAt) : undefined
  }
}

function serializePlayer(player: Player): any {
  const serialized = {
    id: player.id,
    name: player.name,
    imageUrl: player.imageUrl,
    stats: player.stats,
    createdAt: player.createdAt.toISOString(),
    updatedAt: player.updatedAt.toISOString()
  }
  // Use JSON stringify/parse to ensure all data is truly serializable
  return JSON.parse(JSON.stringify(serialized))
}

function deserializePlayer(data: any): Player {
  return {
    id: data.id,
    name: data.name,
    imageUrl: data.imageUrl,
    stats: data.stats,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt)
  }
}

export function useDatabase() {
  async function init(): Promise<IDBDatabase> {
    if (dbInstance && dbInstance.name === DB_NAME) {
      return dbInstance
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)

      request.onerror = () => {
        reject(new Error('Failed to open database'))
      }

      request.onsuccess = () => {
        dbInstance = request.result
        resolve(request.result)
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        if (!db.objectStoreNames.contains('players')) {
          db.createObjectStore('players', { keyPath: 'id' })
        }

        if (!db.objectStoreNames.contains('games')) {
          const gamesStore = db.createObjectStore('games', { keyPath: 'id' })
          gamesStore.createIndex('status', 'status', { unique: false })
          gamesStore.createIndex('status-createdAt', ['status', 'createdAt'], { unique: false })
        }
      }
    })
  }

  async function addPlayer(playerData: Omit<Player, 'id'>): Promise<Player> {
    const db = await init()
    const player: Player = {
      ...playerData,
      id: uuidv4()
    }

    const serialized = serializePlayer(player)

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['players'], 'readwrite')
      const store = transaction.objectStore('players')
      const request = store.add(serialized)

      request.onsuccess = () => {
        resolve(player)
      }

      request.onerror = () => {
        reject(new Error('Failed to add player'))
      }
    })
  }

  async function getPlayer(id: string): Promise<Player | undefined> {
    const db = await init()

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['players'], 'readonly')
      const store = transaction.objectStore('players')
      const request = store.get(id)

      request.onsuccess = () => {
        resolve(request.result ? deserializePlayer(request.result) : undefined)
      }

      request.onerror = () => {
        reject(new Error('Failed to get player'))
      }
    })
  }

  async function getAllPlayers(): Promise<Player[]> {
    const db = await init()

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['players'], 'readonly')
      const store = transaction.objectStore('players')
      const request = store.getAll()

      request.onsuccess = () => {
        resolve(request.result.map(deserializePlayer))
      }

      request.onerror = () => {
        reject(new Error('Failed to get all players'))
      }
    })
  }

  async function updatePlayer(id: string, updates: Partial<Player>): Promise<Player> {
    const db = await init()
    const existingPlayer = await getPlayer(id)

    if (!existingPlayer) {
      throw new Error('Player not found')
    }

    // Ensure updatedAt is always after the original timestamp
    const now = new Date()
    const updatedAt = now.getTime() > existingPlayer.updatedAt.getTime()
      ? now
      : new Date(existingPlayer.updatedAt.getTime() + 1)

    const updatedPlayer: Player = {
      ...existingPlayer,
      ...updates,
      id: existingPlayer.id,
      updatedAt
    }

    const serialized = serializePlayer(updatedPlayer)

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['players'], 'readwrite')
      const store = transaction.objectStore('players')
      const request = store.put(serialized)

      request.onsuccess = () => {
        resolve(updatedPlayer)
      }

      request.onerror = () => {
        reject(new Error('Failed to update player'))
      }
    })
  }

  async function deletePlayer(id: string): Promise<void> {
    const db = await init()
    const existingPlayer = await getPlayer(id)

    if (!existingPlayer) {
      throw new Error('Player not found')
    }

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['players'], 'readwrite')
      const store = transaction.objectStore('players')
      const request = store.delete(id)

      request.onsuccess = () => {
        resolve()
      }

      request.onerror = () => {
        reject(new Error('Failed to delete player'))
      }
    })
  }

  async function addGame(gameData: Omit<Game, 'id'>): Promise<Game> {
    const db = await init()
    const game: Game = {
      ...gameData,
      id: uuidv4()
    }

    const serialized = serializeGame(game)

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['games'], 'readwrite')
      const store = transaction.objectStore('games')
      const request = store.add(serialized)

      request.onsuccess = () => {
        resolve(game)
      }

      request.onerror = () => {
        reject(new Error('Failed to add game'))
      }
    })
  }

  async function getGame(id: string): Promise<Game | undefined> {
    const db = await init()

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['games'], 'readonly')
      const store = transaction.objectStore('games')
      const request = store.get(id)

      request.onsuccess = () => {
        resolve(request.result ? deserializeGame(request.result) : undefined)
      }

      request.onerror = () => {
        reject(new Error('Failed to get game'))
      }
    })
  }

  async function getGames(status?: GameStatus): Promise<Game[]> {
    const db = await init()

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['games'], 'readonly')
      const store = transaction.objectStore('games')

      let request: IDBRequest<any[]>

      if (status) {
        const index = store.index('status')
        request = index.getAll(status)
      } else {
        request = store.getAll()
      }

      request.onsuccess = () => {
        resolve(request.result.map(deserializeGame))
      }

      request.onerror = () => {
        reject(new Error('Failed to get games'))
      }
    })
  }

  async function updateGame(id: string, updates: Partial<Game>): Promise<Game> {
    const db = await init()
    const existingGame = await getGame(id)

    if (!existingGame) {
      throw new Error('Game not found')
    }

    // Ensure updatedAt is always after the original timestamp
    const now = new Date()
    const updatedAt = now.getTime() > existingGame.updatedAt.getTime()
      ? now
      : new Date(existingGame.updatedAt.getTime() + 1)

    const updatedGame: Game = {
      ...existingGame,
      ...updates,
      id: existingGame.id,
      updatedAt
    }

    const serialized = serializeGame(updatedGame)

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['games'], 'readwrite')
      const store = transaction.objectStore('games')
      const request = store.put(serialized)

      request.onsuccess = () => {
        resolve(updatedGame)
      }

      request.onerror = () => {
        reject(new Error('Failed to update game'))
      }
    })
  }

  async function deleteGame(id: string): Promise<void> {
    const db = await init()
    const existingGame = await getGame(id)

    if (!existingGame) {
      throw new Error('Game not found')
    }

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['games'], 'readwrite')
      const store = transaction.objectStore('games')
      const request = store.delete(id)

      request.onsuccess = () => {
        resolve()
      }

      request.onerror = () => {
        reject(new Error('Failed to delete game'))
      }
    })
  }

  async function clearAllGames(): Promise<void> {
    const db = await init()

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['games'], 'readwrite')
      const store = transaction.objectStore('games')
      const request = store.clear()

      request.onsuccess = () => {
        resolve()
      }

      request.onerror = () => {
        reject(new Error('Failed to clear games'))
      }
    })
  }

  async function close(): Promise<void> {
    if (dbInstance) {
      dbInstance.close()
      dbInstance = null
    }
  }

  return {
    init,
    close,
    addPlayer,
    updatePlayer,
    deletePlayer,
    getPlayer,
    getAllPlayers,
    addGame,
    updateGame,
    deleteGame,
    clearAllGames,
    getGame,
    getGames
  }
}
