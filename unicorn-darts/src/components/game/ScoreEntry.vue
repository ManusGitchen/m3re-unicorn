<template>
  <div class="score-entry card">
    <div class="card-content">
      <div class="score-entry__header">
        <h3 class="card-title">Enter Score</h3>
        <button
          class="score-entry__toggle-btn"
          :aria-pressed="perDartMode"
          :aria-label="perDartMode ? 'Switch to single score entry' : 'Switch to per-dart entry'"
          @click="toggleEntryMode"
        >
          {{ perDartMode ? '3 Darts' : '1 Total' }}
        </button>
      </div>
      <p class="score-entry__current">Current: {{ currentScore }}</p>

      <!-- Single score input -->
      <div v-if="!perDartMode">
        <input
          ref="scoreInputRef"
          v-model="scoreInput"
          type="text"
          class="score-entry__input"
          placeholder="Enter score"
          aria-label="Enter dart score"
          aria-describedby="score-help"
          autofocus
          @input="handleInput"
          @keyup.enter="handleSubmit"
        />
        <p id="score-help" class="sr-only">
          Enter a score between 0 and 180, or use slang shortcuts like ton or breakfast
        </p>
      </div>

      <!-- Per-dart inputs -->
      <div v-else class="score-entry__per-dart">
        <div class="score-entry__dart-inputs">
          <div class="score-entry__dart-input-group">
            <label for="dart1" class="score-entry__dart-label">Dart 1</label>
            <input
              id="dart1"
              ref="dart1InputRef"
              v-model="dart1Input"
              type="text"
              class="score-entry__input score-entry__input--small"
              placeholder="0"
              aria-label="First dart score"
              aria-describedby="dart-help"
              @input="handleDartInput(1)"
              @keyup.enter="handleSubmit"
            />
          </div>
          <div class="score-entry__dart-input-group">
            <label for="dart2" class="score-entry__dart-label">Dart 2</label>
            <input
              id="dart2"
              v-model="dart2Input"
              type="text"
              class="score-entry__input score-entry__input--small"
              placeholder="0"
              aria-label="Second dart score"
              aria-describedby="dart-help"
              @input="handleDartInput(2)"
              @keyup.enter="handleSubmit"
            />
          </div>
          <div class="score-entry__dart-input-group">
            <label for="dart3" class="score-entry__dart-label">Dart 3</label>
            <input
              id="dart3"
              v-model="dart3Input"
              type="text"
              class="score-entry__input score-entry__input--small"
              placeholder="0"
              aria-label="Third dart score"
              aria-describedby="dart-help"
              @input="handleDartInput(3)"
              @keyup.enter="handleSubmit"
            />
          </div>
        </div>
        <p id="dart-help" class="sr-only">
          Enter score for each dart between 0 and 60 (triple 20 is maximum)
        </p>
        <p class="score-entry__total">Total: {{ dartTotal }}</p>
      </div>

      <!-- Validation feedback -->
      <div v-if="validationError" class="score-entry__error text-error">
        {{ validationError }}
      </div>

      <!-- Bust warning 
      <div v-if="wouldBust && projectedScore !== 0" class="score-entry__warning text-error">
        ⚠️ This would BUST! Score would be {{ projectedScore }}
      </div>
      <div v-if="projectedScore === 0 && !lastIsDouble" class="score-entry__warning text-error">
        ⚠️ This will be marked as BUST! (No double checkout)
      </div>-->

      <!-- Double checkout requirement -->
      <div v-if="projectedScore === 0" class="score-entry__double-required">
        <div class="score-entry__double-warning">
          ⚠️ You must finish on a double to win!
        </div>
        <label class="score-entry__double-label">
          <input v-model="lastIsDouble" type="checkbox" />
          <span>Last dart was a double</span>
        </label>
        <p class="score-entry__double-hint">
          If the last dart was NOT a double, this will be marked as BUST.
        </p>
      </div>

      <!-- Actions -->
      <div class="score-entry__actions">
        <button
          class="btn btn-primary btn-color-primary btn-lg"
          :disabled="!isValid"
          @click="handleSubmit"
        >
          Submit Score
        </button>
        <button
          class="btn btn-secondary btn-color-secondary"
          @click="handleUndo"
        >
          Undo Last Turn
        </button>
      </div>
      <!-- Slang shortcuts -->
      <div class="score-entry__shortcuts mt-8">
        <button
          v-for="shortcut in slangShortcuts"
          :key="shortcut.term"
          class="btn btn-secondary btn-sm btn-color-secondary"
          @click="applyShortcut(shortcut.value)"
        >
          {{ shortcut.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
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

const scoreInputRef = ref<HTMLInputElement | null>(null)
const dart1InputRef = ref<HTMLInputElement | null>(null)

const { parseSlang, slangDictionary } = useSlang()
const { isBust } = useScoring()

// Entry mode toggle
const perDartMode = ref(false)

// Single score input
const scoreInput = ref('')
const parsedScore = ref<number | null>(null)

// Per-dart inputs
const dart1Input = ref('')
const dart2Input = ref('')
const dart3Input = ref('')
const parsedDart1 = ref<number | null>(null)
const parsedDart2 = ref<number | null>(null)
const parsedDart3 = ref<number | null>(null)

const lastIsDouble = ref(false)

const slangShortcuts = computed(() => {
  return slangDictionary.value.map(entry => ({
    term: entry.term,
    value: entry.value,
    label: `${entry.term.charAt(0).toUpperCase() + entry.term.slice(1)} (${entry.value})`
  }))
})

const dartTotal = computed(() => {
  const d1 = parsedDart1.value ?? 0
  const d2 = parsedDart2.value ?? 0
  const d3 = parsedDart3.value ?? 0
  return d1 + d2 + d3
})

const validationError = computed(() => {
  if (perDartMode.value) {
    // Validate each dart is between 0-60 (triple 20 is max single dart score)
    const darts = [parsedDart1.value, parsedDart2.value, parsedDart3.value]
    for (const dart of darts) {
      if (dart !== null && (dart < 0 || dart > 60)) {
        return 'Each dart must be between 0 and 60'
      }
    }
    if (dartTotal.value > 180) {
      return 'Total score cannot exceed 180'
    }
    return null
  } else {
    if (!scoreInput.value) return null
    if (parsedScore.value === null) return 'Invalid input'
    if (parsedScore.value < 0 || parsedScore.value > 180) {
      return 'Score must be between 0 and 180'
    }
    return null
  }
})

const wouldBust = computed(() => {
  const total = perDartMode.value ? dartTotal.value : parsedScore.value
  if (total === null || total === 0) return false

  // Check regular bust conditions
  if (isBust(props.currentScore, [total])) return true

  // Check if reaching 0 without double (which will be treated as bust)
  if (projectedScore.value === 0 && !lastIsDouble.value) return true

  return false
})

const projectedScore = computed(() => {
  const total = perDartMode.value ? dartTotal.value : parsedScore.value
  if (total === null) return props.currentScore
  return props.currentScore - total
})

const isValid = computed(() => {
  if (validationError.value) return false

  if (perDartMode.value) {
    // At least one dart must have a value
    const hasValue = parsedDart1.value !== null || parsedDart2.value !== null || parsedDart3.value !== null
    return hasValue
  } else {
    if (parsedScore.value === null) return false
    return true
  }
})

function toggleEntryMode() {
  perDartMode.value = !perDartMode.value

  // Clear all inputs when switching modes
  scoreInput.value = ''
  parsedScore.value = null
  dart1Input.value = ''
  dart2Input.value = ''
  dart3Input.value = ''
  parsedDart1.value = null
  parsedDart2.value = null
  parsedDart3.value = null
  lastIsDouble.value = false

  // Focus appropriate input
  nextTick(() => {
    if (perDartMode.value) {
      dart1InputRef.value?.focus()
    } else {
      scoreInputRef.value?.focus()
    }
  })
}

function handleInput() {
  const result = parseSlang(scoreInput.value)
  parsedScore.value = result
}

function handleDartInput(dartNumber: 1 | 2 | 3) {
  const inputValue = dartNumber === 1 ? dart1Input.value : dartNumber === 2 ? dart2Input.value : dart3Input.value
  const result = parseSlang(inputValue)

  if (dartNumber === 1) {
    parsedDart1.value = result
  } else if (dartNumber === 2) {
    parsedDart2.value = result
  } else {
    parsedDart3.value = result
  }
}

function applyShortcut(value: number) {
  scoreInput.value = value.toString()
  parsedScore.value = value
}

async function handleSubmit() {
  if (!isValid.value) return

  const totalScore = perDartMode.value ? dartTotal.value : parsedScore.value
  if (totalScore === null) return

  emit('score-entered', totalScore, lastIsDouble.value)

  // Clear inputs
  if (perDartMode.value) {
    dart1Input.value = ''
    dart2Input.value = ''
    dart3Input.value = ''
    parsedDart1.value = null
    parsedDart2.value = null
    parsedDart3.value = null
    await nextTick()
    dart1InputRef.value?.focus()
  } else {
    scoreInput.value = ''
    parsedScore.value = null
    await nextTick()
    scoreInputRef.value?.focus()
  }

  lastIsDouble.value = false
}

function handleUndo() {
  emit('undo')
}
</script>

<style scoped>
.score-entry__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.score-entry__toggle-btn {
  padding: var(--spacing-xs) var(--spacing-md);
  font-size: 0.875rem;
  font-weight: var(--typography-font-weight-semibold);
  border: 2px solid var(--color-primary);
  border-radius: 20px;
  background: transparent;
  color: var(--color-primary);
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 32px;
  min-width: 80px;
}

.score-entry__toggle-btn:hover {
  background: var(--color-primary-tint);
}

.score-entry__toggle-btn[aria-pressed="true"] {
  background: var(--color-primary);
  color: white;
}

.score-entry__toggle-btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

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
  grid-template-columns: 1fr 1fr;
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

.score-entry__double-required {
  margin-bottom: var(--spacing-md);
  padding: var(--spacing-md);
  background-color: var(--color-warning-tint);
  border: 2px solid var(--color-warning);
  border-radius: 8px;
}

.score-entry__double-warning {
  font-weight: var(--typography-font-weight-semibold);
  color: var(--color-warning);
  margin-bottom: var(--spacing-sm);
}

.score-entry__double-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
  margin-bottom: var(--spacing-xs);
  font-size: 1.125rem;
}

.score-entry__double-label input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.score-entry__double-hint {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin: 0;
}

.score-entry__per-dart {
  margin-bottom: var(--spacing-md);
}

.score-entry__dart-inputs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
}

.score-entry__dart-input-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.score-entry__dart-label {
  font-size: 0.875rem;
  font-weight: var(--typography-font-weight-semibold);
  color: var(--color-text-secondary);
}

.score-entry__input--small {
  padding: var(--spacing-sm);
  font-size: 1rem;
  text-align: center;
}

.score-entry__total {
  font-size: 1.25rem;
  font-weight: var(--typography-font-weight-bold);
  text-align: center;
  color: var(--color-primary);
  padding: var(--spacing-sm);
  background: var(--color-primary-tint);
  border-radius: 8px;
  margin: 0;
}

.score-entry__actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.score-entry__actions .btn {
  min-height: 44px;
}

@media (max-width: 480px) {
  .score-entry__dart-inputs {
    gap: var(--spacing-xs);
  }

  .score-entry__dart-label {
    font-size: 0.75rem;
  }

  .score-entry__input--small {
    padding: var(--spacing-xs);
    font-size: 0.875rem;
  }
}
</style>
