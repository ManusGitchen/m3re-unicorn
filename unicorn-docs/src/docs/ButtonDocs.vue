<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '../components/CodeBlock.vue'

const showVariantsCode = ref(false)
const showColorsCode = ref(false)
const showSizesCode = ref(false)
const showRainbowCode = ref(false)
</script>

<template>
  <div class="component-docs">
    <header class="docs-header">
      <h1 class="docs-title">Button</h1>
      <p class="docs-description">
        A versatile button component with multiple variants, colors, and sizes.
        Fully accessible with keyboard navigation and ARIA support.
      </p>
    </header>

    <section class="docs-section">
      <h2 class="docs-section-title">Variants</h2>
      <p class="docs-section-text">
        Buttons come in four style variants: primary (filled), secondary (outline), tertiary (ghost), and link.
      </p>

      <div class="demo-container">
        <div class="demo-buttons">
          <button class="btn btn-primary btn-color-primary btn-md">Primary</button>
          <button class="btn btn-secondary btn-color-primary btn-md">Secondary</button>
          <button class="btn btn-tertiary btn-color-primary btn-md">Tertiary</button>
          <button class="btn btn-link btn-color-primary btn-md">Link</button>
        </div>

        <button class="code-toggle-btn" @click="showVariantsCode = !showVariantsCode">
          {{ showVariantsCode ? 'Hide' : 'Show' }} Code
        </button>

        <CodeBlock v-if="showVariantsCode" language="html">
&lt;button class="btn btn-primary btn-color-primary btn-md"&gt;Primary&lt;/button&gt;
&lt;button class="btn btn-secondary btn-color-primary btn-md"&gt;Secondary&lt;/button&gt;
&lt;button class="btn btn-tertiary btn-color-primary btn-md"&gt;Tertiary&lt;/button&gt;
&lt;button class="btn btn-link btn-color-primary btn-md"&gt;Link&lt;/button&gt;
        </CodeBlock>
      </div>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Colors</h2>
      <p class="docs-section-text">
        Semantic color variants for different button purposes.
      </p>

      <div class="demo-container">
        <div class="demo-buttons">
          <button class="btn btn-primary btn-color-primary btn-md">Primary</button>
          <button class="btn btn-primary btn-color-secondary btn-md">Secondary</button>
          <button class="btn btn-primary btn-color-success btn-md">Success</button>
          <button class="btn btn-primary btn-color-error btn-md">Error</button>
          <button class="btn btn-primary btn-color-warning btn-md">Warning</button>
          <button class="btn btn-primary btn-color-info btn-md">Info</button>
        </div>

        <button class="code-toggle-btn" @click="showColorsCode = !showColorsCode">
          {{ showColorsCode ? 'Hide' : 'Show' }} Code
        </button>

        <CodeBlock v-if="showColorsCode" language="html">
&lt;button class="btn btn-primary btn-color-primary btn-md"&gt;Primary&lt;/button&gt;
&lt;button class="btn btn-primary btn-color-secondary btn-md"&gt;Secondary&lt;/button&gt;
&lt;button class="btn btn-primary btn-color-success btn-md"&gt;Success&lt;/button&gt;
&lt;button class="btn btn-primary btn-color-error btn-md"&gt;Error&lt;/button&gt;
&lt;button class="btn btn-primary btn-color-warning btn-md"&gt;Warning&lt;/button&gt;
&lt;button class="btn btn-primary btn-color-info btn-md"&gt;Info&lt;/button&gt;
        </CodeBlock>
      </div>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Sizes</h2>
      <p class="docs-section-text">
        Three size options to fit different UI contexts.
      </p>

      <div class="demo-container">
        <div class="demo-buttons" style="align-items: center;">
          <button class="btn btn-primary btn-color-primary btn-sm">Small</button>
          <button class="btn btn-primary btn-color-primary btn-md">Medium</button>
          <button class="btn btn-primary btn-color-primary btn-lg">Large</button>
        </div>

        <button class="code-toggle-btn" @click="showSizesCode = !showSizesCode">
          {{ showSizesCode ? 'Hide' : 'Show' }} Code
        </button>

        <CodeBlock v-if="showSizesCode" language="html">
