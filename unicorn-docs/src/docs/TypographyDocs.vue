<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '../components/CodeBlock.vue'

const showHeadingsCode = ref(false)
const showTextCode = ref(false)
const showTokensCode = ref(false)
</script>

<template>
  <div class="component-docs">
    <header class="docs-header">
      <h1 class="docs-title">Typography</h1>
      <p class="docs-description">
        A complete typography system with predefined text styles, font tokens, and utility classes.
        Designed for readability and visual hierarchy.
      </p>
    </header>

    <section class="docs-section">
      <h2 class="docs-section-title">Heading Styles</h2>
      <p class="docs-section-text">
        Semantic heading classes for consistent visual hierarchy across your application.
      </p>

      <div class="demo-container">
        <div class="typography-examples">
          <div class="typography-example">
            <h1 class="text-display-heading">Display Heading</h1>
            <code>.text-display-heading</code>
          </div>

          <div class="typography-example">
            <h1 class="text-page-heading">Page Heading</h1>
            <code>.text-page-heading</code>
          </div>

          <div class="typography-example">
            <h2 class="text-section-heading">Section Heading</h2>
            <code>.text-section-heading</code>
          </div>

          <div class="typography-example">
            <h3 class="text-subsection-heading">Subsection Heading</h3>
            <code>.text-subsection-heading</code>
          </div>

          <div class="typography-example">
            <h4 class="text-base-headline">Base Headline</h4>
            <code>.text-base-headline</code>
          </div>
        </div>

        <button class="code-toggle-btn" @click="showHeadingsCode = !showHeadingsCode">
          {{ showHeadingsCode ? 'Hide' : 'Show' }} Code
        </button>

        <CodeBlock v-if="showHeadingsCode" language="html">&lt;h1 class="text-display-heading"&gt;Display Heading&lt;/h1&gt;
&lt;h1 class="text-page-heading"&gt;Page Heading&lt;/h1&gt;
&lt;h2 class="text-section-heading"&gt;Section Heading&lt;/h2&gt;
&lt;h3 class="text-subsection-heading"&gt;Subsection Heading&lt;/h3&gt;
&lt;h4 class="text-base-headline"&gt;Base Headline&lt;/h4&gt;</CodeBlock>
      </div>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Text Styles</h2>
      <p class="docs-section-text">
        Body text classes for different content types and emphasis levels.
      </p>

      <div class="demo-container">
        <div class="typography-examples">
          <div class="typography-example">
            <p class="text-lead-paragraph">
              Lead paragraph with larger text for introductions and important content. This style draws attention and improves readability.
            </p>
            <code>.text-lead-paragraph</code>
          </div>

          <div class="typography-example">
            <p class="text-paragraph">
              Regular paragraph text for body content. This is the default text style for most content in your application. It provides optimal readability at standard sizes.
            </p>
            <code>.text-paragraph</code>
          </div>

          <div class="typography-example">
            <p class="text-small-text">
              Small text for captions, labels, and secondary information. Use sparingly to maintain readability.
            </p>
            <code>.text-small-text</code>
          </div>

          <div class="typography-example">
            <p class="text-caption">
              Caption text for images, footnotes, and metadata. Smallest text size in the system.
            </p>
            <code>.text-caption</code>
          </div>
        </div>

        <button class="code-toggle-btn" @click="showTextCode = !showTextCode">
          {{ showTextCode ? 'Hide' : 'Show' }} Code
        </button>

        <CodeBlock v-if="showTextCode" language="html">&lt;p class="text-lead-paragraph"&gt;Lead paragraph text&lt;/p&gt;
