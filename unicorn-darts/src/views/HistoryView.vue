<template>
  <div class="history-view">
    <div class="container">
      <div class="history-view__header">
        <h1 class="history-view__title">Game History</h1>
        <button
          v-if="!selectedGameId && games.length > 0"
          class="btn btn-primary btn-color-error btn-sm"
          @click="handleClearHistory"
        >
          Clear History
        </button>
      </div>

      <div v-if="selectedGameId" class="history-view__detail">
        <GameDetail :game-id="selectedGameId" @back="handleBack" />
      </div>

      <div v-else>
        <div v-if="loading" class="history-view__loading">
          Loading history...
        </div>

        <div v-else>
          <!-- Filter tabs -->
          <div class="history-view__filters">
            <button
              class="btn"
              :class="filter === 'all' ? 'btn-primary btn-color-primary' : 'btn-secondary btn-color-secondary'"
              @click="filter = 'all'"
            >
              All
            </button>
            <button
              class="btn"
              :class="filter === 'completed' ? 'btn-primary btn-color-primary' : 'btn-secondary btn-color-secondary'"
              @click="filter = 'completed'"
            >
              Completed
            </button>
            <button
              class="btn"
              :class="filter === 'abandoned' ? 'btn-primary btn-color-primary' : 'btn-secondary btn-color-secondary'"
              @click="filter = 'abandoned'"
            >
              Abandoned
            </button>
          </div>

          <GameHistory :games="filteredGames" @view-game="handleViewGame" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDatabase } from '@/composables/useDatabase'
import GameHistory from '@/components/history/GameHistory.vue'
import GameDetail from '@/components/history/GameDetail.vue'
import type { Game, GameStatus } from '@/types/game'

const route = useRoute()
const router = useRouter()
const db = useDatabase()

const games = ref<Game[]>([])
const loading = ref(true)
const filter = ref<'all' | GameStatus>('all')
const selectedGameId = ref<string | null>(null)

const filteredGames = computed(() => {
  if (filter.value === 'all') {
    return games.value
  }
  return games.value.filter(g => g.status === filter.value)
})

onMounted(async () => {
  // Check if viewing specific game
  if (route.params.id) {
    selectedGameId.value = route.params.id as string
  }

  // Load all games
  const allGames = await db.getGames()
  games.value = allGames.sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
  loading.value = false
})

function handleViewGame(gameId: string) {
  selectedGameId.value = gameId
  router.push(`/history/${gameId}`)
}

function handleBack() {
  selectedGameId.value = null
  router.push('/history')
}

async function handleClearHistory() {
  const confirmMessage = `Are you sure you want to delete ALL ${games.value.length} game(s) from history? This action cannot be undone.`
  if (!confirm(confirmMessage)) {
    return
  }

  try {
    await db.clearAllGames()
    games.value = []
  } catch (e) {
    console.error('Failed to clear history:', e)
    alert('Failed to clear history. Please try again.')
  }
}
</script>

<style scoped>
.history-view {
  min-height: calc(100vh - 60px);
}

.history-view__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  margin-top: var(--spacing-xl);
}

.history-view__title {
  font-size: 2rem;
  margin: 0;
}

.history-view__loading {
  text-align: center;
  padding: var(--spacing-xl);
  color: var(--color-text-secondary);
}

.history-view__filters {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
}

.history-view__detail {
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
