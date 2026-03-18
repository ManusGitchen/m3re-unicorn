<script setup lang="ts">
</script>

<template>
  <div class="home-page">
    <div class="hero">
      <h1 class="hero-title">🦄 Unicorn UI</h1>
      <p class="hero-subtitle">
        A modern Vue 3 component library with design tokens and theme support
      </p>
      <div class="hero-actions">
        <button class="btn btn-primary btn-color-primary btn-lg">
          Get Started
        </button>
        <a
          href="https://github.com/m3re/unicorn-lib"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-secondary btn-color-primary btn-lg"
        >
          View on GitHub
        </a>
      </div>
    </div>

    <div class="features">
      <div class="feature-card">
        <div class="feature-icon">⚡</div>
        <h3 class="feature-title">Lightning Fast</h3>
        <p class="feature-description">
          Built with Vue 3 and Vite for optimal performance
        </p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">🎨</div>
        <h3 class="feature-title">Design Tokens</h3>
        <p class="feature-description">
          Consistent design system with customizable tokens
        </p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">🌓</div>
        <h3 class="feature-title">Theme Support</h3>
        <p class="feature-description">
          Built-in light and dark mode with seamless switching
        </p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">♿</div>
        <h3 class="feature-title">Accessible</h3>
        <p class="feature-description">
          WCAG 2.1 AA compliant components with keyboard navigation
        </p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">📱</div>
        <h3 class="feature-title">Responsive</h3>
        <p class="feature-description">
          Mobile-first design that works on all screen sizes
        </p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">🔧</div>
        <h3 class="feature-title">TypeScript</h3>
        <p class="feature-description">
          Fully typed components with excellent IDE support
        </p>
      </div>
    </div>

    <div class="cta-section">
      <h2 class="cta-title">Ready to get started?</h2>
      <p class="cta-description">
        Install Unicorn UI in your Vue 3 project and start building beautiful interfaces
      </p>
      <div class="code-block">
        <code>npm install unicorn-lib</code>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  max-width: 1000px;
  margin: 0 auto;
}

.hero {
  text-align: center;
  padding: 4rem 0;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: var(--typography-font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 1rem 0;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--color-text-muted);
  margin: 0 0 2rem 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
}

.feature-card {
  padding: 2rem;
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-border);
  background: var(--color-background-contrast);
  transition: all 0.3s;
}

.feature-card:hover {
  border-color: var(--color-primary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: var(--typography-font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 0.5rem 0;
}

.feature-description {
  color: var(--color-text-muted);
  margin: 0;
  line-height: 1.6;
}

.cta-section {
  text-align: center;
  padding: 4rem 0;
  margin-top: 4rem;
  border-top: 1px solid var(--color-border);
}

.cta-title {
  font-size: 2rem;
  font-weight: var(--typography-font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 1rem 0;
}

.cta-description {
  font-size: 1.1rem;
  color: var(--color-text-muted);
  margin: 0 0 2rem 0;
}

.code-block {
  display: inline-block;
  padding: 1rem 2rem;
  background: var(--color-background-contrast);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  font-family: var(--typography-font-family-monospace);
  font-size: 1rem;
  color: var(--color-primary);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .features {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .feature-card {
    padding: 1.5rem;
  }
}
</style>
