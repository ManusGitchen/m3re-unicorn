<script setup lang="ts">
import { computed } from 'vue'
import ButtonDocs from '../docs/ButtonDocs.vue'
import CardDocs from '../docs/CardDocs.vue'
import DialogDocs from '../docs/DialogDocs.vue'
import TagDocs from '../docs/TagDocs.vue'
import NotificationDocs from '../docs/NotificationDocs.vue'
import ContainerDocs from '../docs/ContainerDocs.vue'
import ColorsDocs from '../docs/ColorsDocs.vue'
import TypographyDocs from '../docs/TypographyDocs.vue'
import UtilitiesDocs from '../docs/UtilitiesDocs.vue'

const props = defineProps<{
  componentName: string
}>()

const componentMap: Record<string, any> = {
  button: ButtonDocs,
  card: CardDocs,
  dialog: DialogDocs,
  tag: TagDocs,
  notification: NotificationDocs,
  container: ContainerDocs,
  colors: ColorsDocs,
  typography: TypographyDocs,
  utilities: UtilitiesDocs,
}

const currentComponent = computed(() => {
  return componentMap[props.componentName] || null
})
</script>

<template>
  <div class="component-page">
    <component :is="currentComponent" v-if="currentComponent" />
    <div v-else class="coming-soon">
      <h1>{{ componentName }}</h1>
      <p>Documentation coming soon...</p>
    </div>
  </div>
</template>

<style scoped>
.component-page {
  max-width: 1000px;
}

.coming-soon {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--color-text-muted);
}

.coming-soon h1 {
  text-transform: capitalize;
  color: var(--color-text-primary);
}
</style>
