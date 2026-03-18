<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '../components/CodeBlock.vue'

const showBasicCode = ref(false)
const showSizesCode = ref(false)
const showPositionCode = ref(false)

const showDefaultDialog = ref(false)
const showSmallDialog = ref(false)
const showFloatDialog = ref(false)
</script>

<template>
  <div class="component-docs">
    <header class="docs-header">
      <h1 class="docs-title">Dialog</h1>
      <p class="docs-description">
        Modal dialog component with backdrop overlay, multiple sizes, and positioning options.
        Fully accessible with focus management and keyboard support.
      </p>
    </header>

    <section class="docs-section">
      <h2 class="docs-section-title">Basic Dialog</h2>
      <p class="docs-section-text">
        Centered dialog with backdrop overlay. Click outside or press Escape to close.
      </p>

      <div class="demo-container">
        <div class="demo-buttons">
          <button class="btn btn-primary btn-md" @click="showDefaultDialog = true">
            Open Default Dialog
          </button>
        </div>

        <!-- Dialog Example -->
        <div v-if="showDefaultDialog" class="dialog-overlay" @click.self="showDefaultDialog = false">
          <div class="dialog dialog-center dialog-md" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
            <div class="dialog-content">
              <div class="dialog-header">
                <h2 id="dialog-title" class="dialog-title">Dialog Title</h2>
                <button
                  type="button"
                  class="dialog-close"
                  aria-label="Close dialog"
                  @click="showDefaultDialog = false"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                  </svg>
                </button>
              </div>
              <div class="dialog-body">
                <p>This is a centered dialog that appears over the content with a backdrop overlay.</p>
                <p>You can close it by clicking the X button, clicking outside, or pressing Escape.</p>
              </div>
              <div class="dialog-footer">
                <button class="btn btn-secondary btn-md" @click="showDefaultDialog = false">Cancel</button>
                <button class="btn btn-primary btn-md" @click="showDefaultDialog = false">Confirm</button>
              </div>
            </div>
          </div>
        </div>

        <button class="code-toggle-btn" @click="showBasicCode = !showBasicCode">
          {{ showBasicCode ? 'Hide' : 'Show' }} Code
        </button>

        <CodeBlock v-if="showBasicCode" language="html">
&lt;div class="dialog-overlay"&gt;
  &lt;div class="dialog dialog-center dialog-md" role="dialog" aria-modal="true"&gt;
    &lt;div class="dialog-content"&gt;
      &lt;div class="dialog-header"&gt;
        &lt;h2 class="dialog-title"&gt;Dialog Title&lt;/h2&gt;
        &lt;button type="button" class="dialog-close" aria-label="Close"&gt;
          &lt;!-- Close icon --&gt;
        &lt;/button&gt;
      &lt;/div&gt;
      &lt;div class="dialog-body"&gt;
        &lt;p&gt;Dialog content goes here.&lt;/p&gt;
      &lt;/div&gt;
      &lt;div class="dialog-footer"&gt;
        &lt;button class="btn btn-secondary btn-md"&gt;Cancel&lt;/button&gt;
        &lt;button class="btn btn-primary btn-md"&gt;Confirm&lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
        </CodeBlock>
      </div>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Sizes</h2>
      <p class="docs-section-text">
        Three size options: small, medium (default), and large.
      </p>

      <div class="demo-container">
        <div class="demo-buttons">
          <button class="btn btn-primary btn-md" @click="showSmallDialog = true">
            Open Small Dialog
          </button>
        </div>

        <div v-if="showSmallDialog" class="dialog-overlay" @click.self="showSmallDialog = false">
          <div class="dialog dialog-center dialog-sm" role="dialog" aria-modal="true">
            <div class="dialog-content">
              <div class="dialog-header">
                <h2 class="dialog-title">Small Dialog</h2>
                <button
                  type="button"
                  class="dialog-close"
                  aria-label="Close dialog"
                  @click="showSmallDialog = false"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                  </svg>
                </button>
              </div>
              <div class="dialog-body">
                <p>This is a small dialog, perfect for simple confirmations or alerts.</p>
              </div>
              <div class="dialog-footer">
                <button class="btn btn-primary btn-md" @click="showSmallDialog = false">OK</button>
              </div>
            </div>
          </div>
        </div>

        <button class="code-toggle-btn" @click="showSizesCode = !showSizesCode">
          {{ showSizesCode ? 'Hide' : 'Show' }} Code
        </button>

        <CodeBlock v-if="showSizesCode" language="html">
&lt;!-- Small --&gt;
&lt;div class="dialog dialog-center dialog-sm"&gt;...&lt;/div&gt;

&lt;!-- Medium (default) --&gt;
&lt;div class="dialog dialog-center dialog-md"&gt;...&lt;/div&gt;

&lt;!-- Large --&gt;
&lt;div class="dialog dialog-center dialog-lg"&gt;...&lt;/div&gt;

