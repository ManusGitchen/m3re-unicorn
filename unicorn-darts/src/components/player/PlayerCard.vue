<template>
  <div
    v-if="selected || (rainbow && variant === 'detailed')"
    class="card-rainbow-wrapper"
    style="--rainbow-colors: var(--color-primary) 0%, var(--color-secondary) 20%, var(--color-info) 40%, var(--color-success) 60%, var(--color-warning) 80%, var(--color-error) 100%;"
  >
    <div
      class="card player-card player-card--selectable"
      @click="handleClick"
    >
      <div class="player-card__avatar">
        <img :src="player.imageUrl" :alt="player.name" />
      </div>
      <div class="card-content flex justify-center">
        <div class="player-card__header">
          <h3 class="card-title">{{ player.name }}</h3>
          <button
            v-if="variant === 'detailed'"
            class="btn btn-tertiary btn-icon-only btn-sm btn-color-secondary player-card__edit-btn"
            @click.stop="emit('edit', player.id)"
            title="Edit player"
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
  </div>
  <div
    v-else
    class="card card-glass-shiny player-card"
    :class="{ 'player-card--selectable': selectable }"
    @click="handleClick"
  >
    <div class="player-card__avatar">
      <img :src="player.imageUrl" :alt="player.name" />
    </div>
    <div class="card-content flex justify-center">
      <div class="player-card__header">
        <h3 class="card-title">{{ player.name }}</h3>
        <button
          v-if="variant === 'detailed'"
          class="btn btn-tertiary btn-icon-only btn-sm btn-color-secondary player-card__edit-btn"
          @click.stop="emit('edit', player.id)"
          title="Edit player"
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
  rainbow?: boolean
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

.card-rainbow-wrapper {
  cursor: pointer;
  transition: transform 0.2s;
}

.card-rainbow-wrapper:hover {
  transform: translateY(-2px);
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
  align-items: center;
  gap: var(--spacing-xs);
}

.player-card__header .card-title {
  margin: 0;
}

.player-card__edit-btn {
  flex-shrink: 0;
}

/* Force white background and dark text for selected cards in both light and dark mode */
.card-rainbow-wrapper .player-card {
  background-color: #ffffff !important;
  color: #121212 !important;
}

.card-rainbow-wrapper .player-card .card-title {
  color: #121212 !important;
}
</style>
