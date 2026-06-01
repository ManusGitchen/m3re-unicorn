<template>
  <div class="home-view">
    <div class="container">
      <h1 class="home-view__title">🎯 Unicorn Darts</h1>
      <p class="home-view__subtitle">Track your 501 darts games</p>

      <!-- Resume game section -->
      <div v-if="activeGame" class="card home-view__active-game">
        <div class="card-content">
          <h2 class="card-title">Active Game</h2>
          <div class="card-body">
            <p>Round {{ activeGame.currentRound }}</p>
            <p>{{ activeGame.playerIds.length }} players</p>
            <div class="home-view__active-game-actions">
              <button class="btn btn-primary btn-color-primary btn-lg" @click="resumeGame">
                Resume Game
              </button>
              <button class="btn btn-secondary btn-color-error" @click="handleAbandonGame">
                Abandon Game
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- New game section -->
      <div class="card home-view__new-game home-view__contrast-color">
        <div class="card-content">
          <h2 class="card-title">Start New Game</h2>
          <div class="card-body">
            <p class="home-view__instruction home-view__contrast-color">Select players (1-4):</p>

            <div v-if="loading" class="home-view__loading">
              Loading players...
            </div>

            <div v-else-if="players.length === 0" class="home-view__no-players">
              <p>No players found. Create players first!</p>
              <router-link to="/players" class="btn btn-primary btn-color-primary">
                Manage Players
              </router-link>
            </div>

            <div v-else>
              <PlayerList
                :players="players"
                variant="compact"
                :selectable="true"
                :selected-ids="selectedPlayerIds"
                :max-selection="4"
                @select="togglePlayerSelection"
              />

              <div class="home-view__actions">
                <button
                  class="btn btn-primary btn-color-primary btn-lg"
                  :disabled="selectedPlayerIds.length === 0"
                  @click="startNewGame"
                >
                  Start Game ({{ selectedPlayerIds.length }} player{{ selectedPlayerIds.length !== 1 ? 's' : '' }})
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick stats -->
      <div v-if="recentGames.length > 0" class="card home-view__stats">
        <div class="card-content">
          <h3 class="card-title">Recent Games</h3>
          <div class="card-body">
            <ul class="home-view__game-list">
              <li
                v-for="game in recentGames"
                :key="game.id"
                class="home-view__game-item"
                @click="router.push(`/game/${game.id}`)"
              >
                <div class="home-view__game-date">
                  {{ formatDate(game.completedAt) }}
                </div>
                <div class="home-view__game-info">
                  <span
                    class="home-view__game-status"
                    :class="{
                      'home-view__game-status--completed': game.status === 'completed',
                      'home-view__game-status--abandoned': game.status === 'abandoned'
                    }"
                  >
                    {{ game.status === 'completed' ? 'Completed' : 'Abandoned' }}
                  </span>
                  <span v-if="game.status === 'completed' && game.winnerId" class="home-view__game-winner">
                    Winner: {{ getWinnerName(game) }}
                  </span>
                </div>
              </li>
            </ul>
            <router-link to="/history" class="btn btn-secondary btn-color-secondary mt-md">
              View All History
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { usePlayer } from '@/composables/usePlayer'
import { useGame } from '@/composables/useGame'
import { useDatabase } from '@/composables/useDatabase'
import PlayerList from '@/components/player/PlayerList.vue'
import type { Game } from '@/types/game'

const router = useRouter()
const route = useRoute()
const { players, loading, loadPlayers } = usePlayer()
const game = useGame()
const db = useDatabase()

const selectedPlayerIds = ref<string[]>([])
const activeGame = ref<Game | null>(null)
const recentGames = ref<Game[]>([])

const completedGamesCount = computed(() => {
  return recentGames.value.filter(g => g.status === 'completed').length
})

function getWinnerName(game: Game): string {
  if (!game.winnerId) return ''
  const winner = players.value.find(p => p.id === game.winnerId)
  return winner?.name ?? 'Unknown'
}

function formatDate(date: Date | undefined): string {
  if (!date) return ''
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }).format(date)
}

async function loadData() {
  // Reset player selection
  selectedPlayerIds.value = []

  await loadPlayers()

  // Check for active games
  const games = await db.getGames('in-progress')
  activeGame.value = games.length > 0 ? games[0] : null

  // Load recent games (completed and abandoned)
  const allGames = await db.getGames()
  recentGames.value = allGames
    .filter(g => g.status === 'completed' || g.status === 'abandoned')
    .sort((a, b) => (b.completedAt?.getTime() ?? 0) - (a.completedAt?.getTime() ?? 0))
    .slice(0, 10)
}

