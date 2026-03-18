# Unicorn UI Documentation

A Vue 3 documentation application for the unicorn-lib component library.

## 🚀 Features

- ✅ Vue 3 with TypeScript
- ✅ Top navigation bar (Home, Getting Started, GitHub link)
- ✅ Left sidebar with categorized component navigation
- ✅ Search functionality for components
- ✅ Dark mode toggle with theme persistence
- ✅ Live component examples
- ✅ Code snippets with copy-to-clipboard
- ✅ Props/API documentation tables
- ✅ Accessibility notes for each component
- ✅ Responsive mobile design
- ✅ Uses unicorn-lib as UI library

## 🏗️ Project Structure

```
unicorn-docs/
├── src/
│   ├── components/
│   │   ├── TopNav.vue          # Top navigation bar
│   │   ├── SideNav.vue         # Sidebar with component list
│   │   └── CodeBlock.vue       # Code display with copy button
│   ├── pages/
│   │   ├── HomePage.vue        # Landing page
│   │   ├── GettingStarted.vue  # Installation & usage guide
│   │   └── ComponentPage.vue   # Dynamic component docs loader
│   ├── docs/
│   │   ├── ButtonDocs.vue      # Button component documentation
│   │   └── CardDocs.vue        # Card component documentation
│   ├── App.vue                 # Main app component
│   ├── main.ts                 # App entry point
│   └── style.css               # Custom docs styles
├── package.json
├── vite.config.ts
└── README.md
```

## 📦 Installation

```bash
cd unicorn-docs
vp install
```

## 🛠️ Development

Start the development server:

```bash
vp dev
```

The app will be available at `http://localhost:5173` (or next available port).

## 🏗️ Build

Build for production:

```bash
vp build
```

Preview production build:

```bash
vp preview
```

## 📚 Adding New Component Documentation

To add documentation for a new component:

1. Create a new file in `src/docs/` (e.g., `DialogDocs.vue`)
2. Follow the pattern from `ButtonDocs.vue` or `CardDocs.vue`
3. Add the component to the map in `src/pages/ComponentPage.vue`
4. Add the component name to the sidebar in `src/components/SideNav.vue`

### Documentation Component Template

```vue
<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '../components/CodeBlock.vue'
</script>

<template>
  <div class="component-docs">
    <header class="docs-header">
      <h1 class="docs-title">Component Name</h1>
      <p class="docs-description">Brief description...</p>
    </header>

    <section class="docs-section">
      <h2 class="docs-section-title">Section Title</h2>
      <p class="docs-section-text">Section description...</p>

      <div class="demo-container">
        <!-- Live examples -->
      </div>
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Props</h2>
      <!-- Props table -->
    </section>

    <section class="docs-section">
      <h2 class="docs-section-title">Accessibility</h2>
      <!-- Accessibility checklist -->
    </section>
  </div>
</template>
```

## 🎨 Styling

The app uses unicorn-lib's design tokens and components for consistent styling:

- Colors: `var(--color-*)` tokens
- Typography: `var(--typography-*)` tokens
- Components: Button, Card classes from unicorn-lib
- Theme: Controlled via `data-theme="light|dark"` attribute

## 🔗 Dependencies

- **Vue 3**: UI framework
- **TypeScript**: Type safety
- **VitePlus**: Build tooling
- **unicorn-lib**: Component library (local file dependency)

## 📝 TODO

- [ ] Add documentation for remaining components:
  - [ ] Dialog
  - [ ] Tag
  - [ ] Notification
  - [ ] Container
- [ ] Add Design System pages:
  - [ ] Colors
  - [ ] Typography
  - [ ] Utilities
- [ ] Implement mobile menu for small screens
- [ ] Add keyboard navigation for component switching
- [ ] Add version selector (when published to npm)
- [ ] Add syntax highlighting for code blocks

## 🤝 Contributing

When adding new component documentation:

1. Follow the existing documentation structure
2. Include live examples with interactive demos
3. Show code snippets with the copy button
4. Document all props with types and defaults
5. Include accessibility notes following WCAG 2.1 AA guidelines
6. Ensure responsive design for mobile devices

## 📄 License

This documentation app is part of the unicorn-lib project.
