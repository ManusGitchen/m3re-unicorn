# Unicorn Vue 3 Component Library

A modern, type-safe Vue 3 component library built with TypeScript and optimized with VitePlus.

## ✨ Features

- **Vue 3.5.30** - Latest Vue 3 stable version
- **TypeScript** - Full type safety with strict mode
- **Tree-shakeable** - Only import what you use
- **ESM Bundle** - Modern ES modules format
- **Zero Runtime** - No unnecessary abstractions
- **Small Bundle** - ~1KB gzipped core

## 📦 Installation

Using npm:
```bash
npm install @ManusGitchen/m3re-unicorn/unicorn vue@^3.5.30
```

Using pnpm:
```bash
pnpm add @ManusGitchen/m3re-unicorn/unicorn vue@^3.5.30
```

Using yarn:
```bash
yarn add @ManusGitchen/m3re-unicorn/unicorn vue@^3.5.30
```

## 🚀 Quick Start

### Installation & Setup

```ts
// In your main.ts or App.vue
import '@ManusGitchen/m3re-unicorn/unicorn/styles.css'
import { Button, Card } from '@ManusGitchen/m3re-unicorn/unicorn'
```

### Basic Usage

```vue
<template>
  <div>
    <Button variant="primary" size="lg">
      Click Me
    </Button>

    <Card variant="elevated">
      <h3>Card Title</h3>
      <p>Card content goes here</p>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Button, Card } from '@ManusGitchen/m3re-unicorn/unicorn'
</script>
```

### With TypeScript

```ts
import { Button, type ButtonProps } from '@ManusGitchen/m3re-unicorn/unicorn'

const props: ButtonProps = {
  variant: 'primary',
  size: 'md',
  disabled: false
}
```

## 📚 Components

| Component | Props | Description |
|-----------|-------|-------------|
| `Button` | `variant`, `size`, `disabled` | Customizable button component |
| `Card` | `variant` | Container component with variants |

### Button Component

```vue
<Button 
  variant="primary"    <!-- 'primary' \| 'secondary' \| 'danger' -->
  size="md"           <!-- 'sm' \| 'md' \| 'lg' -->
  disabled            <!-- boolean (optional) -->
  @click="handleClick"
>
  Button Text
</Button>
```

**Variants:** `primary` (default), `secondary`, `danger`  
**Sizes:** `sm`, `md` (default), `lg`

### Card Component

```vue
<Card variant="default">  <!-- 'default' | 'elevated' | 'outlined' -->
  Your content here
</Card>
```

**Variants:** `default`, `elevated`, `outlined`

## 🎨 Design Tokens

### Typography Tokens

Use typography design tokens for consistent text styling:

```ts
import { fontSizes, fontWeights, typographyStyles } from '@ManusGitchen/m3re-unicorn/unicorn'

// In TypeScript
const headingSize = fontSizes.pageHeading // '3rem'
const boldWeight = fontWeights.bold // 700
```

Or use CSS custom properties:
```css
/* Import typography tokens */
@import '@ManusGitchen/m3re-unicorn/unicorn/tokens/typography.css';

h1 {
  font-size: var(--typography-page-heading-font-size);
  font-weight: var(--typography-font-weight-bold);
}

/* Or use utility classes */
.my-heading {
  @apply text-page-heading;
}
```

### Color & Theme Tokens

The library includes a complete theming system with light/dark mode support:

```ts
import { primary, secondary, lightTheme, darkTheme } from '@ManusGitchen/m3re-unicorn/unicorn'

// Access color variations
console.log(primary.base)  // '#7B40F7'
console.log(primary.light) // '#9f70f9'
console.log(primary.dark)  // '#6233c6'
```

Or use CSS custom properties:
```css
/* Import color tokens */
@import '@ManusGitchen/m3re-unicorn/unicorn/tokens/colors.css';

.my-button {
  background-color: var(--color-primary);
  color: var(--color-text);
  border: var(--border-width-thin) solid var(--color-border);
  border-radius: var(--border-radius-md);
}

/* Use utility classes */
.card {
  @apply bg-base text-base border border-base rounded-lg;
}
```

#### Light/Dark Mode

Enable dark mode by adding `data-theme="dark"` to your root element:

```html
<html data-theme="dark">
  <!-- Your app -->
</html>
```

Or let it follow system preferences (automatically supported).

#### Available Color Tokens

- **Brand Colors:** `primary`, `secondary` (base, light, dark variations)
- **Semantic Colors:** `success`, `error`, `warning`, `info` (base, light, dark variations)
- **Neutral Colors:** `black`, `black60`, `black30`, `black20`, `white`
- **Theme Colors:** `background`, `text`, `border` (automatically switch with theme)
- **Border Widths:** `thin` (1px), `medium` (2px), `thick` (4px)
- **Border Radius:** `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `full`

### Customization

All components use CSS custom properties with `!default`, making them fully customizable:

```css
:root {
  /* Override primary color */
  --color-primary: #FF6B6B;
  --color-primary-light: #FF8E8E;
  --color-primary-dark: #CC5656;

  /* Customize button appearance */
  --btn-border-radius: 50px;
  --btn-font-weight: 600;

  /* Customize card appearance */
  --card-padding: 2rem;
  --card-border-radius: 20px;
}
```

**📖 For complete customization options, see [CUSTOMIZATION.md](./CUSTOMIZATION.md)**

## 📖 Documentation

Full documentation: [docs link coming soon]

## 🧪 Development

### Install dependencies
```bash
npm install
```

### Development mode
```bash
npm run dev      # Watch mode rebuild
```

### Build
```bash
npm run build    # Production build
```

### Testing
```bash
npm run test     # Run tests
npm run typecheck # Type checking
```

## 🔧 Configuration

### TypeScript

If using TypeScript in your project, the library includes `.d.mts` type definitions automatically.

### Vue 3 Setup

Make sure your project has Vue 3.5.30+ installed:

```json
{
  "devDependencies": {
    "vue": "^3.5.30"
  }
}
```

## 📋 Requirements

- **Vue:** ^3.5.30
- **Node:** ^16 (for development)
- **Package Manager:** npm, yarn, or pnpm

## 🐛 Known Issues

- None currently. Report issues on [GitHub Issues](https://github.com/ManusGitchen/m3re-unicorn/unicorn-lib/issues)

## 📝 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

## 🤝 Contributing

Contributions welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

## 🔗 Links

- **GitHub:** https://github.com/ManusGitchen/m3re-unicorn/unicorn-lib
- **npm:** https://www.npmjs.com/package/ManusGitchen/m3re-unicorn/unicorn
- **Issues:** https://github.com/ManusGitchen/m3re-unicorn/unicorn-lib/issues
- **Discussions:** https://github.com/ManusGitchen/m3re-unicorn/unicorn-lib/discussions

---

Built with ❤️ using Vue 3 & TypeScript
