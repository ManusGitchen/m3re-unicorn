<template>
  <div class="score-display card">
    <div class="card-content">
      <h3 class="card-title">Scores</h3>
      <div class="score-display__grid">
        <div
          v-for="playerScore in playerScores"
          :key="playerScore.playerId"
          class="score-display__player"
          :class="{ 'score-display__player--active': playerScore.playerId === highlightPlayerId }"
        >
          <div class="score-display__avatar">
            <img :src="playerScore.imageUrl" :alt="playerScore.name" />
          </div>
          <div class="score-display__info">
            <div class="score-display__name">{{ playerScore.name }}</div>
            <div class="score-display__score">{{ playerScore.score }}</div>
            <div class="score-display__darts">{{ playerScore.dartsThrown }} darts</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useDatabase } from '@/composables/useDatabase'
import type { Game } from '@/types/game'
import type { Player } from '@/types/player'

const props = defineProps<{
  game: Game
  highlightPlayerId?: string
}>()

const db = useDatabase()
const players = ref<Map<string, Player>>(new Map())

onMounted(async () => {
  // Load all players for this game
  const playerPromises = props.game.playerIds.map(id => db.getPlayer(id))
  const loadedPlayers = await Promise.all(playerPromises)

  loadedPlayers.forEach(player => {
    if (player) {
      players.value.set(player.id, player)
    }
  })
})

const playerScores = computed(() => {
  return props.game.scores.map(score => {
    const player = players.value.get(score.playerId)
    return {
      playerId: score.playerId,
      name: player?.name || `Player ${score.playerId.slice(0, 4)}`,
      imageUrl: player?.imageUrl || '/images/players/avatar1.png',
      score: score.currentScore,
      dartsThrown: score.dartsThrown
    }
  })
})
</script>

<style scoped>
.score-display__grid {
  display: grid;
  gap: var(--spacing-md);
  margin-top: var(--spacing-md);
}

.score-display__player {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-sm);
  border-radius: 8px;
  transition: background-color 0.2s;
}

.score-display__player--active {
  background-color: var(--color-primary-tint);
  border: 2px solid var(--color-primary);
}

.score-display__avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.score-display__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.score-display__info {
  flex: 1;
}

.score-display__name {
  font-weight: var(--typography-font-weight-semibold);
  margin-bottom: var(--spacing-xs);
}

.score-display__score {
  font-size: 2rem;
  font-weight: var(--typography-font-weight-bold);
  color: var(--color-primary);
}

.score-display__darts {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

@media (min-width: 768px) {
  .score-display__grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .score-display__score {
    font-size: 2.5rem;
  }
}
</style>
