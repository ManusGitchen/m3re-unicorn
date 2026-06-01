<template>
  <div class="game-view">
    <GameBoard v-if="gameId" :game-id="gameId" />
    <div v-else class="game-view__error">
      No game ID provided
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import GameBoard from '@/components/game/GameBoard.vue'

const route = useRoute()
const gameId = computed(() => route.params.id as string)
</script>

<style scoped>
.game-view {
  min-height: 100vh;
}

.game-view__error {
  text-align: center;
  padding: var(--spacing-xl);
  color: var(--color-error);
}
</style>
