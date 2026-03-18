<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '../components/CodeBlock.vue'

const showSpacingCode = ref(false)
const showFlexCode = ref(false)
const showGridCode = ref(false)
const showSizingCode = ref(false)
</script>

<template>
  <div class="component-docs">
    <header class="docs-header">
      <h1 class="docs-title">Utility Classes</h1>
      <p class="docs-description">
        Comprehensive utility classes for rapid UI development. Control spacing, layout, sizing,
        and positioning without writing custom CSS.
      </p>
    </header>

    <section class="docs-section">
      <h2 class="docs-section-title">Spacing Utilities</h2>
      <p class="docs-section-text">
        Padding and margin utilities with semantic sizes (xs, sm, md, lg, xl) or numeric values (1-24).
        Use directional variants for precise control.
      </p>

      <div class="demo-container">
        <h3 style="margin-bottom: 1rem; font-size: 1.1rem; font-weight: 600;">Padding</h3>
        <p style="margin-bottom: 1rem; color: var(--color-text-muted); font-size: 0.9rem;">
          Apply padding: <code>p-*</code>, <code>pt-*</code>, <code>pr-*</code>, <code>pb-*</code>, <code>pl-*</code>, <code>px-*</code>, <code>py-*</code>
        </p>
        <div class="utility-demo-grid">
          <div class="utility-demo-item p-xs">p-xs</div>
          <div class="utility-demo-item p-sm">p-sm</div>
          <div class="utility-demo-item p-md">p-md</div>
          <div class="utility-demo-item p-lg">p-lg</div>
          <div class="utility-demo-item p-xl">p-xl</div>
        </div>

        <h3 style="margin: 2rem 0 1rem; font-size: 1.1rem; font-weight: 600;">Margin</h3>
        <p style="margin-bottom: 1rem; color: var(--color-text-muted); font-size: 0.9rem;">
          Apply margin: <code>m-*</code>, <code>mt-*</code>, <code>mr-*</code>, <code>mb-*</code>, <code>ml-*</code>, <code>mx-*</code>, <code>my-*</code>
        </p>
        <div style="background: var(--color-background); padding: 1rem; border-radius: var(--border-radius-md);">
          <div class="utility-demo-item mx-auto" style="width: 200px;">mx-auto (centered)</div>
        </div>

        <button class="code-toggle-btn" @click="showSpacingCode = !showSpacingCode">
          {{ showSpacingCode ? 'Hide' : 'Show' }} Code
        </button>

        <CodeBlock v-if="showSpacingCode" language="html">&lt;!-- Padding --&gt;
&lt;div class="p-md"&gt;All sides&lt;/div&gt;
&lt;div class="px-lg py-sm"&gt;Horizontal large, vertical small&lt;/div&gt;
&lt;div class="pt-xl pb-md"&gt;Top extra large, bottom medium&lt;/div&gt;

&lt;!-- Margin --&gt;
&lt;div class="m-lg"&gt;All sides&lt;/div&gt;
&lt;div class="mx-auto"&gt;Centered horizontally&lt;/div&gt;
&lt;div class="mt-md mb-lg"&gt;Top medium, bottom large&lt;/div&gt;

&lt;!-- Numeric values (4px scale) --&gt;
&lt;div class="p-4"&gt;16px padding&lt;/div&gt;
&lt;div class="m-8"&gt;32px margin&lt;/div&gt;</CodeBlock>
      </div>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Flexbox Utilities</h2>
      <p class="docs-section-text">
        Control flex layouts with direction, alignment, wrapping, and gap utilities.
      </p>

      <div class="demo-container">
        <h3 style="margin-bottom: 1rem; font-size: 1.1rem; font-weight: 600;">Flex Direction & Gap</h3>
        <div class="flex gap-md" style="margin-bottom: 1.5rem;">
          <div class="utility-demo-item">Item 1</div>
          <div class="utility-demo-item">Item 2</div>
          <div class="utility-demo-item">Item 3</div>
        </div>
        <code>.flex .gap-md</code>

        <h3 style="margin: 2rem 0 1rem; font-size: 1.1rem; font-weight: 600;">Flex Column</h3>
        <div class="flex flex-col gap-sm" style="max-width: 200px; margin-bottom: 1.5rem;">
          <div class="utility-demo-item">Item 1</div>
          <div class="utility-demo-item">Item 2</div>
          <div class="utility-demo-item">Item 3</div>
        </div>
        <code>.flex .flex-col .gap-sm</code>

        <h3 style="margin: 2rem 0 1rem; font-size: 1.1rem; font-weight: 600;">Justify & Align</h3>
        <div class="flex justify-between items-center gap-md" style="margin-bottom: 1.5rem; min-height: 60px;">
          <div class="utility-demo-item">Left</div>
          <div class="utility-demo-item">Center</div>
          <div class="utility-demo-item">Right</div>
        </div>
        <code>.flex .justify-between .items-center</code>

        <button class="code-toggle-btn" @click="showFlexCode = !showFlexCode">
          {{ showFlexCode ? 'Hide' : 'Show' }} Code
        </button>

        <CodeBlock v-if="showFlexCode" language="html">&lt;!-- Basic flex --&gt;
