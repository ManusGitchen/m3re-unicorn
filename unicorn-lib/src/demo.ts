import { createApp } from 'vue'
import { Button } from './components/button'

const app = createApp({
    components: {
        Button,
    },
    template: `
    <div style="padding: 2rem;">
      <h1>Unicorn Component Library Demo</h1>

      <section style="margin-bottom: 2rem;">
        <h2>Button Component</h2>

        <div style="display: flex; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap;">
          <Button>Default Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
        </div>

        <div style="display: flex; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap;">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>

        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <Button disabled>Disabled</Button>
          <Button variant="secondary" disabled>Disabled Secondary</Button>
        </div>
      </section>
    </div>
  `,
})

app.mount('#app')
