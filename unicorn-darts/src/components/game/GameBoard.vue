<template>
  <div class="game-board container">
    <LoadingSpinner v-if="loading" message="Loading game..." />

    <ErrorMessage
      v-else-if="error"
      title="Failed to Load Game"
      :message="error.message"
      :retry="true"
      @retry="handleRetry"
    />

    <div v-else-if="currentGame" class="game-board__content">
      <div class="game-board__header">
        <h2>Round {{ getCurrentRound }}</h2>
        <button
          class="btn btn-secondary btn-color-secondary btn-sm"
          @click="handleEndGame"
        >
          End Game
        </button>
      </div>
      <div class="score-display card">

        <ScoreDisplay
          :game="currentGame"
          :highlight-player-id="currentPlayer?.id"
        />
      
        <CheckoutSuggestion
          v-if="currentPlayer"
          :score="getPlayerScore(currentPlayer.id).value"
        />
        
        <div class="mobile-hidden">
          <TurnHistory :turns="getTurnHistory.slice(-10)" class="mobile-hidden"/>
        </div>
      </div>


      <ScoreEntry
        v-if="currentPlayer && currentGame.status === 'in-progress'"
        :player-id="currentPlayer.id"
        :current-score="getPlayerScore(currentPlayer.id).value"
        @score-entered="handleScoreEntered"
        @undo="handleUndo"
      />


      <!-- Win dialog -->
      <Teleport to="body">
        <Transition name="dialog">
          <div
            v-if="currentGame.status === 'completed'"
            class="dialog-backdrop dialog-backdrop-unicorn"
            @click.self="() => {}"
          >
            <div
              class="dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="winner-dialog-title"
              style="width: 500px"
            >
              <div class="dialog-header">
                <h2 id="winner-dialog-title" class="dialog-title">🎯 Winner!</h2>
              </div>
              <div class="dialog-content">
                <div class="game-board__winner-content">
                  <div v-if="winner?.imageUrl" class="game-board__winner-image">
                    <img :src="winner.imageUrl" :alt="winnerName" />
                  </div>
                  <p class="game-board__winner-name">
                    {{ winnerName }}
                  </p>
                  <p class="game-board__winner-rounds">
                    Finished in {{ currentGame.currentRound }} rounds
                  </p>
                  <div class="game-board__winner-actions">
                    <button class="btn btn-primary btn-color-primary btn-lg" @click="handleNewGame">
                      New Game
                    </button>
                    <button class="btn btn-secondary btn-color-secondary" @click="handleViewHistory">
                      View History
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGame } from '@/composables/useGame'
import Dialog from '@/components/common/Dialog.vue'
import ScoreDisplay from './ScoreDisplay.vue'
import ScoreEntry from './ScoreEntry.vue'
import CheckoutSuggestion from './CheckoutSuggestion.vue'
import TurnHistory from './TurnHistory.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import ErrorMessage from '@/components/common/ErrorMessage.vue'

const props = defineProps<{
  gameId: string
}>()

const router = useRouter()
const game = useGame()

const {
  currentGame,
  currentPlayer,
  players,
  getPlayerScore,
  getCurrentRound,
  getTurnHistory,
  loadGame,
  recordTurn,
  undoLastTurn,
  endGame
} = game

const loading = ref(true)
const error = ref<Error | null>(null)

const winner = computed(() => {
  if (!currentGame.value?.winnerId) return null
  return players.value.find(p => p.id === currentGame.value?.winnerId) ?? null
})

const winnerName = computed(() => {
  return winner.value?.name ?? 'Unknown'
})

onMounted(async () => {
  try {
    await loadGame(props.gameId)
  } catch (e) {
    error.value = e as Error
  } finally {
    loading.value = false
  }
})

async function handleScoreEntered(score: number, lastIsDouble: boolean) {
  try {
    await recordTurn([score], lastIsDouble)
  } catch (e) {
    error.value = e as Error
  }
}

async function handleUndo() {
  try {
    await undoLastTurn()
  } catch (e) {
    error.value = e as Error
  }
}

async function handleRetry() {
  loading.value = true
  error.value = null
  try {
    await loadGame(props.gameId)
  } catch (e) {
    error.value = e as Error
  } finally {
    loading.value = false
  }
}

async function handleEndGame() {
  if (confirm('Are you sure you want to end this game?')) {
    await endGame('abandoned')
    router.push('/')
  }
}

function handleNewGame() {
  router.push('/')
}

function handleViewHistory() {
  router.push('/history')
}
</script>

<style scoped>
.game-board__loading,
.game-board__error {
  text-align: center;
  padding: var(--spacing-xl);
}

.game-board__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  margin-top: var(--spacing-xl);
}

.game-board__content {
  display: grid;
  gap: var(--spacing-lg);
}

/* Winner dialog content */
.game-board__winner-content {
  text-align: center;
  padding: var(--spacing-lg);
}

.game-board__winner-image {
  width: 120px;
  height: 120px;
  margin: 0 auto var(--spacing-md);
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid var(--color-primary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.game-board__winner-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.game-board__winner-name {
  font-size: 2rem;
  font-weight: var(--typography-font-weight-bold);
  color: var(--color-primary);
  margin: var(--spacing-md) 0;
}

.game-board__winner-rounds {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xl);
}

.game-board__winner-actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

@media (min-width: 600px) {
  .game-board__winner-actions {
    flex-direction: row;
    justify-content: center;
  }
}

@media (max-width: 768px) {
   .mobile-hidden {
    display: none;
  }
}

@media (min-width: 768px) {
  .game-board__content {
    grid-template-columns: 2fr 1fr;
  }

  .game-board__header {
    grid-column: 1 / -1;
  }

  .game-board > :nth-child(2) {
    grid-column: 1 / -1;
  }
}
</style>
