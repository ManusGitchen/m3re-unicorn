<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '../components/CodeBlock.vue'

const showVariantsCode = ref(false)
const showColorsCode = ref(false)
const showSizesCode = ref(false)
const showRemovableCode = ref(false)
</script>

<template>
  <div class="component-docs">
    <header class="docs-header">
      <h1 class="docs-title">Tag</h1>
      <p class="docs-description">
        Small label components for categorizing, labeling, or displaying status information.
        Available in multiple variants, colors, and sizes.
      </p>
    </header>

    <section class="docs-section">
      <h2 class="docs-section-title">Variants</h2>
      <p class="docs-section-text">
        Tags come in multiple style variants: filled, outlined, soft, and soft-outlined.
      </p>

      <div class="demo-container">
        <div class="demo-buttons">
          <span class="tag tag-filled tag-color-primary tag-md">Filled</span>
          <span class="tag tag-outlined tag-color-primary tag-md">Outlined</span>
          <span class="tag tag-soft tag-color-primary tag-md">Soft</span>
          <span class="tag tag-soft-outlined tag-color-primary tag-md">Soft Outlined</span>
        </div>

        <button class="code-toggle-btn" @click="showVariantsCode = !showVariantsCode">
          {{ showVariantsCode ? 'Hide' : 'Show' }} Code
        </button>

        <CodeBlock v-if="showVariantsCode" language="html">&lt;span class="tag tag-filled tag-color-primary tag-md"&gt;Filled&lt;/span&gt;
&lt;span class="tag tag-outlined tag-color-primary tag-md"&gt;Outlined&lt;/span&gt;
&lt;span class="tag tag-soft tag-color-primary tag-md"&gt;Soft&lt;/span&gt;
&lt;span class="tag tag-soft-outlined tag-color-primary tag-md"&gt;Soft Outlined&lt;/span&gt;</CodeBlock>
      </div>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Semantic Colors</h2>
      <p class="docs-section-text">
        Use semantic colors to communicate status or category.
      </p>

      <div class="demo-container">
        <h3 style="margin-bottom: 0.75rem; font-size: 1rem;">Filled</h3>
        <div class="demo-buttons" style="margin-bottom: 1.5rem;">
          <span class="tag tag-filled tag-color-primary tag-md">Primary</span>
          <span class="tag tag-filled tag-color-secondary tag-md">Secondary</span>
          <span class="tag tag-filled tag-color-success tag-md">Success</span>
          <span class="tag tag-filled tag-color-error tag-md">Error</span>
          <span class="tag tag-filled tag-color-warning tag-md">Warning</span>
          <span class="tag tag-filled tag-color-info tag-md">Info</span>
          <span class="tag tag-filled tag-color-neutral tag-md">Neutral</span>
        </div>

        <h3 style="margin-bottom: 0.75rem; font-size: 1rem;">Outlined</h3>
        <div class="demo-buttons" style="margin-bottom: 1.5rem;">
          <span class="tag tag-outlined tag-color-primary tag-md">Primary</span>
          <span class="tag tag-outlined tag-color-secondary tag-md">Secondary</span>
          <span class="tag tag-outlined tag-color-success tag-md">Success</span>
          <span class="tag tag-outlined tag-color-error tag-md">Error</span>
          <span class="tag tag-outlined tag-color-warning tag-md">Warning</span>
          <span class="tag tag-outlined tag-color-info tag-md">Info</span>
          <span class="tag tag-outlined tag-color-neutral tag-md">Neutral</span>
        </div>

        <h3 style="margin-bottom: 0.75rem; font-size: 1rem;">Soft</h3>
        <div class="demo-buttons">
          <span class="tag tag-soft tag-color-primary tag-md">Primary</span>
          <span class="tag tag-soft tag-color-secondary tag-md">Secondary</span>
          <span class="tag tag-soft tag-color-success tag-md">Success</span>
          <span class="tag tag-soft tag-color-error tag-md">Error</span>
          <span class="tag tag-soft tag-color-warning tag-md">Warning</span>
          <span class="tag tag-soft tag-color-info tag-md">Info</span>
          <span class="tag tag-soft tag-color-neutral tag-md">Neutral</span>
        </div>

        <button class="code-toggle-btn" @click="showColorsCode = !showColorsCode">
          {{ showColorsCode ? 'Hide' : 'Show' }} Code
        </button>

        <CodeBlock v-if="showColorsCode" language="html">&lt;span class="tag tag-filled tag-color-success tag-md"&gt;Success&lt;/span&gt;
