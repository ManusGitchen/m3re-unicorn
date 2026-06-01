<template>
  <div class="players-view">
    <div class="players-view__header">
      <h1>Players</h1>
      <button class="btn btn-color-primary" @click="showForm = true">
        Add Player
      </button>
    </div>

    <PlayerForm
      v-if="showForm"
      :mode="editingPlayer ? 'edit' : 'create'"
      :player="editingPlayer"
      @save="handleSave"
      @cancel="handleCancel"
    />

    <div v-if="loading">Loading players...</div>
    <div v-else-if="error" class="text-error">{{ error.message }}</div>
    <PlayerList
      v-else
      :players="players"
      variant="detailed"
      @edit="handleEdit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePlayer } from '@/composables/usePlayer'
import PlayerList from '@/components/player/PlayerList.vue'
import PlayerForm from '@/components/player/PlayerForm.vue'
import type { Player } from '@/types/player'

const { players, loading, error, loadPlayers, createPlayer, updatePlayer } = usePlayer()

const showForm = ref(false)
const editingPlayer = ref<Player | undefined>()

onMounted(() => {
  loadPlayers()
})

async function handleSave(name: string, imageUrl: string) {
  if (editingPlayer.value) {
    await updatePlayer(editingPlayer.value.id, { name, imageUrl })
  } else {
    await createPlayer(name, imageUrl)
  }
  handleCancel()
}

function handleCancel() {
  showForm.value = false
  editingPlayer.value = undefined
}

function handleEdit(playerId: string) {
  const player = players.value.find(p => p.id === playerId)
  if (player) {
    editingPlayer.value = player
    showForm.value = true
  }
}
</script>

<style scoped>
.players-view__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}
</style>
