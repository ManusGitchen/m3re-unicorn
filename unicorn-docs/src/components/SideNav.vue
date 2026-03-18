<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  currentComponent: string
}>()

const emit = defineEmits<{
  navigateComponent: [componentName: string]
}>()

const searchQuery = ref('')

interface ComponentCategory {
  name: string
  components: { name: string; displayName: string }[]
}

const categories: ComponentCategory[] = [
  {
    name: 'Components',
    components: [
      { name: 'button', displayName: 'Button' },
      { name: 'card', displayName: 'Card' },
      { name: 'dialog', displayName: 'Dialog' },
      { name: 'tag', displayName: 'Tag' },
      { name: 'notification', displayName: 'Notification' },
      { name: 'container', displayName: 'Container' },
    ],
  },
  {
    name: 'Design System',
    components: [
      { name: 'colors', displayName: 'Colors' },
      { name: 'typography', displayName: 'Typography' },
      { name: 'utilities', displayName: 'Utility Classes' },
    ],
  },
]

function filterComponents() {
  if (!searchQuery.value.trim()) return categories

  const query = searchQuery.value.toLowerCase()
  return categories
    .map(category => ({
      ...category,
      components: category.components.filter(comp =>
        comp.displayName.toLowerCase().includes(query)
      ),
    }))
    .filter(category => category.components.length > 0)
}
</script>

<template>
  <aside class="side-nav">
    <div class="side-nav-search">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search components..."
        class="side-nav-search-input"
      />
    </div>

    <nav class="side-nav-content">
      <div
        v-for="category in filterComponents()"
        :key="category.name"
        class="side-nav-category"
      >
        <h3 class="side-nav-category-title">{{ category.name }}</h3>
        <ul class="side-nav-list">
          <li
            v-for="component in category.components"
            :key="component.name"
            class="side-nav-item"
          >
            <button
              :class="[
                'side-nav-link',
                { 'side-nav-link-active': currentComponent === component.name }
              ]"
              @click="emit('navigateComponent', component.name)"
            >
              {{ component.displayName }}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  </aside>
</template>

<style scoped>
.side-nav {
  width: 260px;
  height: calc(100vh - 64px);
  background: var(--color-background-contrast);
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 64px;
  overflow: hidden;
}

.side-nav-search {
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.side-nav-search-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  background: var(--color-background);
  color: var(--color-text);
  font-size: 0.9rem;
  font-family: inherit;
  transition: border-color 0.2s;
}

.side-nav-search-input:focus {
  outline: none;
  border-color: var(--color-primary);
}

.side-nav-search-input::placeholder {
  color: var(--color-text-muted);
}

.side-nav-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.side-nav-category {
  margin-bottom: 1.5rem;
}

.side-nav-category-title {
  margin: 0 0 0.5rem 0;
  padding: 0 0.5rem;
  font-size: 0.75rem;
  font-weight: var(--typography-font-weight-semibold);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.side-nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.side-nav-item {
  margin-bottom: 0.125rem;
}

.side-nav-link {
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  background: none;
  border: none;
  border-radius: var(--border-radius-sm);
  color: var(--color-text);
  font-size: 0.9rem;
  font-family: inherit;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
}

.side-nav-link:hover {
  background: var(--color-background-hover);
  color: var(--color-text-primary);
}

.side-nav-link-active {
  background: var(--color-primary);
  color: white;
  font-weight: var(--typography-font-weight-medium);
}

.side-nav-link-active:hover {
  background: var(--color-primary-dark);
}

@media (max-width: 768px) {
  .side-nav {
    display: none;
  }
}
</style>
