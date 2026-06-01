<template>
  <div class="game-board">
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
          class="btn btn-color-secondary btn-sm"
          @click="handleEndGame"
        >
          End Game
        </button>
      </div>

      <ScoreDisplay
        :game="currentGame"
        :highlight-player-id="currentPlayer?.id"
      />

      <ScoreEntry
        v-if="currentPlayer && currentGame.status === 'in-progress'"
        :player-id="currentPlayer.id"
        :current-score="getPlayerScore(currentPlayer.id).value"
        @score-entered="handleScoreEntered"
        @undo="handleUndo"
      />

      <CheckoutSuggestion
        v-if="currentPlayer"
        :score="getPlayerScore(currentPlayer.id).value"
      />

      <TurnHistory :turns="getTurnHistory.slice(-10)" />

      <!-- Win dialog -->
      <div v-if="currentGame.status === 'completed'" class="game-board__win-overlay">
        <div class="game-board__confetti">
          <div v-for="i in 30" :key="i" class="game-board__confetti-piece" :style="{ '--piece-index': i }"></div>
        </div>
        <div class="card game-board__win-card">
          <div class="card-content">
            <h2 class="card-title">🎯 Winner!</h2>
            <div class="card-body">
              <p class="game-board__winner-name">
                {{ winnerName }}
              </p>
              <p>Finished in {{ currentGame.currentRound }} rounds</p>
              <button class="btn btn-color-primary" @click="handleNewGame">
                New Game
              </button>
              <button class="btn btn-color-secondary" @click="handleViewHistory">
                View History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGame } from '@/composables/useGame'
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

const winnerName = computed(() => {
  if (!currentGame.value?.winnerId) return ''
  const winner = players.value.find(p => p.id === currentGame.value?.winnerId)
  return winner?.name ?? 'Unknown'
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
.game-board {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-md);
}

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
}

.game-board__content {
  display: grid;
  gap: var(--spacing-lg);
}

.game-board__win-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.game-board__confetti {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
}

.game-board__confetti-piece {
  position: absolute;
  width: 10px;
  height: 10px;
  background: var(--color-primary);
  top: -10px;
  animation: confetti-fall 3s linear infinite;
  opacity: 0.8;
  animation-delay: calc(var(--piece-index) * 0.1s);
}

.game-board__confetti-piece:nth-child(2n) {
  background: var(--color-success);
}

.game-board__confetti-piece:nth-child(3n) {
  background: var(--color-secondary);
}

.game-board__confetti-piece:nth-child(4n) {
  width: 8px;
  height: 8px;
}

.game-board__confetti-piece:nth-child(5n) {
  width: 12px;
  height: 12px;
}

.game-board__confetti-piece:nth-child(1) { left: 5%; }
.game-board__confetti-piece:nth-child(2) { left: 10%; }
.game-board__confetti-piece:nth-child(3) { left: 15%; }
.game-board__confetti-piece:nth-child(4) { left: 20%; }
.game-board__confetti-piece:nth-child(5) { left: 25%; }
.game-board__confetti-piece:nth-child(6) { left: 30%; }
.game-board__confetti-piece:nth-child(7) { left: 35%; }
.game-board__confetti-piece:nth-child(8) { left: 40%; }
.game-board__confetti-piece:nth-child(9) { left: 45%; }
.game-board__confetti-piece:nth-child(10) { left: 50%; }
.game-board__confetti-piece:nth-child(11) { left: 55%; }
.game-board__confetti-piece:nth-child(12) { left: 60%; }
.game-board__confetti-piece:nth-child(13) { left: 65%; }
.game-board__confetti-piece:nth-child(14) { left: 70%; }
.game-board__confetti-piece:nth-child(15) { left: 75%; }
.game-board__confetti-piece:nth-child(16) { left: 80%; }
.game-board__confetti-piece:nth-child(17) { left: 85%; }
.game-board__confetti-piece:nth-child(18) { left: 90%; }
.game-board__confetti-piece:nth-child(19) { left: 95%; }
.game-board__confetti-piece:nth-child(20) { left: 7%; }
.game-board__confetti-piece:nth-child(21) { left: 12%; }
.game-board__confetti-piece:nth-child(22) { left: 17%; }
.game-board__confetti-piece:nth-child(23) { left: 22%; }
.game-board__confetti-piece:nth-child(24) { left: 27%; }
.game-board__confetti-piece:nth-child(25) { left: 32%; }
.game-board__confetti-piece:nth-child(26) { left: 37%; }
.game-board__confetti-piece:nth-child(27) { left: 42%; }
.game-board__confetti-piece:nth-child(28) { left: 47%; }
.game-board__confetti-piece:nth-child(29) { left: 52%; }
.game-board__confetti-piece:nth-child(30) { left: 57%; }

@keyframes confetti-fall {
  to {
    transform: translateY(100vh) rotate(360deg);
  }
}

.game-board__win-card {
  max-width: 400px;
  margin: var(--spacing-md);
  text-align: center;
  position: relative;
  z-index: 1;
}

.game-board__winner-name {
  font-size: var(--typography-base-headline-font-size);
  font-weight: var(--typography-font-weight-bold);
  color: var(--color-success);
  margin: var(--spacing-md) 0;
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
