<template>
  <div class="game-detail">
    <div v-if="loading" class="game-detail__loading">
      Loading game details...
    </div>

    <div v-else-if="error" class="game-detail__error text-error">
      {{ error.message }}
    </div>

    <div v-else-if="game" class="game-detail__content">
      <div class="game-detail__header">
        <h2>Game Details</h2>
        <button class="btn btn-color-secondary btn-sm" @click="$emit('back')">
          ← Back
        </button>
      </div>

      <!-- Game summary -->
      <div class="card">
        <div class="card-content">
          <h3 class="card-title">Summary</h3>
          <div class="card-body">
            <div class="game-detail__summary">
              <div class="game-detail__stat">
                <span class="game-detail__stat-label">Status</span>
                <span class="game-detail__stat-value">{{ game.status }}</span>
              </div>
              <div class="game-detail__stat">
                <span class="game-detail__stat-label">Rounds</span>
                <span class="game-detail__stat-value">{{ game.currentRound }}</span>
              </div>
              <div class="game-detail__stat">
                <span class="game-detail__stat-label">Players</span>
                <span class="game-detail__stat-value">{{ game.playerIds.length }}</span>
              </div>
              <div class="game-detail__stat">
                <span class="game-detail__stat-label">Date</span>
                <span class="game-detail__stat-value">{{ formatDate(game.createdAt) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Final scores -->
      <div class="card">
        <div class="card-content">
          <h3 class="card-title">Final Scores</h3>
          <div class="card-body">
            <div class="game-detail__scores">
              <div
                v-for="score in game.scores"
                :key="score.playerId"
                class="game-detail__player-score"
                :class="{ 'game-detail__player-score--winner': score.playerId === game.winnerId }"
              >
                <span class="game-detail__player-name">
                  {{ getPlayerName(score.playerId) }}
                  <span v-if="score.playerId === game.winnerId">🏆</span>
                </span>
                <span class="game-detail__score-value">{{ score.currentScore }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Turn history -->
      <div class="card">
        <div class="card-content">
          <h3 class="card-title">Turn History</h3>
          <div class="card-body">
            <TurnHistory
              :turns="game.turns"
              :limit="100"
              :show-player-names="true"
              :player-names="playerNamesMap"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useDatabase } from '@/composables/useDatabase'
import TurnHistory from '@/components/game/TurnHistory.vue'
import type { Game } from '@/types/game'
import type { Player } from '@/types/player'

const props = defineProps<{
  gameId: string
}>()

defineEmits<{
  back: []
}>()

const db = useDatabase()
const game = ref<Game | null>(null)
const players = ref<Map<string, Player>>(new Map())
const loading = ref(true)
const error = ref<Error | null>(null)

onMounted(async () => {
  try {
    game.value = await db.getGame(props.gameId) ?? null

    // Load all players for this game
    if (game.value) {
      const playerPromises = game.value.playerIds.map(id => db.getPlayer(id))
      const loadedPlayers = await Promise.all(playerPromises)

      loadedPlayers.forEach(player => {
        if (player) {
          players.value.set(player.id, player)
        }
      })
    }
  } catch (e) {
    error.value = e as Error
  } finally {
    loading.value = false
  }
})

const playerNamesMap = computed(() => {
  const map = new Map<string, string>()
  players.value.forEach((player, id) => {
    map.set(id, player.name)
  })
  return map
})

function getPlayerName(playerId: string): string {
  return players.value.get(playerId)?.name || `Player ${playerId.slice(0, 4)}`
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.game-detail {
  max-width: 1000px;
  margin: 0 auto;
}

.game-detail__loading,
.game-detail__error {
  text-align: center;
  padding: var(--spacing-xl);
}

.game-detail__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.game-detail__content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.game-detail__summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--spacing-md);
}

.game-detail__stat {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.game-detail__stat-label {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.game-detail__stat-value {
  font-size: 1.25rem;
  font-weight: var(--typography-font-weight-semibold);
}

.game-detail__scores {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.game-detail__player-score {
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-sm);
  border-radius: 4px;
  background-color: var(--color-background-secondary);
}

.game-detail__player-score--winner {
  background-color: var(--color-success-tint);
  border: 2px solid var(--color-success);
}

.game-detail__player-name {
  font-weight: var(--typography-font-weight-semibold);
}

.game-detail__score-value {
  font-size: 1.5rem;
  font-weight: var(--typography-font-weight-bold);
  color: var(--color-primary);
}
</style>
