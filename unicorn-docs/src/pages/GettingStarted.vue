<script setup lang="ts">
</script>

<template>
  <div class="getting-started">
    <h1 class="page-title">Getting Started</h1>

    <section class="section">
      <h2 class="section-title">Installation</h2>
      <p class="section-text">
        Install Unicorn UI via npm:
      </p>
      <div class="code-block">
        <code>npm install unicorn-lib</code>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">Usage</h2>
      <p class="section-text">
        Import components and styles in your Vue application:
      </p>
      <div class="code-block">
        <pre><code>// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import 'unicorn-lib/style.css'

createApp(App).mount('#app')</code></pre>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">Component Usage</h2>
      <p class="section-text">
        Import and use components in your Vue files:
      </p>
      <div class="code-block">
        <pre><code>&lt;script setup lang="ts"&gt;
import { Button } from 'unicorn-lib'
&lt;/script&gt;

&lt;template&gt;
  &lt;Button variant="primary" color="primary" size="md"&gt;
    Click me
  &lt;/Button&gt;
&lt;/template&gt;</code></pre>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">Theme System</h2>
      <p class="section-text">
        Unicorn UI supports light and dark themes out of the box. Toggle themes by setting the <code>data-theme</code> attribute:
      </p>
      <div class="code-block">
        <pre><code>// Toggle theme
document.documentElement.setAttribute('data-theme', 'dark')
document.documentElement.setAttribute('data-theme', 'light')</code></pre>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">TypeScript Support</h2>
      <p class="section-text">
        All components are fully typed. Import types for props:
      </p>
      <div class="code-block">
        <pre><code>import { Button, type ButtonProps } from 'unicorn-lib'

const props: ButtonProps = {
  variant: 'primary',
  color: 'primary',
  size: 'md'
}</code></pre>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">Next Steps</h2>
      <p class="section-text">
        Explore the component documentation to learn more about each component's props, events, and usage examples.
      </p>
      <ul class="next-steps-list">
        <li>Browse the component library in the sidebar</li>
        <li>Check out the design system tokens</li>
        <li>Learn about accessibility features</li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.getting-started {
  max-width: 800px;
}

.page-title {
  font-size: 2.5rem;
  font-weight: var(--typography-font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 2rem 0;
}

.section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.75rem;
  font-weight: var(--typography-font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 1rem 0;
}

.section-text {
  color: var(--color-text);
  line-height: 1.6;
  margin: 0 0 1rem 0;
}

.section-text code {
  padding: 0.2rem 0.4rem;
  background: var(--color-background-contrast);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  font-family: var(--typography-font-family-monospace);
  font-size: 0.9em;
  color: var(--color-primary);
}

.code-block {
  background: var(--color-background-contrast);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  padding: 1.25rem;
  overflow-x: auto;
  margin: 1rem 0;
}

.code-block code,
.code-block pre {
  font-family: var(--typography-font-family-monospace);
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--color-text-primary);
  margin: 0;
}

.code-block pre {
  white-space: pre;
  overflow-x: auto;
}

.next-steps-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0 0;
}

.next-steps-list li {
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text);
}

.next-steps-list li:last-child {
  border-bottom: none;
}

.next-steps-list li::before {
  content: "→";
  color: var(--color-primary);
  font-weight: bold;
  margin-right: 0.5rem;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.5rem;
  }
}
</style>