&lt;div class="flex gap-md"&gt;
  &lt;div&gt;Item 1&lt;/div&gt;
  &lt;div&gt;Item 2&lt;/div&gt;
&lt;/div&gt;

&lt;!-- Flex column --&gt;
&lt;div class="flex flex-col gap-sm"&gt;...&lt;/div&gt;

&lt;!-- Alignment --&gt;
&lt;div class="flex justify-center items-center"&gt;...&lt;/div&gt;
&lt;div class="flex justify-between items-start"&gt;...&lt;/div&gt;
&lt;div class="flex justify-end items-end"&gt;...&lt;/div&gt;

&lt;!-- Wrapping --&gt;
&lt;div class="flex flex-wrap gap-md"&gt;...&lt;/div&gt;</CodeBlock>
      </div>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Grid Utilities</h2>
      <p class="docs-section-text">
        CSS Grid utilities for complex layouts with responsive column counts.
      </p>

      <div class="demo-container">
        <h3 style="margin-bottom: 1rem; font-size: 1.1rem; font-weight: 600;">Grid with Auto Columns</h3>
        <div class="grid gap-md" style="margin-bottom: 1.5rem;">
          <div class="utility-demo-item">1</div>
          <div class="utility-demo-item">2</div>
          <div class="utility-demo-item">3</div>
          <div class="utility-demo-item">4</div>
        </div>
        <code>.grid .gap-md</code>

        <h3 style="margin: 2rem 0 1rem; font-size: 1.1rem; font-weight: 600;">Grid with Specific Columns</h3>
        <div class="grid grid-cols-3 gap-md" style="margin-bottom: 1.5rem;">
          <div class="utility-demo-item">1</div>
          <div class="utility-demo-item">2</div>
          <div class="utility-demo-item">3</div>
          <div class="utility-demo-item">4</div>
          <div class="utility-demo-item">5</div>
          <div class="utility-demo-item">6</div>
        </div>
        <code>.grid .grid-cols-3 .gap-md</code>

        <button class="code-toggle-btn" @click="showGridCode = !showGridCode">
          {{ showGridCode ? 'Hide' : 'Show' }} Code
        </button>

        <CodeBlock v-if="showGridCode" language="html">&lt;!-- Auto-fit grid --&gt;
&lt;div class="grid gap-md"&gt;
  &lt;div&gt;Item 1&lt;/div&gt;
  &lt;div&gt;Item 2&lt;/div&gt;
&lt;/div&gt;

&lt;!-- Fixed columns --&gt;
&lt;div class="grid grid-cols-2 gap-lg"&gt;...&lt;/div&gt;
&lt;div class="grid grid-cols-3 gap-md"&gt;...&lt;/div&gt;
&lt;div class="grid grid-cols-4 gap-sm"&gt;...&lt;/div&gt;

&lt;!-- Responsive --&gt;
&lt;div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md"&gt;
  ...
&lt;/div&gt;</CodeBlock>
      </div>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Sizing Utilities</h2>
      <p class="docs-section-text">
        Width and height utilities for common sizing needs.
      </p>

      <div class="demo-container">
        <h3 style="margin-bottom: 1rem; font-size: 1.1rem; font-weight: 600;">Width</h3>
        <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
          <div class="w-full utility-demo-item">w-full (100%)</div>
          <div class="w-1/2 utility-demo-item">w-1/2 (50%)</div>
          <div class="w-1/3 utility-demo-item">w-1/3 (33%)</div>
        </div>

        <h3 style="margin: 2rem 0 1rem; font-size: 1.1rem; font-weight: 600;">Height</h3>
        <div style="display: flex; gap: 1rem; align-items: flex-start;">
          <div class="h-screen utility-demo-item" style="max-height: 150px;">h-screen</div>
          <div class="h-full utility-demo-item" style="height: 80px;">h-full</div>
          <div class="min-h-screen utility-demo-item" style="min-height: 100px;">min-h-screen</div>
        </div>

        <button class="code-toggle-btn" @click="showSizingCode = !showSizingCode">
          {{ showSizingCode ? 'Hide' : 'Show' }} Code
        </button>

        <CodeBlock v-if="showSizingCode" language="html">&lt;!-- Width --&gt;
