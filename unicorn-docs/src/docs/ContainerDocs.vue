<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '../components/CodeBlock.vue'

const showBasicCode = ref(false)
const showFluidCode = ref(false)
const showBreakpointsCode = ref(false)
</script>

<template>
  <div class="component-docs">
    <header class="docs-header">
      <h1 class="docs-title">Container</h1>
      <p class="docs-description">
        Responsive container component that centers content with adaptive max-widths and consistent padding.
        Essential for creating well-structured, responsive page layouts.
      </p>
    </header>

    <section class="docs-section">
      <h2 class="docs-section-title">Standard Container</h2>
      <p class="docs-section-text">
        The standard container has responsive max-widths that adapt to different screen sizes,
        ensuring optimal line lengths and content readability.
      </p>

      <div class="demo-container">
        <div style="background: var(--color-background-contrast); padding: 1rem; margin-bottom: 1rem; border-radius: var(--border-radius-md);">
          <div class="container" style="background: var(--color-primary-light); padding: 2rem; border-radius: var(--border-radius-md);">
            <div style="text-align: center; color: white;">
              <strong style="font-size: 1.25rem;">.container</strong>
              <p style="font-size: 0.9rem; margin-top: 0.75rem; opacity: 0.95;">
                This container has responsive max-widths that change at breakpoints.
              </p>
              <p style="font-size: 0.85rem; margin-top: 0.5rem; opacity: 0.9;">
                Resize your browser window to see the container adapt to different screen sizes.
              </p>
            </div>
          </div>
        </div>

        <button class="code-toggle-btn" @click="showBasicCode = !showBasicCode">
          {{ showBasicCode ? 'Hide' : 'Show' }} Code
        </button>

        <CodeBlock v-if="showBasicCode" language="html">&lt;div class="container"&gt;
  &lt;!-- Your content here --&gt;
  &lt;h1&gt;Page Title&lt;/h1&gt;
  &lt;p&gt;Content is automatically centered with responsive max-width.&lt;/p&gt;
&lt;/div&gt;</CodeBlock>
      </div>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Fluid Container</h2>
      <p class="docs-section-text">
        The fluid container spans the full width at all breakpoints while maintaining consistent padding.
      </p>

      <div class="demo-container">
        <div style="background: var(--color-background-contrast); padding: 1rem; margin-bottom: 1rem; border-radius: var(--border-radius-md);">
          <div class="container fluid" style="background: var(--color-secondary-light); padding: 2rem; border-radius: var(--border-radius-md);">
            <div style="text-align: center; color: white;">
              <strong style="font-size: 1.25rem;">.container.fluid</strong>
              <p style="font-size: 0.9rem; margin-top: 0.75rem; opacity: 0.95;">
                This container is always 100% width at all breakpoints.
              </p>
              <p style="font-size: 0.85rem; margin-top: 0.5rem; opacity: 0.9;">
                Perfect for full-width hero sections or backgrounds.
              </p>
            </div>
          </div>
        </div>

        <button class="code-toggle-btn" @click="showFluidCode = !showFluidCode">
          {{ showFluidCode ? 'Hide' : 'Show' }} Code
        </button>

        <CodeBlock v-if="showFluidCode" language="html">&lt;div class="container fluid"&gt;
  &lt;!-- Full-width content --&gt;
  &lt;div class="hero-section"&gt;
    &lt;h1&gt;Full Width Hero&lt;/h1&gt;
  &lt;/div&gt;
&lt;/div&gt;</CodeBlock>
      </div>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Container with Utilities</h2>
      <p class="docs-section-text">
        Containers can be combined with height utilities for specific layout needs.
      </p>

      <div class="demo-container">
        <div style="background: var(--color-background-contrast); padding: 1rem; margin-bottom: 1rem; border-radius: var(--border-radius-md);">
          <div class="container" style="background: var(--color-info-light); border-radius: var(--border-radius-md); display: flex; align-items: center; justify-content: center; min-height: 200px;">
            <div style="text-align: center; color: white;">
              <strong style="font-size: 1.25rem;">.container + height utilities</strong>
              <p style="font-size: 0.9rem; margin-top: 0.75rem; opacity: 0.95;">
                Combine with classes like <code style="background: rgba(255,255,255,0.2); padding: 0.2rem 0.4rem; border-radius: 3px;">h-screen</code>,
                <code style="background: rgba(255,255,255,0.2); padding: 0.2rem 0.4rem; border-radius: 3px;">min-h-screen</code>,
                <code style="background: rgba(255,255,255,0.2); padding: 0.2rem 0.4rem; border-radius: 3px;">h-full</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Responsive Breakpoints</h2>
      <p class="docs-section-text">
        The container adapts its max-width at different screen sizes for optimal content display.
      </p>

      <div class="demo-container">
        <div class="props-table">
          <table>
            <thead>
              <tr>
                <th>Breakpoint</th>
                <th>Screen Width</th>
                <th>Container Max-Width</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>xs</code></td>
                <td>&lt; 576px</td>
                <td>100%</td>
                <td>Extra Small (Mobile)</td>
              </tr>
              <tr>
                <td><code>sm</code></td>
                <td>≥ 576px</td>
                <td>100%</td>
                <td>Small (Mobile Landscape)</td>
              </tr>
              <tr>
                <td><code>md</code></td>
                <td>≥ 768px</td>
                <td>900px</td>
                <td>Medium (Tablet)</td>
              </tr>
              <tr>
                <td><code>lg</code></td>
                <td>≥ 992px</td>
                <td>1185px</td>
                <td>Large (Desktop)</td>
              </tr>
              <tr>
                <td><code>xl</code></td>
                <td>≥ 1200px</td>
                <td>1785px</td>
                <td>Extra Large (Wide Desktop)</td>
              </tr>
              <tr>
                <td><code>xxl</code></td>
                <td>≥ 1400px</td>
                <td>1785px</td>
                <td>Ultra Wide</td>
              </tr>
            </tbody>
          </table>
        </div>

        <button class="code-toggle-btn" @click="showBreakpointsCode = !showBreakpointsCode">
          {{ showBreakpointsCode ? 'Hide' : 'Show' }} Code
        </button>

        <CodeBlock v-if="showBreakpointsCode" language="css">/* Container automatically applies these max-widths */