onMounted(async () => {
  await loadData()
})

// Reload data when navigating back to home
watch(() => route.path, (newPath) => {
  if (newPath === '/') {
    loadData()
  }
})

function togglePlayerSelection(playerId: string) {
  const index = selectedPlayerIds.value.indexOf(playerId)
  if (index > -1) {
    selectedPlayerIds.value.splice(index, 1)
  } else if (selectedPlayerIds.value.length < 4) {
    selectedPlayerIds.value.push(playerId)
  }
}

async function startNewGame() {
  if (selectedPlayerIds.value.length === 0) return

  const newGame = await game.startNewGame(selectedPlayerIds.value)
  router.push(`/game/${newGame.id}`)
}

function resumeGame() {
  if (activeGame.value) {
    router.push(`/game/${activeGame.value.id}`)
  }
}

async function handleAbandonGame() {
  if (!activeGame.value) return

  const confirmMessage = `Are you sure you want to abandon the game in round ${activeGame.value.currentRound}? This action cannot be undone.`
  if (!confirm(confirmMessage)) {
    return
  }

  try {
    // Update game status to abandoned
    await db.updateGame(activeGame.value.id, {
      ...activeGame.value,
      status: 'abandoned',
      completedAt: new Date(),
      updatedAt: new Date()
    })

    // Reload data to refresh active game status
    await loadData()
  } catch (e) {
    console.error('Failed to abandon game:', e)
    alert('Failed to abandon game. Please try again.')
  }
}
</script>

<style scoped>
.home-view {
  min-height: calc(100vh - 60px);
  background: var(--color-background);
}

.home-view__title {
  font-size: 3rem;
  text-align: center;
  margin-bottom: var(--spacing-lg);
  margin-top: var(--spacing-xl);
  color: var(--color-primary);
}

.home-view__subtitle {
  text-align: center;
  font-size: 1.25rem;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xl);
}

.home-view__active-game,
.home-view__new-game,
.home-view__stats,
.home-view__instruction {
  margin-bottom: var(--spacing-lg);
}

.home-view__contrast-color {
  color: white;
}

.home-view__new-game {
  background: linear-gradient(135deg,
    var(--color-primary) 0%,
    var(--color-secondary) 25%,
    var(--color-info) 50%,
    var(--color-success) 75%,
    var(--color-warning) 100%) !important;
  border: none;
}

.home-view__active-game-actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
}

@media (min-width: 768px) {
  .home-view__active-game-actions {
    flex-direction: row;
  }
}

.home-view__instruction {
  margin-bottom: var(--spacing-md);
  font-weight: var(--typography-font-weight-semibold);
}

.home-view__loading,
.home-view__no-players {
  text-align: center;
  padding: var(--spacing-lg);
  color: var(--color-text-secondary);
}

.home-view__no-players {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  align-items: center;
}

.home-view__actions {
  margin-top: var(--spacing-lg);
  text-align: center;
}

.home-view__game-list {
  list-style: none;
  padding: 0;
  margin: 0 0 var(--spacing-md) 0;
}

.home-view__game-item {
  padding: var(--spacing-sm) var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
  cursor: pointer;
  transition: background-color 0.2s;
}

.home-view__game-item:hover {
  background-color: var(--color-background-secondary);
}

.home-view__game-item:last-child {
  border-bottom: none;
}

.home-view__game-date {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xs);
}

.home-view__game-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.home-view__game-status {
  padding: 0.125rem 0.5rem;
  border-radius: var(--border-radius-sm);
  font-size: 0.75rem;
  font-weight: var(--typography-font-weight-semibold);
  text-transform: uppercase;
}

.home-view__game-status--completed {
  background-color: var(--color-success-light);
  color: var(--color-success);
  font-weight: var(--typography-font-weight-bold);
}

.home-view__game-status--abandoned {
  background-color: var(--color-neutral-black20);
  color: var(--color-text-secondary);
}

.home-view__game-winner {
  font-size: 0.875rem;
  color: var(--color-text);
  font-weight: var(--typography-font-weight-medium);
}

@media (max-width: 768px) {
  .home-view__title {
    font-size: 2rem;
  }
}
</style>
