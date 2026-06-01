<template>
  <div class="score-entry card">
    <div class="card-content">
      <h3 class="card-title">Enter Score</h3>
      <p class="score-entry__current">Current: {{ currentScore }}</p>

      <!-- Text input -->
      <input
        v-model="scoreInput"
        type="text"
        class="score-entry__input"
        placeholder="Enter score or slang"
        aria-label="Enter dart score"
        aria-describedby="score-help"
        @input="handleInput"
        @keyup.enter="handleSubmit"
      />
      <p id="score-help" class="sr-only">
        Enter a score between 0 and 180, or use slang shortcuts like ton or breakfast
      </p>

      <!-- Slang shortcuts -->
      <div class="score-entry__shortcuts">
        <button
          v-for="shortcut in slangShortcuts"
          :key="shortcut.term"
          class="btn btn-sm btn-color-secondary"
          @click="applyShortcut(shortcut.value)"
        >
          {{ shortcut.label }}
        </button>
      </div>

      <!-- Validation feedback -->
      <div v-if="validationError" class="score-entry__error text-error">
        {{ validationError }}
      </div>

      <!-- Bust warning -->
      <div v-if="wouldBust" class="score-entry__warning text-error">
        ⚠️ This would BUST! Score would be {{ projectedScore }}
      </div>

      <!-- Double checkbox for potential wins -->
      <div v-if="projectedScore === 0" class="score-entry__double">
        <label>
          <input v-model="lastIsDouble" type="checkbox" />
          Last dart was a double
        </label>
      </div>

      <!-- Actions -->
      <div class="score-entry__actions">
        <button
          class="btn btn-color-primary btn-lg"
          :disabled="!isValid"
          @click="handleSubmit"
        >
          Submit Score
        </button>
        <button
          class="btn btn-color-secondary"
          @click="handleUndo"
        >
          Undo Last Turn
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSlang } from '@/composables/useSlang'
import { useScoring } from '@/composables/useScoring'

const props = defineProps<{
  playerId: string
  currentScore: number
}>()

const emit = defineEmits<{
  'score-entered': [score: number, lastIsDouble: boolean]
  undo: []
}>()

const { parseSlang, slangDictionary } = useSlang()
const { isBust } = useScoring()

const scoreInput = ref('')
const parsedScore = ref<number | null>(null)
const lastIsDouble = ref(false)

const slangShortcuts = computed(() => {
  return slangDictionary.value.map(entry => ({
    term: entry.term,
    value: entry.value,
    label: `${entry.term.charAt(0).toUpperCase() + entry.term.slice(1)} (${entry.value})`
  }))
})

const validationError = computed(() => {
  if (!scoreInput.value) return null
  if (parsedScore.value === null) return 'Invalid input'
  if (parsedScore.value < 0 || parsedScore.value > 180) {
    return 'Score must be between 0 and 180'
  }
  return null
})

const wouldBust = computed(() => {
  if (parsedScore.value === null) return false
  return isBust(props.currentScore, [parsedScore.value])
})

const projectedScore = computed(() => {
  if (parsedScore.value === null) return props.currentScore
  return props.currentScore - parsedScore.value
})

const isValid = computed(() => {
  return parsedScore.value !== null && !validationError.value
})

function handleInput() {
  const result = parseSlang(scoreInput.value)
  parsedScore.value = result
}

function applyShortcut(value: number) {
  scoreInput.value = value.toString()
  parsedScore.value = value
}

function handleSubmit() {
  if (!isValid.value || parsedScore.value === null) return

  emit('score-entered', parsedScore.value, lastIsDouble.value)

  // Clear input
  scoreInput.value = ''
  parsedScore.value = null
  lastIsDouble.value = false
}

function handleUndo() {
  emit('undo')
}
</script>

<style scoped>
.score-entry__current {
  font-size: 1.5rem;
  font-weight: var(--typography-font-weight-semibold);
  margin-bottom: var(--spacing-md);
  color: var(--color-primary);
}

.score-entry__input {
  width: 100%;
  padding: var(--spacing-md);
  font-size: 1.25rem;
  border: 2px solid var(--color-border);
  border-radius: 8px;
  margin-bottom: var(--spacing-md);
}

.score-entry__input:focus {
  outline: none;
  border-color: var(--color-primary);
}

.score-entry__shortcuts {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.score-entry__error,
.score-entry__warning {
  padding: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
  border-radius: 4px;
  background-color: var(--color-error-tint);
}

.score-entry__double {
  margin-bottom: var(--spacing-md);
}

.score-entry__double label {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
}

.score-entry__actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.score-entry__actions .btn {
  min-height: 44px;
}

@media (min-width: 768px) {
  .score-entry__actions {
    flex-direction: row;
  }
}
</style>
