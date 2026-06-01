<template>
  <div class="home-view">
    <div class="home-view__container">
      <h1 class="home-view__title">🎯 Unicorn Darts</h1>
      <p class="home-view__subtitle">Track your 501 darts games</p>

      <!-- Resume game section -->
      <div v-if="activeGame" class="card home-view__active-game">
        <div class="card-content">
          <h2 class="card-title">Active Game</h2>
          <div class="card-body">
            <p>Round {{ activeGame.currentRound }}</p>
            <p>{{ activeGame.playerIds.length }} players</p>
            <button class="btn btn-color-primary btn-lg" @click="resumeGame">
              Resume Game
            </button>
          </div>
        </div>
      </div>

      <!-- New game section -->
      <div class="card home-view__new-game">
        <div class="card-content">
          <h2 class="card-title">Start New Game</h2>
          <div class="card-body">
            <p class="home-view__instruction">Select players (1-4):</p>

            <div v-if="loading" class="home-view__loading">
              Loading players...
            </div>

            <div v-else-if="players.length === 0" class="home-view__no-players">
              <p>No players found. Create players first!</p>
              <router-link to="/players" class="btn btn-color-primary">
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
                  class="btn btn-color-primary btn-lg"
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
            <p>{{ completedGamesCount }} games completed</p>
            <router-link to="/history" class="btn btn-color-secondary">
              View History
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePlayer } from '@/composables/usePlayer'
import { useGame } from '@/composables/useGame'
import { useDatabase } from '@/composables/useDatabase'
import PlayerList from '@/components/player/PlayerList.vue'
import type { Game } from '@/types/game'

const router = useRouter()
const { players, loading, loadPlayers } = usePlayer()
const game = useGame()
const db = useDatabase()

const selectedPlayerIds = ref<string[]>([])
const activeGame = ref<Game | null>(null)
const recentGames = ref<Game[]>([])

const completedGamesCount = computed(() => {
  return recentGames.value.filter(g => g.status === 'completed').length
})

onMounted(async () => {
  await loadPlayers()

  // Check for active games
  const games = await db.getGames('in-progress')
  if (games.length > 0) {
    activeGame.value = games[0]
  }

  // Load recent completed games
  const completed = await db.getGames('completed')
  recentGames.value = completed.slice(0, 5)
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
</script>

<style scoped>
.home-view {
  min-height: calc(100vh - 60px);
  background: linear-gradient(135deg, var(--color-primary-tint) 0%, var(--color-background) 50%);
}

.home-view__container {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-xl) var(--spacing-md);
}

.home-view__title {
  font-size: 3rem;
  text-align: center;
  margin-bottom: var(--spacing-sm);
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
.home-view__stats {
  margin-bottom: var(--spacing-lg);
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

@media (max-width: 768px) {
  .home-view__title {
    font-size: 2rem;
  }
}
</style>