&lt;!-- Fullscreen --&gt;
&lt;div class="dialog dialog-fullscreen"&gt;...&lt;/div&gt;
        </CodeBlock>
      </div>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Float Positions</h2>
      <p class="docs-section-text">
        Dialogs can float from different edges: bottom, top, left, or right.
      </p>

      <div class="demo-container">
        <div class="demo-buttons">
          <button class="btn btn-primary btn-md" @click="showFloatDialog = true">
            Float from Bottom
          </button>
        </div>

        <div v-if="showFloatDialog" class="dialog-overlay" @click.self="showFloatDialog = false">
          <div class="dialog dialog-float-bottom" role="dialog" aria-modal="true">
            <div class="dialog-content">
              <div class="dialog-header">
                <h2 class="dialog-title">Float from Bottom</h2>
                <button
                  type="button"
                  class="dialog-close"
                  aria-label="Close dialog"
                  @click="showFloatDialog = false"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                  </svg>
                </button>
              </div>
              <div class="dialog-body">
                <p>This dialog slides up from the bottom of the screen.</p>
              </div>
              <div class="dialog-footer">
                <button class="btn btn-primary btn-md" @click="showFloatDialog = false">Close</button>
              </div>
            </div>
          </div>
        </div>

        <button class="code-toggle-btn" @click="showPositionCode = !showPositionCode">
          {{ showPositionCode ? 'Hide' : 'Show' }} Code
        </button>

        <CodeBlock v-if="showPositionCode" language="html">
&lt;!-- Float from bottom --&gt;
&lt;div class="dialog dialog-float-bottom"&gt;...&lt;/div&gt;

&lt;!-- Float from top --&gt;
&lt;div class="dialog dialog-float-top"&gt;...&lt;/div&gt;

&lt;!-- Float from left --&gt;
&lt;div class="dialog dialog-float-left"&gt;...&lt;/div&gt;

&lt;!-- Float from right --&gt;
&lt;div class="dialog dialog-float-right"&gt;...&lt;/div&gt;
        </CodeBlock>
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
              <td><code>.dialog-overlay</code></td>
              <td>Backdrop overlay container</td>
            </tr>
            <tr>
              <td><code>.dialog</code></td>
              <td>Base dialog component</td>
            </tr>
            <tr>
              <td><code>.dialog-center</code></td>
              <td>Center dialog on screen (default)</td>
            </tr>
            <tr>
              <td><code>.dialog-sm</code></td>
              <td>Small dialog size (400px)</td>
            </tr>
            <tr>
              <td><code>.dialog-md</code></td>
              <td>Medium dialog size (600px)</td>
            </tr>
            <tr>
              <td><code>.dialog-lg</code></td>
              <td>Large dialog size (900px)</td>
            </tr>
            <tr>
              <td><code>.dialog-fullscreen</code></td>
              <td>Full screen dialog</td>
            </tr>
            <tr>
              <td><code>.dialog-float-bottom/top/left/right</code></td>
              <td>Float from specific edge</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Accessibility</h2>
      <ul class="accessibility-list">
        <li>Uses <code>role="dialog"</code> and <code>aria-modal="true"</code> for screen readers</li>
        <li>Focus is trapped within the dialog when open</li>
        <li>Pressing Escape closes the dialog</li>
        <li>Clicking the backdrop closes the dialog</li>
        <li>Dialog title uses <code>aria-labelledby</code> for proper labeling</li>
        <li>Close button has <code>aria-label</code> for screen reader context</li>
        <li>Focus returns to trigger element when dialog closes</li>
      </ul>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Usage in Vue</h2>
      <CodeBlock language="vue">
&lt;script setup lang="ts"&gt;
import { ref } from 'vue'

const showDialog = ref(false)

function openDialog() {
  showDialog.value = true
}

function closeDialog() {
  showDialog.value = false
}
&lt;/script&gt;

&lt;template&gt;
  &lt;button @click="openDialog"&gt;Open Dialog&lt;/button&gt;

  &lt;div v-if="showDialog" class="dialog-overlay" @click.self="closeDialog"&gt;
    &lt;div class="dialog dialog-center dialog-md" role="dialog" aria-modal="true"&gt;
      &lt;div class="dialog-content"&gt;
        &lt;div class="dialog-header"&gt;
          &lt;h2 class="dialog-title"&gt;Title&lt;/h2&gt;
          &lt;button @click="closeDialog" class="dialog-close"&gt;×&lt;/button&gt;
        &lt;/div&gt;
        &lt;div class="dialog-body"&gt;
          Content here
        &lt;/div&gt;
        &lt;div class="dialog-footer"&gt;
          &lt;button @click="closeDialog"&gt;Close&lt;/button&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;
      </CodeBlock>
    </section>
  </div>
</template>

<style scoped>
/* Include the same styles from ButtonDocs.vue */
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