&lt;span class="tag tag-filled tag-color-error tag-md"&gt;Error&lt;/span&gt;
&lt;span class="tag tag-filled tag-color-warning tag-md"&gt;Warning&lt;/span&gt;
&lt;span class="tag tag-filled tag-color-info tag-md"&gt;Info&lt;/span&gt;</CodeBlock>
      </div>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Sizes</h2>
      <p class="docs-section-text">
        Three size options to fit different contexts.
      </p>

      <div class="demo-container">
        <div class="demo-buttons" style="align-items: center;">
          <span class="tag tag-filled tag-color-primary tag-sm">Small</span>
          <span class="tag tag-filled tag-color-primary tag-md">Medium</span>
          <span class="tag tag-filled tag-color-primary tag-lg">Large</span>
        </div>

        <button class="code-toggle-btn" @click="showSizesCode = !showSizesCode">
          {{ showSizesCode ? 'Hide' : 'Show' }} Code
        </button>

        <CodeBlock v-if="showSizesCode" language="html">&lt;span class="tag tag-filled tag-color-primary tag-sm"&gt;Small&lt;/span&gt;
&lt;span class="tag tag-filled tag-color-primary tag-md"&gt;Medium&lt;/span&gt;
&lt;span class="tag tag-filled tag-color-primary tag-lg"&gt;Large&lt;/span&gt;</CodeBlock>
      </div>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">With Icons</h2>
      <p class="docs-section-text">
        Tags can include icons for additional context.
      </p>

      <div class="demo-container">
        <div class="demo-buttons">
          <span class="tag tag-filled tag-color-success tag-md">
            <span class="tag-icon tag-icon-prepend">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"/>
              </svg>
            </span>
            Success
          </span>

          <span class="tag tag-filled tag-color-error tag-md">
            <span class="tag-icon tag-icon-prepend">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z"/>
              </svg>
            </span>
            Error
          </span>

          <span class="tag tag-filled tag-color-info tag-md">
            <span class="tag-icon tag-icon-prepend">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
              </svg>
            </span>
            Info
          </span>
        </div>
      </div>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Removable Tags</h2>
      <p class="docs-section-text">
        Tags can be made removable by adding a close button.
      </p>

      <div class="demo-container">
        <div class="demo-buttons">
          <span class="tag tag-filled tag-color-primary tag-md tag-removable">
            Removable Tag
            <button type="button" class="tag-remove" aria-label="Remove tag">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
              </svg>
            </button>
          </span>
        </div>

        <button class="code-toggle-btn" @click="showRemovableCode = !showRemovableCode">
          {{ showRemovableCode ? 'Hide' : 'Show' }} Code
        </button>

        <CodeBlock v-if="showRemovableCode" language="html">&lt;span class="tag tag-filled tag-color-primary tag-md tag-removable"&gt;
  Removable Tag
  &lt;button type="button" class="tag-remove" aria-label="Remove tag"&gt;
    &lt;!-- Close icon --&gt;
  &lt;/button&gt;
&lt;/span&gt;</CodeBlock>
      </div>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Classes</h2>
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
              <td><code>.tag</code></td>
              <td>Base tag component</td>
            </tr>
            <tr>
              <td><code>.tag-filled</code></td>
              <td>Filled background variant</td>
            </tr>
            <tr>
              <td><code>.tag-outlined</code></td>
              <td>Outlined variant with border</td>
            </tr>
            <tr>
              <td><code>.tag-soft</code></td>
              <td>Soft tinted background</td>
            </tr>
            <tr>
              <td><code>.tag-soft-outlined</code></td>
              <td>Soft background with border</td>
            </tr>
            <tr>
              <td><code>.tag-color-*</code></td>
              <td>Color variants (primary, success, error, etc.)</td>
            </tr>
            <tr>
              <td><code>.tag-sm/md/lg</code></td>
              <td>Size variants</td>
            </tr>
            <tr>
              <td><code>.tag-removable</code></td>
              <td>Tag with remove button</td>
            </tr>
            <tr>
              <td><code>.tag-rounded-*</code></td>
              <td>Border radius variants (sm, md, lg, full)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Accessibility</h2>
      <ul class="accessibility-list">
        <li>Use semantic HTML (<code>&lt;span&gt;</code> for non-interactive, <code>&lt;button&gt;</code> for interactive)</li>
        <li>Remove buttons include <code>aria-label</code> for screen reader context</li>
        <li>Color is not the only indicator - icons and text provide additional context</li>
        <li>Sufficient color contrast for all color variants</li>
        <li>Keyboard accessible when using removable tags</li>
      </ul>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Usage in Vue</h2>
      <CodeBlock language="vue">&lt;script setup lang="ts"&gt;
