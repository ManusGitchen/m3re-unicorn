<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '../components/CodeBlock.vue'

const showBrandCode = ref(false)
const showSemanticCode = ref(false)
const showThemeCode = ref(false)
</script>

<template>
  <div class="component-docs">
    <header class="docs-header">
      <h1 class="docs-title">Color System</h1>
      <p class="docs-description">
        A comprehensive color palette with brand colors, semantic colors, and full theme support.
        All colors are CSS custom properties that adapt to light and dark themes.
      </p>
    </header>

    <section class="docs-section">
      <h2 class="docs-section-title">Brand Colors</h2>
      <p class="docs-section-text">
        Primary and secondary brand colors with light and dark variants for flexibility.
      </p>

      <div class="demo-container">
        <h3 style="margin-bottom: 1rem; font-size: 1.1rem; font-weight: 600;">Primary</h3>
        <div class="color-grid">
          <div class="color-card">
            <div class="color-swatch" style="background: var(--color-primary-light); color: white;">
              <span class="color-name">Primary Light</span>
            </div>
            <div class="color-info">
              <code>--color-primary-light</code>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch" style="background: var(--color-primary); color: white;">
              <span class="color-name">Primary</span>
            </div>
            <div class="color-info">
              <code>--color-primary</code>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch" style="background: var(--color-primary-dark); color: white;">
              <span class="color-name">Primary Dark</span>
            </div>
            <div class="color-info">
              <code>--color-primary-dark</code>
            </div>
          </div>
        </div>

        <h3 style="margin: 2rem 0 1rem; font-size: 1.1rem; font-weight: 600;">Secondary</h3>
        <div class="color-grid">
          <div class="color-card">
            <div class="color-swatch" style="background: var(--color-secondary-light); color: white;">
              <span class="color-name">Secondary Light</span>
            </div>
            <div class="color-info">
              <code>--color-secondary-light</code>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch" style="background: var(--color-secondary); color: white;">
              <span class="color-name">Secondary</span>
            </div>
            <div class="color-info">
              <code>--color-secondary</code>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch" style="background: var(--color-secondary-dark); color: white;">
              <span class="color-name">Secondary Dark</span>
            </div>
            <div class="color-info">
              <code>--color-secondary-dark</code>
            </div>
          </div>
        </div>

        <button class="code-toggle-btn" @click="showBrandCode = !showBrandCode">
          {{ showBrandCode ? 'Hide' : 'Show' }} Code
        </button>

        <CodeBlock v-if="showBrandCode" language="css">/* Use brand colors in your CSS */
.my-element {
  background: var(--color-primary);
  color: white;
}

.my-button:hover {
  background: var(--color-primary-dark);
}</CodeBlock>
      </div>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Semantic Colors</h2>
      <p class="docs-section-text">
        Semantic colors communicate meaning and status. Each has light, base, and dark variants.
      </p>

      <div class="demo-container">
        <div class="color-grid">
          <div class="color-card">
            <div class="color-swatch" style="background: var(--color-success); color: white;">
              <span class="color-name">Success</span>
            </div>
            <div class="color-info">
              <code>--color-success</code>
              <p>Positive actions, confirmations</p>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch" style="background: var(--color-error); color: white;">
              <span class="color-name">Error</span>
            </div>
            <div class="color-info">
              <code>--color-error</code>
              <p>Errors, destructive actions</p>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch" style="background: var(--color-warning); color: white;">
              <span class="color-name">Warning</span>
            </div>
            <div class="color-info">
              <code>--color-warning</code>
              <p>Warnings, cautions</p>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch" style="background: var(--color-info); color: white;">
              <span class="color-name">Info</span>
            </div>
            <div class="color-info">
              <code>--color-info</code>
              <p>Information, neutral messages</p>
            </div>
          </div>
        </div>

        <button class="code-toggle-btn" @click="showSemanticCode = !showSemanticCode">
          {{ showSemanticCode ? 'Hide' : 'Show' }} Code
        </button>

        <CodeBlock v-if="showSemanticCode" language="css">/* Semantic color usage */
.alert-success {
  background: var(--color-success-light);
  border: 1px solid var(--color-success);
  color: var(--color-success-dark);
}

