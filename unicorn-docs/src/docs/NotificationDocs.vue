<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '../components/CodeBlock.vue'

const showTypesCode = ref(false)
const showVariantsCode = ref(false)
</script>

<template>
  <div class="component-docs">
    <header class="docs-header">
      <h1 class="docs-title">Notification</h1>
      <p class="docs-description">
        Alert and feedback components for displaying messages to users.
        Available in three types: snackbar, banner, and in-context notifications.
      </p>
    </header>

    <section class="docs-section">
      <h2 class="docs-section-title">Notification Types</h2>
      <p class="docs-section-text">
        Three distinct notification types for different use cases and positioning.
      </p>

      <div class="demo-container">
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div>
            <h3 style="margin-bottom: 0.75rem; font-size: 1rem; font-weight: 500;">Snackbar</h3>
            <p style="margin-bottom: 0.75rem; color: var(--color-text-muted); font-size: 0.9rem;">
              Max-width 560px, 2-line truncation. Ideal for temporary notifications at screen edge.
            </p>
            <div class="notification notification-snackbar notification-info" role="alert" aria-live="polite">
              <div class="notification-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
                </svg>
              </div>
              <div class="notification-content">
                <span class="notification-message">This is a snackbar notification with default info styling.</span>
              </div>
              <button type="button" class="notification-dismiss" aria-label="Dismiss notification">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                </svg>
              </button>
            </div>
          </div>

          <div>
            <h3 style="margin-bottom: 0.75rem; font-size: 1rem; font-weight: 500;">Banner</h3>
            <p style="margin-bottom: 0.75rem; color: var(--color-text-muted); font-size: 0.9rem;">
              Full-width, 2-line truncation. Best for system-wide messages or announcements.
            </p>
            <div class="notification notification-banner notification-warning" role="alert" aria-live="polite">
              <div class="notification-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z"/>
                </svg>
              </div>
              <div class="notification-content">
                <span class="notification-message">This is a banner notification that spans the full width.</span>
              </div>
              <button type="button" class="notification-dismiss" aria-label="Dismiss notification">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                </svg>
              </button>
            </div>
          </div>

          <div>
            <h3 style="margin-bottom: 0.75rem; font-size: 1rem; font-weight: 500;">In-Context</h3>
            <p style="margin-bottom: 0.75rem; color: var(--color-text-muted); font-size: 0.9rem;">
              Inline, no truncation. Perfect for form validation and contextual feedback.
            </p>
            <div class="notification notification-in-context notification-success" role="alert" aria-live="polite">
              <div class="notification-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"/>
                </svg>
              </div>
              <div class="notification-content">
                <span class="notification-message">This is an in-context notification that appears inline with content.</span>
              </div>
              <button type="button" class="notification-dismiss" aria-label="Dismiss notification">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <button class="code-toggle-btn" @click="showTypesCode = !showTypesCode">
          {{ showTypesCode ? 'Hide' : 'Show' }} Code
        </button>

        <CodeBlock v-if="showTypesCode" language="html">&lt;!-- Snackbar --&gt;
&lt;div class="notification notification-snackbar notification-info" role="alert"&gt;
  &lt;div class="notification-icon"&gt;...&lt;/div&gt;
  &lt;div class="notification-content"&gt;
    &lt;span class="notification-message"&gt;Snackbar message&lt;/span&gt;
  &lt;/div&gt;
  &lt;button class="notification-dismiss"&gt;×&lt;/button&gt;
&lt;/div&gt;

&lt;!-- Banner --&gt;
&lt;div class="notification notification-banner notification-warning" role="alert"&gt;
  &lt;div class="notification-icon"&gt;...&lt;/div&gt;
  &lt;div class="notification-content"&gt;
    &lt;span class="notification-message"&gt;Banner message&lt;/span&gt;
  &lt;/div&gt;
  &lt;button class="notification-dismiss"&gt;×&lt;/button&gt;
&lt;/div&gt;

&lt;!-- In-Context --&gt;
&lt;div class="notification notification-in-context notification-success" role="alert"&gt;
  &lt;div class="notification-icon"&gt;...&lt;/div&gt;
  &lt;div class="notification-content"&gt;
    &lt;span class="notification-message"&gt;Contextual message&lt;/span&gt;
  &lt;/div&gt;
  &lt;button class="notification-dismiss"&gt;×&lt;/button&gt;