.container {
  width: 100%;
  padding: 1rem;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
}

/* At md breakpoint (≥768px) */
@media (min-width: 768px) {
  .container { max-width: 900px; }
}

/* At lg breakpoint (≥992px) */
@media (min-width: 992px) {
  .container { max-width: 1185px; }
}

/* At xl+ breakpoints (≥1200px) */
@media (min-width: 1200px) {
  .container { max-width: 1785px; }
}</CodeBlock>
      </div>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Features</h2>
      <ul class="accessibility-list">
        <li>Automatically centers content horizontally</li>
        <li>Responsive max-widths for optimal reading experience</li>
        <li>Consistent 1rem padding on all sides</li>
        <li>Uses <code>box-sizing: border-box</code> for predictable sizing</li>
        <li>Fluid variant available for full-width layouts</li>
        <li>Can be combined with height utilities</li>
        <li>Mobile-first approach with progressive enhancement</li>
      </ul>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Common Use Cases</h2>

      <div class="use-case">
        <h3 style="font-size: 1.25rem; margin-bottom: 0.75rem; color: var(--color-text-primary);">
          Page Layouts
        </h3>
        <CodeBlock language="html">&lt;div class="container"&gt;
  &lt;header&gt;
    &lt;h1&gt;My Website&lt;/h1&gt;
    &lt;nav&gt;...&lt;/nav&gt;
  &lt;/header&gt;

  &lt;main&gt;
    &lt;article&gt;...&lt;/article&gt;
  &lt;/main&gt;

  &lt;footer&gt;...&lt;/footer&gt;
&lt;/div&gt;</CodeBlock>
      </div>

      <div class="use-case" style="margin-top: 2rem;">
        <h3 style="font-size: 1.25rem; margin-bottom: 0.75rem; color: var(--color-text-primary);">
          Full-Width Hero with Centered Content
        </h3>
        <CodeBlock language="html">&lt;!-- Full-width background --&gt;
&lt;div class="container fluid" style="background: gradient..."&gt;
  &lt;!-- Centered content inside --&gt;
  &lt;div class="container"&gt;
    &lt;h1&gt;Hero Title&lt;/h1&gt;
    &lt;p&gt;Centered content with full-width background&lt;/p&gt;
  &lt;/div&gt;
&lt;/div&gt;</CodeBlock>
      </div>

      <div class="use-case" style="margin-top: 2rem;">
        <h3 style="font-size: 1.25rem; margin-bottom: 0.75rem; color: var(--color-text-primary);">
          Full-Height Section
        </h3>
        <CodeBlock language="html">&lt;div class="container h-screen" style="display: flex; align-items: center;"&gt;
  &lt;div&gt;
    &lt;h1&gt;Vertically Centered Content&lt;/h1&gt;
    &lt;p&gt;Full viewport height with centered content&lt;/p&gt;
  &lt;/div&gt;
&lt;/div&gt;</CodeBlock>
      </div>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Usage in Vue</h2>
      <CodeBlock language="vue">&lt;script setup lang="ts"&gt;
// No imports needed - container is a CSS utility class
&lt;/script&gt;

&lt;template&gt;
  &lt;div class="container"&gt;
    &lt;header&gt;
      &lt;h1&gt;My App&lt;/h1&gt;
    &lt;/header&gt;

    &lt;main&gt;
      &lt;!-- Your page content --&gt;
      &lt;section v-for="section in sections" :key="section.id"&gt;
        &lt;h2&gt;&#123;&#123; section.title &#125;&#125;&lt;/h2&gt;
        &lt;p&gt;&#123;&#123; section.content &#125;&#125;&lt;/p&gt;
      &lt;/section&gt;
    &lt;/main&gt;

    &lt;footer&gt;
      &lt;p&gt;&copy; 2024 My Company&lt;/p&gt;
    &lt;/footer&gt;
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

.use-case {
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .docs-title { font-size: 2rem; }
  .docs-section-title { font-size: 1.5rem; }
  .demo-container { padding: 1.5rem; }
}
</style>