&lt;div class="w-full"&gt;100% width&lt;/div&gt;
&lt;div class="w-1/2"&gt;50% width&lt;/div&gt;
&lt;div class="w-auto"&gt;Auto width&lt;/div&gt;

&lt;!-- Height --&gt;
&lt;div class="h-screen"&gt;100vh height&lt;/div&gt;
&lt;div class="h-full"&gt;100% height&lt;/div&gt;
&lt;div class="min-h-screen"&gt;Min 100vh&lt;/div&gt;</CodeBlock>
      </div>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Display & Position</h2>
      <div class="props-table">
        <table>
          <thead>
            <tr>
              <th>Class</th>
              <th>CSS Property</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>.block</code></td>
              <td>display: block</td>
            </tr>
            <tr>
              <td><code>.inline</code></td>
              <td>display: inline</td>
            </tr>
            <tr>
              <td><code>.inline-block</code></td>
              <td>display: inline-block</td>
            </tr>
            <tr>
              <td><code>.hidden</code></td>
              <td>display: none</td>
            </tr>
            <tr>
              <td><code>.relative</code></td>
              <td>position: relative</td>
            </tr>
            <tr>
              <td><code>.absolute</code></td>
              <td>position: absolute</td>
            </tr>
            <tr>
              <td><code>.fixed</code></td>
              <td>position: fixed</td>
            </tr>
            <tr>
              <td><code>.sticky</code></td>
              <td>position: sticky</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Complete Utility Reference</h2>
      <div class="props-table">
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Classes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Spacing</strong></td>
              <td>
                <code>p-*</code>, <code>m-*</code> with xs/sm/md/lg/xl or 1-24<br>
                Directional: <code>pt-*</code>, <code>pr-*</code>, <code>pb-*</code>, <code>pl-*</code>, <code>px-*</code>, <code>py-*</code>
              </td>
            </tr>
            <tr>
              <td><strong>Flexbox</strong></td>
              <td>
                <code>.flex</code>, <code>.flex-col</code>, <code>.flex-row</code><br>
                <code>.justify-start/center/end/between/around</code><br>
                <code>.items-start/center/end/stretch</code><br>
                <code>.flex-wrap</code>, <code>.flex-nowrap</code>
              </td>
            </tr>
            <tr>
              <td><strong>Grid</strong></td>
              <td>
                <code>.grid</code>, <code>.grid-cols-1/2/3/4/6/12</code><br>
                <code>.gap-xs/sm/md/lg/xl</code> or <code>.gap-1</code> through <code>.gap-24</code>
              </td>
            </tr>
            <tr>
              <td><strong>Sizing</strong></td>
              <td>
                <code>.w-full/auto/1/2/1/3/2/3</code><br>
                <code>.h-screen/full</code>, <code>.min-h-screen</code><br>
                <code>.max-w-xs/sm/md/lg/xl/2xl</code>
              </td>
            </tr>
            <tr>
              <td><strong>Text</strong></td>
              <td>
                <code>.text-left/center/right</code><br>
                <code>.text-xs/sm/base/lg/xl</code><br>
                <code>.font-normal/medium/semibold/bold</code>
              </td>
            </tr>
            <tr>
              <td><strong>Border</strong></td>
              <td>
                <code>.border</code>, <code>.border-t/r/b/l</code><br>
                <code>.rounded-none/sm/md/lg/full</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Best Practices</h2>
      <ul class="accessibility-list">
        <li>Use utilities for one-off styling needs, not repeated patterns</li>
        <li>Create component classes for patterns used 3+ times</li>
        <li>Combine utilities to build layouts quickly</li>
        <li>Semantic sizes (xs, sm, md) are preferred over numeric values</li>
        <li>Use responsive variants for mobile-first design</li>
        <li>Keep markup readable - break long utility lists into logical groups</li>
      </ul>
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
.code-toggle-btn { background: none; border: 1px solid var(--color-border); padding: 0.5rem 1rem; border-radius: var(--border-radius-sm); color: var(--color-text-muted); font-size: 0.875rem; cursor: pointer; transition: all 0.2s; font-family: inherit; margin-top: 1rem; }
.code-toggle-btn:hover { color: var(--color-text-primary); border-color: var(--color-primary); }

.demo-container code {
  padding: 0.2rem 0.4rem;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  font-family: var(--typography-font-family-monospace);
  font-size: 0.875rem;
  color: var(--color-primary);
}

.utility-demo-grid {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.utility-demo-item {
  background: var(--color-primary);
  color: white;
  border-radius: var(--border-radius-sm);
  font-weight: var(--typography-font-weight-medium);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60px;
  text-align: center;
}

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

@media (max-width: 768px) {
  .docs-title { font-size: 2rem; }
  .docs-section-title { font-size: 1.5rem; }
  .demo-container { padding: 1.5rem; }
}
</style>
