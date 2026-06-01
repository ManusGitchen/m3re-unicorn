import { ref, computed } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import { useDatabase } from './useDatabase'
import type { Player } from '@/types/player'
import type { GameResult } from '@/types/gameResult'

export function usePlayer() {
  const players = ref<Player[]>([])
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const db = useDatabase()

  async function loadPlayers(): Promise<void> {
    loading.value = true
    error.value = null
    try {
      const allPlayers = await db.getAllPlayers()
      players.value = allPlayers
    } catch (e) {
      error.value = e instanceof Error ? e : new Error('Failed to load players')
    } finally {
      loading.value = false
    }
  }

  async function createPlayer(name: string, imageUrl: string): Promise<Player> {
    loading.value = true
    error.value = null
    try {
      const now = new Date()
      const playerData: Omit<Player, 'id'> = {
        name,
        imageUrl,
        stats: {
          gamesPlayed: 0,
          gamesWon: 0,
          totalDartsThrown: 0,
          averageScore: 0,
          highestScore: 0,
          checkoutRate: 0,
          favorite180s: 0
        },
        createdAt: now,
        updatedAt: now
      }
      const player = await db.addPlayer(playerData)
      players.value.push(player)
      return player
    } catch (e) {
      error.value = e instanceof Error ? e : new Error('Failed to create player')
      throw error.value
    } finally {
      loading.value = false
    }
  }

  async function updatePlayer(id: string, updates: Partial<Player>): Promise<void> {
    loading.value = true
    error.value = null
    try {
      const updatedPlayer = await db.updatePlayer(id, updates)
      const index = players.value.findIndex(p => p.id === id)
      if (index !== -1) {
        players.value[index] = updatedPlayer
      }
    } catch (e) {
      error.value = e instanceof Error ? e : new Error('Failed to update player')
      throw error.value
    } finally {
      loading.value = false
    }
  }

  async function deletePlayer(id: string): Promise<void> {
    loading.value = true
    error.value = null
    try {
      await db.deletePlayer(id)
      players.value = players.value.filter(p => p.id !== id)
    } catch (e) {
      error.value = e instanceof Error ? e : new Error('Failed to delete player')
      throw error.value
    } finally {
      loading.value = false
    }
  }

  function getPlayerById(id: string): ComputedRef<Player | undefined> {
    return computed(() => players.value.find(p => p.id === id))
  }

  async function updatePlayerStats(id: string, gameResult: GameResult): Promise<void> {
    loading.value = true
    error.value = null
    try {
      const player = await db.getPlayer(id)
      if (!player) {
        throw new Error('Player not found')
      }

      const newGamesPlayed = player.stats.gamesPlayed + 1
      const newGamesWon = gameResult.won ? player.stats.gamesWon + 1 : player.stats.gamesWon
      const newTotalDartsThrown = player.stats.totalDartsThrown + gameResult.dartsThrown
      const newAverageScore = (player.stats.averageScore * player.stats.gamesPlayed + gameResult.score) / newGamesPlayed
      const newHighestScore = Math.max(player.stats.highestScore, gameResult.score)

      const updatedStats = {
        gamesPlayed: newGamesPlayed,
        gamesWon: newGamesWon,
        totalDartsThrown: newTotalDartsThrown,
        averageScore: newAverageScore,
        highestScore: newHighestScore,
        checkoutRate: player.stats.checkoutRate,
        favorite180s: player.stats.favorite180s
      }

      await updatePlayer(id, { stats: updatedStats })
    } catch (e) {
      error.value = e instanceof Error ? e : new Error('Failed to update player stats')
      throw error.value
    } finally {
      loading.value = false
    }
  }

  return {
    players,
    loading,
    error,
    loadPlayers,
    createPlayer,
    updatePlayer,
    deletePlayer,
    getPlayerById,
    updatePlayerStats
  }
}
