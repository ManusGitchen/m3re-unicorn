# Typography Design Tokens

This directory contains typography design tokens extracted from the Figma Light Component Library design system.

## Files

- **`typography.ts`** - TypeScript constants and types for programmatic access
- **`typography.css`** - CSS custom properties and utility classes for styling

## Usage

### TypeScript/JavaScript

Import typography tokens in your components:

```typescript
import { fontSizes, fontWeights, typographyStyles } from 'unicorn-lib'

// Use individual tokens
const heading = {
  fontSize: fontSizes.pageHeading,
  fontWeight: fontWeights.bold,
}

// Or use predefined styles
const style = typographyStyles.pageHeading
// Returns: { fontFamily: '...', fontSize: '3rem', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em' }
```

### CSS

Import the CSS file in your application entry point:

```typescript
import 'unicorn-lib/dist/tokens/typography.css'
```

Then use CSS custom properties:

```css
.my-heading {
  font-size: var(--typography-page-heading-font-size);
  font-weight: var(--typography-font-weight-bold);
  line-height: var(--typography-page-heading-line-height);
}
```

Or use the predefined utility classes:

```html
<h1 class="text-page-heading">Page Title</h1>
<h2 class="text-section-heading">Section Title</h2>
<p class="text-paragraph">Body text content</p>
```

## Typography Scale

### Heading Styles

| Style | Font Size | Font Weight | Use Case |
|-------|-----------|-------------|----------|
| Display Heading | 56px (3.5rem) | Bold (700) | Hero sections, main page titles |
| Page Heading (H1) | 48px (3rem) | Bold (700) | Page titles |
| Section Heading (H2) | 36px (2.25rem) | Semibold (600) | Major section headers |
| Subsection Heading (H3) | 30px (1.875rem) | Semibold (600) | Subsection headers |
| Less Loud Heading | 24px (1.5rem) | Medium (500) | Softer emphasis headers |
| Base Headline | 20px (1.25rem) | Medium (500) | Card titles, small headers |
| Option Header | 18px (1.125rem) | Medium (500) | Form labels, option titles |
| Alt Smart Headline | 16px (1rem) | Semibold (600) | Uppercase accent headers |
| H5 Medium | 14px (0.875rem) | Medium (500) | Small headers |

### Paragraph Styles

| Style | Font Size | Font Weight | Line Height | Use Case |
|-------|-----------|-------------|-------------|----------|
| Lead Paragraph | 20px (1.25rem) | Regular (400) | 1.6 | Introductory text, emphasis |
| Paragraph | 16px (1rem) | Regular (400) | 1.5 | Body text, main content |
| Compact Paragraph | 14px (0.875rem) | Regular (400) | 1.4 | Dense content, captions |

### Text Styles

| Style | Font Size | Font Weight | Use Case |
|-------|-----------|-------------|----------|
| Medium Text | 15px (0.9375rem) | Regular (400) | UI text, labels |
| Small Text | 13px (0.8125rem) | Regular (400) | Helper text, metadata |
| Spare M | 12px (0.75rem) | Regular (400) | Fine print, footnotes |

## Responsive Behavior

The typography system includes responsive scaling for smaller screens:

### Mobile (≤768px)
- Display Heading: 40px (2.5rem)
- Page Heading: 32px (2rem)
- Section Heading: 28px (1.75rem)
- Subsection Heading: 24px (1.5rem)

### Tablet (769px - 1024px)
- Display Heading: 48px (3rem)
- Page Heading: 40px (2.5rem)

## Design System Source

These tokens are extracted from:
**Figma File:** Light Component Library
**Node:** Typography (4502:170)

## Examples

### Vue Component with TypeScript

```vue
<script setup lang="ts">
import { typographyStyles } from 'unicorn-lib'

const headingStyle = typographyStyles.pageHeading
</script>

<template>
  <h1 :style="headingStyle">
    Welcome
  </h1>
</template>
```

### CSS-in-JS

```typescript
import { fontSizes, fontWeights, lineHeights } from 'unicorn-lib'

const buttonStyle = {
  fontSize: fontSizes.baseHeadline,
  fontWeight: fontWeights.medium,
  lineHeight: lineHeights.baseHeadline,
}
```

### Plain HTML + CSS

```html
<link rel="stylesheet" href="node_modules/unicorn-lib/dist/tokens/typography.css">

<div>
  <h1 class="text-display-heading">Main Title</h1>
  <h2 class="text-section-heading">Section</h2>
  <p class="text-paragraph">Content goes here.</p>
</div>
```
