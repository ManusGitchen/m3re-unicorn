<template>
  <div class="turn-history">
    <div class="card-content">
      <h4 class="card-title">Recent Turns</h4>
      <div v-if="turns.length === 0" class="turn-history__empty">
        No turns yet
      </div>
      <div v-else class="turn-history__list">
        <div
          v-for="turn in reversedTurns"
          :key="turn.id"
          class="turn-history__item"
          :class="{
            'turn-history__item--bust': turn.isBust,
            'turn-history__item--win': turn.isWin
          }"
        >
          <div class="turn-history__round">R{{ turn.round }}</div>
          <div v-if="showPlayerNames" class="turn-history__player">
            {{ getPlayerName(turn.playerId) }}
          </div>
          <div class="turn-history__score">
            <span class="turn-history__total">{{ turn.totalScore }}</span>
            <span class="turn-history__remaining">→ {{ turn.remainingAfter }}</span>
          </div>
          <div v-if="turn.isBust" class="turn-history__badge turn-history__badge--bust">
            BUST
          </div>
          <div v-if="turn.isWin" class="turn-history__badge turn-history__badge--win">
            WIN
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Turn } from '@/types/game'

const props = defineProps<{
  turns: Turn[]
  limit?: number
  showPlayerNames?: boolean
  playerNames?: Map<string, string>
}>()

const reversedTurns = computed(() => {
  return [...props.turns].reverse()
})

function getPlayerName(playerId: string): string {
  if (props.playerNames) {
    return props.playerNames.get(playerId) || `Player ${playerId.slice(0, 4)}`
  }
  return `Player ${playerId.slice(0, 4)}`
}
</script>

<style scoped>
.turn-history__empty {
  text-align: center;
  padding: var(--spacing-lg);
  color: var(--color-text-secondary);
}

.turn-history__list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  max-height: 400px;
  overflow-y: auto;
}

.turn-history__item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  border-radius: 4px;
  background-color: var(--color-background-secondary);
}

.turn-history__item--bust {
  background-color: var(--color-error-tint);
}

.turn-history__item--win {
  background-color: var(--color-success-tint);
}

.turn-history__round {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  min-width: 30px;
}

.turn-history__score {
  flex: 1;
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.turn-history__total {
  font-weight: var(--typography-font-weight-bold);
  font-size: 1.125rem;
}

.turn-history__remaining {
  color: var(--color-text-secondary);
}

.turn-history__player {
  font-size: 0.875rem;
  font-weight: var(--typography-font-weight-semibold);
  color: var(--color-primary);
  min-width: 80px;
}

.turn-history__badge {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: var(--typography-font-weight-bold);
}

.turn-history__badge--bust {
  background-color: var(--color-error);
  color: white;
}

.turn-history__badge--win {
  background-color: var(--color-success);
  color: white;
}
</style>
