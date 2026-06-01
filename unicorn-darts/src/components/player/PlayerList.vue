<template>
  <div class="player-list">
    <div class="player-list__grid">
      <PlayerCard
        v-for="player in players"
        :key="player.id"
        :player="player"
        :variant="variant"
        :selectable="selectable"
        :selected="isSelected(player.id)"
        @select="handleSelect"
        @edit="emit('edit', $event)"
      />
    </div>
    <div v-if="players.length === 0" class="player-list__empty">
      No players yet. Add your first player!
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Player } from '@/types/player'
import PlayerCard from './PlayerCard.vue'

const props = defineProps<{
  players: Player[]
  selectable?: boolean
  selectedIds?: string[]
  maxSelection?: number
  variant?: 'compact' | 'detailed'
}>()

const emit = defineEmits<{
  select: [playerId: string]
  edit: [playerId: string]
}>()

function isSelected(playerId: string) {
  return props.selectedIds?.includes(playerId) ?? false
}

function handleSelect(player: Player) {
  if (props.maxSelection && props.selectedIds) {
    if (!isSelected(player.id) && props.selectedIds.length >= props.maxSelection) {
      return
    }
  }
  emit('select', player.id)
}
</script>

<style scoped>
.player-list__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--spacing-md);
}

@media (max-width: 768px) {
  .player-list__grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}

.player-list__empty {
  text-align: center;
  padding: var(--spacing-xl);
  color: var(--color-text-secondary);
}
</style>
