<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '../components/CodeBlock.vue'

const showVariantsCode = ref(false)
const showStatesCode = ref(false)
</script>

<template>
  <div class="component-docs">
    <header class="docs-header">
      <h1 class="docs-title">Card</h1>
      <p class="docs-description">
        A flexible container component for grouping content with multiple style variants.
      </p>
    </header>

    <section class="docs-section">
      <h2 class="docs-section-title">Variants</h2>
      <p class="docs-section-text">
        Cards come in three variants: default (elevated), flat, and outlined.
      </p>

      <div class="demo-container">
        <div class="demo-grid">
          <div class="card">
            <div class="card-content">
              <h3 class="card-title">Default Card</h3>
              <div class="card-body">
                <p>This card has a subtle shadow for elevation.</p>
              </div>
            </div>
          </div>

          <div class="card card-flat">
            <div class="card-content">
              <h3 class="card-title">Flat Card</h3>
              <div class="card-body">
                <p>This card has no shadow or border.</p>
              </div>
            </div>
          </div>

          <div class="card card-outlined">
            <div class="card-content">
              <h3 class="card-title">Outlined Card</h3>
              <div class="card-body">
                <p>This card has a visible border.</p>
              </div>
            </div>
          </div>
        </div>

        <button class="code-toggle-btn" @click="showVariantsCode = !showVariantsCode">
          {{ showVariantsCode ? 'Hide' : 'Show' }} Code
        </button>

        <CodeBlock v-if="showVariantsCode" language="html">
&lt;div class="card"&gt;
  &lt;div class="card-content"&gt;
    &lt;h3 class="card-title"&gt;Default Card&lt;/h3&gt;
    &lt;div class="card-body"&gt;
      &lt;p&gt;This card has a subtle shadow for elevation.&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;

&lt;div class="card card-flat"&gt;
  &lt;div class="card-content"&gt;
    &lt;h3 class="card-title"&gt;Flat Card&lt;/h3&gt;
    &lt;div class="card-body"&gt;
      &lt;p&gt;This card has no shadow or border.&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;

&lt;div class="card card-outlined"&gt;
  &lt;div class="card-content"&gt;
    &lt;h3 class="card-title"&gt;Outlined Card&lt;/h3&gt;
    &lt;div class="card-body"&gt;
      &lt;p&gt;This card has a visible border.&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
        </CodeBlock>
      </div>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Interactive States</h2>
      <p class="docs-section-text">
        Add hover and focus states with modifier classes.
      </p>

      <div class="demo-container">
        <div class="demo-grid">
          <div class="card card-interactive">
            <div class="card-content">
              <h3 class="card-title">Hoverable Card</h3>
              <div class="card-body">
                <p>Hover over this card to see the effect.</p>
              </div>
            </div>
          </div>

          <div class="card card-interactive card-clickable" tabindex="0">
            <div class="card-content">
              <h3 class="card-title">Clickable Card</h3>
              <div class="card-body">
                <p>This card can be focused and clicked.</p>
              </div>
            </div>
          </div>
        </div>

        <button class="code-toggle-btn" @click="showStatesCode = !showStatesCode">
          {{ showStatesCode ? 'Hide' : 'Show' }} Code
        </button>

        <CodeBlock v-if="showStatesCode" language="html">
&lt;div class="card card-interactive"&gt;
  &lt;div class="card-content"&gt;
    &lt;h3 class="card-title"&gt;Hoverable Card&lt;/h3&gt;
    &lt;div class="card-body"&gt;
      &lt;p&gt;Hover over this card to see the effect.&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;

