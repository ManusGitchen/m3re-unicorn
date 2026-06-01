<template>
  <div class="card player-form">
    <div class="card-content">
      <h3 class="card-title">{{ mode === 'create' ? 'New Player' : 'Edit Player' }}</h3>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="player-name">Name</label>
          <input
            id="player-name"
            v-model="formData.name"
            type="text"
            required
            placeholder="Enter player name"
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label>Avatar</label>
          <div class="avatar-selection">
            <div
              v-for="imageUrl in availableImages"
              :key="imageUrl"
              class="avatar-option"
              :class="{ 'avatar-option--selected': formData.imageUrl === imageUrl }"
              @click="formData.imageUrl = imageUrl"
            >
              <img :src="imageUrl" :alt="'Avatar'" />
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-color-primary">
            {{ mode === 'create' ? 'Create' : 'Save' }}
          </button>
          <button type="button" class="btn btn-color-secondary" @click="emit('cancel')">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import type { Player } from '@/types/player'

const props = defineProps<{
  player?: Player
  mode: 'create' | 'edit'
}>()

const emit = defineEmits<{
  save: [name: string, imageUrl: string]
  cancel: []
}>()

const availableImages = [
  '/images/players/avatar1.svg',
  '/images/players/avatar2.svg',
  '/images/players/avatar3.svg',
  '/images/players/avatar4.svg',
  '/images/players/avatar5.svg',
  '/images/players/avatar6.svg',
]

const formData = reactive({
  name: '',
  imageUrl: availableImages[0]
})

onMounted(() => {
  if (props.player) {
    formData.name = props.player.name
    formData.imageUrl = props.player.imageUrl
  }
})

function handleSubmit() {
  if (!formData.name.trim()) return
  emit('save', formData.name, formData.imageUrl)
}
</script>

<style scoped>
.form-group {
  margin-bottom: var(--spacing-md);
}

.form-group label {
  display: block;
  margin-bottom: var(--spacing-xs);
  font-weight: var(--typography-font-weight-semibold);
}

.form-input {
  width: 100%;
  padding: var(--spacing-sm);
  border: 1px solid var(--color-border);
  border-radius: 4px;
}

.avatar-selection {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  gap: var(--spacing-sm);
}

.avatar-option {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.2s;
}

.avatar-option:hover {
  border-color: var(--color-primary-light);
}

.avatar-option--selected {
  border-color: var(--color-primary);
}

.avatar-option img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.form-actions {
  display: flex;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-lg);
}
</style>