.alert-error {
  background: var(--color-error-light);
  border: 1px solid var(--color-error);
  color: var(--color-error-dark);
}</CodeBlock>
      </div>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Theme Colors</h2>
      <p class="docs-section-text">
        System colors that automatically adapt to light and dark themes.
      </p>

      <div class="demo-container">
        <div class="color-grid">
          <div class="color-card">
            <div class="color-swatch" style="background: var(--color-background); color: var(--color-text); border: 1px solid var(--color-border);">
              <span class="color-name">Background</span>
            </div>
            <div class="color-info">
              <code>--color-background</code>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch" style="background: var(--color-background-contrast); color: var(--color-text); border: 1px solid var(--color-border);">
              <span class="color-name">Background Contrast</span>
            </div>
            <div class="color-info">
              <code>--color-background-contrast</code>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch" style="background: var(--color-background); color: var(--color-text); border: 1px solid var(--color-border);">
              <span class="color-name">Text</span>
            </div>
            <div class="color-info">
              <code>--color-text</code>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch" style="background: var(--color-background); color: var(--color-text-muted); border: 1px solid var(--color-border);">
              <span class="color-name">Text Muted</span>
            </div>
            <div class="color-info">
              <code>--color-text-muted</code>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch" style="background: var(--color-background); border: 2px solid var(--color-border);">
              <span class="color-name" style="color: var(--color-text);">Border</span>
            </div>
            <div class="color-info">
              <code>--color-border</code>
            </div>
          </div>
        </div>

        <button class="code-toggle-btn" @click="showThemeCode = !showThemeCode">
          {{ showThemeCode ? 'Hide' : 'Show' }} Code
        </button>

        <CodeBlock v-if="showThemeCode" language="css">/* Theme-aware colors */
.card {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  color: var(--color-text);
}

.sidebar {
  background: var(--color-background-contrast);
}</CodeBlock>
      </div>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Color Variables Reference</h2>
      <div class="props-table">
        <table>
          <thead>
            <tr>
              <th>Variable</th>
              <th>Usage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>--color-primary</code></td>
              <td>Primary brand color and main CTAs</td>
            </tr>
            <tr>
              <td><code>--color-secondary</code></td>
              <td>Secondary brand color and accents</td>
            </tr>
            <tr>
              <td><code>--color-success</code></td>
              <td>Success states and positive feedback</td>
            </tr>
            <tr>
              <td><code>--color-error</code></td>
              <td>Error states and destructive actions</td>
            </tr>
            <tr>
              <td><code>--color-warning</code></td>
              <td>Warning states and cautions</td>
            </tr>
            <tr>
              <td><code>--color-info</code></td>
              <td>Informational messages</td>
            </tr>
            <tr>
              <td><code>--color-background</code></td>
              <td>Main background color (theme-aware)</td>
            </tr>
            <tr>
              <td><code>--color-background-contrast</code></td>
              <td>Contrasting background for cards/sidebars</td>
            </tr>
            <tr>
              <td><code>--color-text</code></td>
              <td>Primary text color (theme-aware)</td>
            </tr>
            <tr>
              <td><code>--color-text-muted</code></td>
              <td>Secondary/muted text</td>
            </tr>
            <tr>
              <td><code>--color-border</code></td>
              <td>Border and divider color</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Theme Support</h2>
      <p class="docs-section-text">
        Toggle between light and dark themes by setting the <code>data-theme</code> attribute on the root element.
      </p>

      <CodeBlock language="javascript">// Toggle theme
const currentTheme = document.documentElement.getAttribute('data-theme')
const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
document.documentElement.setAttribute('data-theme', newTheme)</CodeBlock>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Accessibility</h2>
      <ul class="accessibility-list">
        <li>All color combinations meet WCAG 2.1 AA contrast requirements (4.5:1 for text)</li>
        <li>Never use color alone to convey information - include text or icons</li>
        <li>Theme colors automatically adjust for light and dark modes</li>
        <li>Semantic colors have distinct meanings that persist across themes</li>
        <li>Test all UI elements in both light and dark themes</li>
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

.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.color-card {
  display: flex;
  flex-direction: column;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  border: 1px solid var(--color-border);
}

.color-swatch {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--typography-font-weight-semibold);
  font-size: 1rem;
}

.color-info {
  padding: 1rem;
  background: var(--color-background);
}

.color-info code {
  display: block;
  padding: 0.5rem;
  background: var(--color-background-contrast);
  border-radius: var(--border-radius-sm);
  font-family: var(--typography-font-family-monospace);
  font-size: 0.85rem;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.color-info p {
  margin: 0;
  font-size: 0.875rem;
  color: var(--color-text-muted);
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
.accessibility-list code { padding: 0.2rem 0.4rem; background: var(--color-background-contrast); border: 1px solid var(--color-border); border-radius: var(--border-radius-sm); font-family: var(--typography-font-family-monospace); font-size: 0.9em; color: var(--color-primary); }

@media (max-width: 768px) {
  .docs-title { font-size: 2rem; }
  .docs-section-title { font-size: 1.5rem; }
  .demo-container { padding: 1.5rem; }
  .color-grid { grid-template-columns: 1fr; }
}
</style>