&lt;p class="text-paragraph"&gt;Regular body text&lt;/p&gt;
&lt;p class="text-small-text"&gt;Small text for labels&lt;/p&gt;
&lt;p class="text-caption"&gt;Caption text&lt;/p&gt;</CodeBlock>
      </div>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Font Weights</h2>
      <p class="docs-section-text">
        Available font weight utilities for emphasis and hierarchy.
      </p>

      <div class="demo-container">
        <div class="typography-examples">
          <div class="typography-example">
            <p style="font-weight: var(--typography-font-weight-regular);">Regular weight text (400)</p>
            <code>--typography-font-weight-regular</code>
          </div>

          <div class="typography-example">
            <p style="font-weight: var(--typography-font-weight-medium);">Medium weight text (500)</p>
            <code>--typography-font-weight-medium</code>
          </div>

          <div class="typography-example">
            <p style="font-weight: var(--typography-font-weight-semibold);">Semibold weight text (600)</p>
            <code>--typography-font-weight-semibold</code>
          </div>

          <div class="typography-example">
            <p style="font-weight: var(--typography-font-weight-bold);">Bold weight text (700)</p>
            <code>--typography-font-weight-bold</code>
          </div>
        </div>
      </div>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Typography Tokens</h2>
      <p class="docs-section-text">
        CSS custom properties for building custom typography styles.
      </p>

      <div class="props-table">
        <table>
          <thead>
            <tr>
              <th>Token</th>
              <th>Value</th>
              <th>Usage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>--typography-font-family-primary</code></td>
              <td>System font stack</td>
              <td>Body text and UI</td>
            </tr>
            <tr>
              <td><code>--typography-font-family-monospace</code></td>
              <td>Monospace font stack</td>
              <td>Code blocks, technical content</td>
            </tr>
            <tr>
              <td><code>--typography-display-heading-font-size</code></td>
              <td>3.5rem (56px)</td>
              <td>Largest heading</td>
            </tr>
            <tr>
              <td><code>--typography-page-heading-font-size</code></td>
              <td>3rem (48px)</td>
              <td>Page titles</td>
            </tr>
            <tr>
              <td><code>--typography-section-heading-font-size</code></td>
              <td>2rem (32px)</td>
              <td>Major sections</td>
            </tr>
            <tr>
              <td><code>--typography-subsection-heading-font-size</code></td>
              <td>1.5rem (24px)</td>
              <td>Subsections</td>
            </tr>
            <tr>
              <td><code>--typography-base-headline-font-size</code></td>
              <td>1.25rem (20px)</td>
              <td>Small headings</td>
            </tr>
            <tr>
              <td><code>--typography-lead-paragraph-font-size</code></td>
              <td>1.25rem (20px)</td>
              <td>Lead paragraphs</td>
            </tr>
            <tr>
              <td><code>--typography-paragraph-font-size</code></td>
              <td>1rem (16px)</td>
              <td>Body text</td>
            </tr>
            <tr>
              <td><code>--typography-small-text-font-size</code></td>
              <td>0.875rem (14px)</td>
              <td>Small text</td>
            </tr>
            <tr>
              <td><code>--typography-caption-font-size</code></td>
              <td>0.75rem (12px)</td>
              <td>Captions</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button class="code-toggle-btn" @click="showTokensCode = !showTokensCode">
        {{ showTokensCode ? 'Hide' : 'Show' }} Code
      </button>

      <CodeBlock v-if="showTokensCode" language="css">/* Using typography tokens */
.custom-heading {
  font-family: var(--typography-font-family-primary);
  font-size: var(--typography-section-heading-font-size);
  font-weight: var(--typography-font-weight-semibold);
  line-height: var(--typography-section-heading-line-height);
}

.code-snippet {
  font-family: var(--typography-font-family-monospace);
  font-size: var(--typography-small-text-font-size);
}</CodeBlock>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Best Practices</h2>
      <ul class="accessibility-list">
        <li>Use semantic HTML heading levels (h1-h6) with typography classes</li>
        <li>Maintain proper heading hierarchy - don't skip levels</li>
        <li>Lead paragraph should be used for article introductions</li>
        <li>Regular paragraph for most body content</li>
        <li>Small text for supporting information only</li>
        <li>Ensure sufficient contrast between text and background (WCAG AA: 4.5:1)</li>
        <li>Line length should be 45-75 characters for optimal readability</li>
        <li>Use font weights to create visual hierarchy, not just size</li>
      </ul>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Usage Example</h2>
      <CodeBlock language="html">&lt;article&gt;
  &lt;h1 class="text-page-heading"&gt;Article Title&lt;/h1&gt;

  &lt;p class="text-lead-paragraph"&gt;
    This is the introduction paragraph that draws readers in.
  &lt;/p&gt;

  &lt;h2 class="text-section-heading"&gt;Section Title&lt;/h2&gt;

  &lt;p class="text-paragraph"&gt;
    Regular body text for the main content. Multiple paragraphs
    should use this style for consistency.
  &lt;/p&gt;

  &lt;p class="text-small-text"&gt;
    Additional notes or metadata can use small text.
  &lt;/p&gt;
&lt;/article&gt;</CodeBlock>
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

.typography-examples {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.typography-example {
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.typography-example:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.typography-example code {
  display: inline-block;
  margin-top: 0.5rem;
  padding: 0.25rem 0.5rem;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  font-family: var(--typography-font-family-monospace);
  font-size: 0.875rem;
  color: var(--color-primary);
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
