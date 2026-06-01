<template>
  <div class="game-history">
    <div v-if="games.length === 0" class="game-history__empty">
      <p>No games in history yet</p>
      <router-link to="/" class="btn btn-color-primary">
        Start Your First Game
      </router-link>
    </div>

    <div v-else class="game-history__grid">
      <div
        v-for="game in games"
        :key="game.id"
        class="card game-history__card"
        @click="viewGame(game.id)"
      >
        <div class="card-content">
          <div class="game-history__header">
            <span class="game-history__date">
              {{ formatDate(game.createdAt) }}
            </span>
            <span
              class="game-history__status"
              :class="`game-history__status--${game.status}`"
            >
              {{ game.status }}
            </span>
          </div>

          <div class="game-history__info">
            <p class="game-history__rounds">
              {{ game.currentRound }} rounds
            </p>
            <p class="game-history__players">
              {{ game.playerIds.length }} players
            </p>
          </div>

          <div v-if="game.winnerId" class="game-history__winner">
            🏆 Winner: {{ getPlayerName(game.winnerId) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDatabase } from '@/composables/useDatabase'
import type { Game } from '@/types/game'
import type { Player } from '@/types/player'

const props = defineProps<{
  games: Game[]
}>()

const emit = defineEmits<{
  'view-game': [gameId: string]
}>()

const db = useDatabase()
const players = ref<Map<string, Player>>(new Map())

onMounted(async () => {
  // Load all unique players from all games
  const allPlayerIds = new Set<string>()
  props.games.forEach(game => {
    game.playerIds.forEach(id => allPlayerIds.add(id))
    if (game.winnerId) allPlayerIds.add(game.winnerId)
  })

  const playerPromises = Array.from(allPlayerIds).map(id => db.getPlayer(id))
  const loadedPlayers = await Promise.all(playerPromises)

  loadedPlayers.forEach(player => {
    if (player) {
      players.value.set(player.id, player)
    }
  })
})

function getPlayerName(playerId: string): string {
  return players.value.get(playerId)?.name || `Player ${playerId.slice(0, 4)}`
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function viewGame(gameId: string) {
  emit('view-game', gameId)
}
</script>

<style scoped>
.game-history__empty {
  text-align: center;
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  align-items: center;
}

.game-history__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-md);
}

.game-history__card {
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.game-history__card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.game-history__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.game-history__date {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.game-history__status {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: var(--typography-font-weight-semibold);
  text-transform: uppercase;
}

.game-history__status--completed {
  background-color: var(--color-success-tint);
  color: var(--color-success);
}

.game-history__status--abandoned {
  background-color: var(--color-error-tint);
  color: var(--color-error);
}

.game-history__info {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-sm);
}

.game-history__winner {
  padding-top: var(--spacing-sm);
  border-top: 1px solid var(--color-border);
  font-weight: var(--typography-font-weight-semibold);
  color: var(--color-success);
}
</style>