&lt;div class="card card-interactive card-clickable" tabindex="0"&gt;
  &lt;div class="card-content"&gt;
    &lt;h3 class="card-title"&gt;Clickable Card&lt;/h3&gt;
    &lt;div class="card-body"&gt;
      &lt;p&gt;This card can be focused and clicked.&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
        </CodeBlock>
      </div>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Props</h2>
      <div class="props-table">
        <table>
          <thead>
            <tr>
              <th>Class</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>.card</code></td>
              <td>Base card component with default elevation</td>
            </tr>
            <tr>
              <td><code>.card-flat</code></td>
              <td>Card with no shadow or border</td>
            </tr>
            <tr>
              <td><code>.card-outlined</code></td>
              <td>Card with visible border</td>
            </tr>
            <tr>
              <td><code>.card-interactive</code></td>
              <td>Adds hover and focus states</td>
            </tr>
            <tr>
              <td><code>.card-clickable</code></td>
              <td>Adds cursor pointer and active state</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Accessibility</h2>
      <ul class="accessibility-list">
        <li>Use semantic HTML structure within cards (<code>&lt;article&gt;</code>, <code>&lt;section&gt;</code>)</li>
        <li>For clickable cards, add <code>tabindex="0"</code> and proper ARIA labels</li>
        <li>Keyboard navigation support with focus indicators</li>
        <li>Sufficient color contrast for text content</li>
        <li>Proper heading hierarchy within card content</li>
      </ul>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Usage in Vue</h2>
      <CodeBlock language="vue">
&lt;script setup lang="ts"&gt;
import { Card } from 'unicorn-lib'
&lt;/script&gt;

&lt;template&gt;
  &lt;Card variant="default"&gt;
    &lt;template #content&gt;
      &lt;h3 class="card-title"&gt;My Card&lt;/h3&gt;
      &lt;div class="card-body"&gt;
        &lt;p&gt;Card content goes here&lt;/p&gt;
      &lt;/div&gt;
    &lt;/template&gt;
  &lt;/Card&gt;
&lt;/template&gt;
      </CodeBlock>
    </section>
  </div>
</template>

<style scoped>
.component-docs {
  padding-bottom: 3rem;
}

.docs-header {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--color-border);
}

.docs-title {
  font-size: 2.5rem;
  font-weight: var(--typography-font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 1rem 0;
}

.docs-description {
  font-size: 1.125rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  margin: 0;
}

.docs-section {
  margin-bottom: 3rem;
}

.docs-section-title {
  font-size: 1.75rem;
  font-weight: var(--typography-font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 1rem 0;
}

.docs-section-text {
  color: var(--color-text);
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
}

.demo-container {
  background: var(--color-background-contrast);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  padding: 2rem;
  margin: 1.5rem 0;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.code-toggle-btn {
  background: none;
  border: 1px solid var(--color-border);
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius-sm);
  color: var(--color-text-muted);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}

.code-toggle-btn:hover {
  color: var(--color-text-primary);
  border-color: var(--color-primary);
}

.props-table {
  overflow-x: auto;
}

.props-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.props-table th,
.props-table td {
  text-align: left;
  padding: 0.75rem;
  border-bottom: 1px solid var(--color-border);
}

.props-table th {
  font-weight: var(--typography-font-weight-semibold);
  color: var(--color-text-primary);
  background: var(--color-background-contrast);
}

.props-table td {
  color: var(--color-text);
}

.props-table code {
  padding: 0.2rem 0.4rem;
  background: var(--color-background-contrast);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  font-family: var(--typography-font-family-monospace);
  font-size: 0.85em;
  color: var(--color-primary);
}

.accessibility-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.accessibility-list li {
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text);
  line-height: 1.6;
}

.accessibility-list li:last-child {
  border-bottom: none;
}

.accessibility-list li::before {
  content: "✓";
  color: var(--color-success);
  font-weight: bold;
  margin-right: 0.75rem;
  font-size: 1.1em;
}

.accessibility-list code {
  padding: 0.2rem 0.4rem;
  background: var(--color-background-contrast);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  font-family: var(--typography-font-family-monospace);
  font-size: 0.9em;
  color: var(--color-primary);
}

@media (max-width: 768px) {
  .docs-title {
    font-size: 2rem;
  }

  .docs-section-title {
    font-size: 1.5rem;
  }

  .demo-container {
    padding: 1.5rem;
  }

  .demo-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