&lt;button class="btn btn-primary btn-color-primary btn-sm"&gt;Small&lt;/button&gt;
&lt;button class="btn btn-primary btn-color-primary btn-md"&gt;Medium&lt;/button&gt;
&lt;button class="btn btn-primary btn-color-primary btn-lg"&gt;Large&lt;/button&gt;
        </CodeBlock>
      </div>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Rainbow Border</h2>
      <p class="docs-section-text">
        Create vibrant gradient borders by wrapping buttons with a rainbow wrapper and customizing the gradient colors.
      </p>

      <div class="demo-container">
        <div class="demo-buttons">
          <div class="btn-rainbow-wrapper" style="--rainbow-colors: var(--color-primary) 50%, var(--color-secondary) 50%;">
            <button class="btn btn-rainbow-border btn-md">Default Rainbow</button>
          </div>
          <div class="btn-rainbow-wrapper" style="--rainbow-colors: var(--color-success) 0%, var(--color-info) 50%, var(--color-warning) 100%;">
            <button class="btn btn-rainbow-border btn-md">Custom Gradient</button>
          </div>
          <div class="btn-rainbow-wrapper" style="--rainbow-colors: #FF6B9D, #C371F2, #4FACFE;">
            <button class="btn btn-rainbow-border btn-md">Pink to Blue</button>
          </div>
        </div>

        <button class="code-toggle-btn" @click="showRainbowCode = !showRainbowCode">
          {{ showRainbowCode ? 'Hide' : 'Show' }} Code
        </button>

        <CodeBlock v-if="showRainbowCode" language="html">
&lt;div class="btn-rainbow-wrapper" style="--rainbow-colors: var(--color-primary) 50%, var(--color-secondary) 50%;"&gt;
  &lt;button class="btn btn-rainbow-border btn-md"&gt;Default Rainbow&lt;/button&gt;
&lt;/div&gt;

&lt;div class="btn-rainbow-wrapper" style="--rainbow-colors: var(--color-success) 0%, var(--color-info) 50%, var(--color-warning) 100%;"&gt;
  &lt;button class="btn btn-rainbow-border btn-md"&gt;Custom Gradient&lt;/button&gt;
&lt;/div&gt;

&lt;div class="btn-rainbow-wrapper" style="--rainbow-colors: #FF6B9D, #C371F2, #4FACFE;"&gt;
  &lt;button class="btn btn-rainbow-border btn-md"&gt;Pink to Blue&lt;/button&gt;
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
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>variant</code></td>
              <td><code>'primary' | 'secondary' | 'tertiary' | 'link'</code></td>
              <td><code>'primary'</code></td>
              <td>Button style variant</td>
            </tr>
            <tr>
              <td><code>color</code></td>
              <td><code>'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'</code></td>
              <td><code>'primary'</code></td>
              <td>Button semantic color</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>'sm' | 'md' | 'lg'</code></td>
              <td><code>'md'</code></td>
              <td>Button size</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Disable button interaction</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Accessibility</h2>
      <ul class="accessibility-list">
        <li>Uses semantic <code>&lt;button&gt;</code> element for proper screen reader support</li>
        <li>Keyboard accessible with Tab navigation and Enter/Space activation</li>
        <li>Clear focus indicators with <code>:focus-visible</code> styles</li>
        <li>Meets WCAG 2.1 AA color contrast requirements (4.5:1 for text)</li>
        <li>Minimum 44x44px touch target on mobile devices</li>
        <li>Disabled state properly communicated to assistive technologies</li>
      </ul>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Usage in Vue</h2>
      <CodeBlock language="vue">
&lt;script setup lang="ts"&gt;
import { Button } from 'unicorn-lib'

function handleClick() {
  console.log('Button clicked!')
}
&lt;/script&gt;

&lt;template&gt;
  &lt;Button
    variant="primary"
    color="primary"
    size="md"
    @click="handleClick"
  &gt;
    Click me
  &lt;/Button&gt;
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

.demo-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
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

  .demo-buttons {
    gap: 0.75rem;
  }
}
</style>
