<template>
  <div
    class="card player-card"
    :class="{ 'player-card--selected': selected, 'player-card--selectable': selectable }"
    @click="handleClick"
  >
    <div class="player-card__avatar">
      <img :src="player.imageUrl" :alt="player.name" />
    </div>
    <div class="card-content">
      <div class="player-card__header">
        <h3 class="card-title">{{ player.name }}</h3>
        <button
          v-if="variant === 'detailed'"
          class="btn btn-sm btn-color-secondary player-card__edit-btn"
          @click.stop="emit('edit', player.id)"
        >
          ✏️
        </button>
      </div>
      <div v-if="variant === 'detailed'" class="card-body">
        <p>Games: {{ player.stats.gamesPlayed }}</p>
        <p>Wins: {{ player.stats.gamesWon }}</p>
        <p>Avg Score: {{ player.stats.averageScore.toFixed(1) }}</p>
        <p>Best: {{ player.stats.highestScore }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Player } from '@/types/player'

const props = defineProps<{
  player: Player
  variant?: 'compact' | 'detailed'
  selectable?: boolean
  selected?: boolean
}>()

const emit = defineEmits<{
  click: [player: Player]
  select: [player: Player]
  edit: [playerId: string]
}>()

function handleClick() {
  emit('click', props.player)
  if (props.selectable) {
    emit('select', props.player)
  }
}
</script>

<style scoped>
.player-card {
  cursor: pointer;
  transition: transform 0.2s;
}

.player-card--selectable:hover {
  transform: translateY(-2px);
}

.player-card--selected {
  border: 2px solid var(--color-primary);
}

.player-card__avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto var(--spacing-sm);
}

.player-card__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.player-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--spacing-xs);
}

.player-card__edit-btn {
  flex-shrink: 0;
  padding: var(--spacing-xs);
  min-width: auto;
}
</style>