import { ref } from 'vue'

const tags = ref(['Vue', 'TypeScript', 'Vite'])

function removeTag(index: number) {
  tags.value.splice(index, 1)
}
&lt;/script&gt;

&lt;template&gt;
  &lt;div class="tags-container"&gt;
    &lt;span
      v-for="(tag, index) in tags"
      :key="tag"
      class="tag tag-filled tag-color-primary tag-md tag-removable"
    &gt;
      &#123;&#123; tag &#125;&#125;
      &lt;button
        type="button"
        class="tag-remove"
        aria-label="Remove tag"
        @click="removeTag(index)"
      &gt;
        ×
      &lt;/button&gt;
    &lt;/span&gt;
  &lt;/div&gt;
&lt;/template&gt;</CodeBlock>
    </section>
  </div>
</template>

<style scoped>
.component-docs { padding-bottom: 3rem; }
.docs-header { margin-bottom: 3rem; padding-bottom: 2rem; border-bottom: 1px solid var(--color-border); }
.docs-title { font-size: 2.5rem; font-weight: var(--typography-font-weight-bold); color: var(--color-text-primary); margin: 0 0 1rem 0; }
.docs-description { font-size: 1.125rem; color: var(--color-text-muted); line-height: 1.6; margin: 0; }
.docs-section { margin-bottom: 3rem; }
.docs-section-title { font-size: 1.75rem; font-weight: var(--typography-font-weight-semibold); color: var(--color-text-primary); margin: 0 0 1rem 0; }
.docs-section-text { color: var(--color-text); line-height: 1.6; margin: 0 0 1.5rem 0; }
.demo-container { background: var(--color-background-contrast); border: 1px solid var(--color-border); border-radius: var(--border-radius-lg); padding: 2rem; margin: 1.5rem 0; }
.demo-buttons { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem; }
.code-toggle-btn { background: none; border: 1px solid var(--color-border); padding: 0.5rem 1rem; border-radius: var(--border-radius-sm); color: var(--color-text-muted); font-size: 0.875rem; cursor: pointer; transition: all 0.2s; font-family: inherit; }
.code-toggle-btn:hover { color: var(--color-text-primary); border-color: var(--color-primary); }
.props-table { overflow-x: auto; }
.props-table table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
.props-table th, .props-table td { text-align: left; padding: 0.75rem; border-bottom: 1px solid var(--color-border); }
.props-table th { font-weight: var(--typography-font-weight-semibold); color: var(--color-text-primary); background: var(--color-background-contrast); }
.props-table td { color: var(--color-text); }
.props-table code { padding: 0.2rem 0.4rem; background: var(--color-background-contrast); border: 1px solid var(--color-border); border-radius: var(--border-radius-sm); font-family: var(--typography-font-family-monospace); font-size: 0.85em; color: var(--color-primary); }
.accessibility-list { list-style: none; padding: 0; margin: 0; }
.accessibility-list li { padding: 0.75rem 0; border-bottom: 1px solid var(--color-border); color: var(--color-text); line-height: 1.6; }
.accessibility-list li:last-child { border-bottom: none; }
.accessibility-list li::before { content: "✓"; color: var(--color-success); font-weight: bold; margin-right: 0.75rem; font-size: 1.1em; }
.accessibility-list code { padding: 0.2rem 0.4rem; background: var(--color-background-contrast); border: 1px solid var(--color-border); border-radius: var(--border-radius-sm); font-family: var(--typography-font-family-monospace); font-size: 0.9em; color: var(--color-primary); }

@media (max-width: 768px) {
  .docs-title { font-size: 2rem; }
  .docs-section-title { font-size: 1.5rem; }
  .demo-container { padding: 1.5rem; }
}
</style>