&lt;/div&gt;</CodeBlock>
      </div>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Semantic Variants</h2>
      <p class="docs-section-text">
        Use semantic colors to communicate the type of message: success, info, warning, or error.
      </p>

      <div class="demo-container">
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div class="notification notification-snackbar notification-success" role="alert" aria-live="polite">
            <div class="notification-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"/>
              </svg>
            </div>
            <div class="notification-content">
              <span class="notification-message">Success! Your changes have been saved successfully.</span>
            </div>
            <button type="button" class="notification-dismiss" aria-label="Dismiss notification">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
              </svg>
            </button>
          </div>

          <div class="notification notification-snackbar notification-info" role="alert" aria-live="polite">
            <div class="notification-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
              </svg>
            </div>
            <div class="notification-content">
              <span class="notification-message">Info: A new version is available.</span>
            </div>
            <button type="button" class="notification-dismiss" aria-label="Dismiss notification">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
              </svg>
            </button>
          </div>

          <div class="notification notification-snackbar notification-warning" role="alert" aria-live="polite">
            <div class="notification-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z"/>
              </svg>
            </div>
            <div class="notification-content">
              <span class="notification-message">Warning: Your session will expire soon.</span>
            </div>
            <button type="button" class="notification-dismiss" aria-label="Dismiss notification">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
              </svg>
            </button>
          </div>

          <div class="notification notification-snackbar notification-error" role="alert" aria-live="assertive">
            <div class="notification-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z"/>
              </svg>
            </div>
            <div class="notification-content">
              <span class="notification-message">Error: Failed to save changes. Please try again.</span>
            </div>
            <button type="button" class="notification-dismiss" aria-label="Dismiss notification">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
              </svg>
            </button>
          </div>
        </div>

        <button class="code-toggle-btn" @click="showVariantsCode = !showVariantsCode">
          {{ showVariantsCode ? 'Hide' : 'Show' }} Code
        </button>

        <CodeBlock v-if="showVariantsCode" language="html">&lt;div class="notification notification-snackbar notification-success"&gt;...&lt;/div&gt;
&lt;div class="notification notification-snackbar notification-info"&gt;...&lt;/div&gt;
&lt;div class="notification notification-snackbar notification-warning"&gt;...&lt;/div&gt;
&lt;div class="notification notification-snackbar notification-error"&gt;...&lt;/div&gt;</CodeBlock>
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
              <td><code>.notification</code></td>
              <td>Base notification component</td>
            </tr>
            <tr>
              <td><code>.notification-snackbar</code></td>
              <td>Snackbar type (max-width 560px)</td>
            </tr>
            <tr>
              <td><code>.notification-banner</code></td>
              <td>Banner type (full-width)</td>
            </tr>
            <tr>
              <td><code>.notification-in-context</code></td>
              <td>In-context type (inline)</td>
            </tr>
            <tr>
              <td><code>.notification-success</code></td>
              <td>Success semantic color</td>
            </tr>
            <tr>
              <td><code>.notification-info</code></td>
              <td>Info semantic color</td>
            </tr>
            <tr>
              <td><code>.notification-warning</code></td>
              <td>Warning semantic color</td>
            </tr>
            <tr>
              <td><code>.notification-error</code></td>
              <td>Error semantic color</td>
            </tr>
            <tr>
              <td><code>.notification-icon</code></td>
              <td>Icon container</td>
            </tr>
            <tr>
              <td><code>.notification-content</code></td>
              <td>Message content wrapper</td>
            </tr>
            <tr>
              <td><code>.notification-dismiss</code></td>
              <td>Dismiss button</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Accessibility</h2>
      <ul class="accessibility-list">
        <li>Uses <code>role="alert"</code> for immediate screen reader announcements</li>
        <li><code>aria-live="polite"</code> for non-critical notifications (success, info, warning)</li>
        <li><code>aria-live="assertive"</code> for error notifications requiring immediate attention</li>
        <li><code>aria-atomic="true"</code> ensures entire message is read when updated</li>
        <li>Dismiss button includes <code>aria-label</code> for clear purpose</li>
        <li>Icons are decorative with <code>aria-hidden="true"</code></li>
        <li>Sufficient color contrast for all variants</li>
        <li>Keyboard accessible dismiss button</li>
      </ul>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Usage in Vue</h2>
      <CodeBlock language="vue">&lt;script setup lang="ts"&gt;
import { ref } from 'vue'

const notifications = ref&lt;Array&lt;{ id: number; message: string; type: string }&gt;&gt;([])

function showNotification(message: string, type: string) {
  const id = Date.now()
  notifications.value.push({ id, message, type })

  // Auto-dismiss after 5 seconds
  setTimeout(() => {
    removeNotification(id)
  }, 5000)
}

function removeNotification(id: number) {
  const index = notifications.value.findIndex(n => n.id === id)
  if (index > -1) {
    notifications.value.splice(index, 1)
  }
}
&lt;/script&gt;

&lt;template&gt;
  &lt;div class="notifications-container"&gt;
    &lt;div
      v-for="notif in notifications"
      :key="notif.id"
      :class="['notification', 'notification-snackbar', `notification-$&#123;notif.type&#125;`]"
      role="alert"
      aria-live="polite"
    &gt;
      &lt;div class="notification-content"&gt;
        &lt;span class="notification-message"&gt;&#123;&#123; notif.message &#125;&#125;&lt;/span&gt;
      &lt;/div&gt;
      &lt;button
        type="button"
        class="notification-dismiss"
        @click="removeNotification(notif.id)"
      &gt;
        ×
      &lt;/button&gt;
    &lt;/div&gt;
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
.code-toggle-btn { background: none; border: 1px solid var(--color-border); padding: 0.5rem 1rem; border-radius: var(--border-radius-sm); color: var(--color-text-muted); font-size: 0.875rem; cursor: pointer; transition: all 0.2s; font-family: inherit; margin-top: 1rem; }
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
