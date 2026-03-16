# Utility Classes

Comprehensive utility class system for rapid UI development. These utilities provide a functional CSS approach, allowing you to build layouts and style components without writing custom CSS.

## 📋 Table of Contents

- [Overview](#overview)
- [Spacing System](#spacing-system)
- [Grid System](#grid-system)
- [Flexbox Utilities](#flexbox-utilities)
- [Sizing Utilities](#sizing-utilities)
- [Position Utilities](#position-utilities)
- [Display Utilities](#display-utilities)
- [Examples](#examples)

---

## Overview

The utility class system is built on top of **native CSS Grid and Flexbox**, providing a consistent and predictable API for layout and spacing. All utilities use CSS custom properties for easy theming and customization.

### Key Features

- ✅ **Consistent spacing scale** - All spacing utilities use the same scale
- ✅ **CSS Grid-based** - 12-column grid system without row wrappers
- ✅ **Flexbox utilities** - Complete flexbox layout control
- ✅ **No conflicts** - All utilities are single-purpose
- ✅ **Theme-aware** - Works with light/dark themes
- ✅ **Small footprint** - ~10KB gzipped

### Importing

Utilities are automatically included when you import the main stylesheet:

```ts
import '@ManusGitchen/m3re-unicorn/unicorn/styles.css'
```

Or import utilities separately:

```css
@import '@ManusGitchen/m3re-unicorn/unicorn/tokens/utilities.css';
```

---

## Spacing System

### Spacing Scale

Two naming systems available:

**Semantic Naming** (8px based):
- `0` = 0
- `xs` = 8px (0.5rem)
- `sm` = 16px (1rem)
- `md` = 24px (1.5rem)
- `lg` = 32px (2rem)
- `xl` = 48px (3rem)
- `2xl` = 64px (4rem)
- `3xl` = 96px (6rem)

**Numeric Naming** (4px based):
- `1` = 4px (0.25rem)
- `2` = 8px (0.5rem)
- `3` = 12px (0.75rem)
- `4` = 16px (1rem)
- `6` = 24px (1.5rem)
- `8` = 32px (2rem)
- `12` = 48px (3rem)
- `16` = 64px (4rem)
- `24` = 96px (6rem)

### Margin Utilities

Apply margin to elements:

**All sides:**
```html
<div class="m-0">No margin</div>
<div class="m-md">24px margin all sides</div>
<div class="m-4">16px margin all sides</div>
<div class="m-auto">Auto margin (centering)</div>
```

**Individual sides:**
```html
<div class="mt-lg">Top margin: 32px</div>
<div class="mr-sm">Right margin: 16px</div>
<div class="mb-xl">Bottom margin: 48px</div>
<div class="ml-xs">Left margin: 8px</div>
```

**Directional (horizontal/vertical):**
```html
<div class="mx-md">Horizontal margin: 24px (left + right)</div>
<div class="my-lg">Vertical margin: 32px (top + bottom)</div>
<div class="mx-auto">Horizontal centering</div>
```

**Available classes:**
- `m-*`, `mt-*`, `mr-*`, `mb-*`, `ml-*`, `mx-*`, `my-*`
- Sizes: `0`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `1`, `2`, `3`, `4`, `6`, `8`, `12`, `16`, `24`, `auto`

### Padding Utilities

Apply padding to elements (same scale as margin):

```html
<div class="p-md">24px padding all sides</div>
<div class="pt-lg pr-md pb-sm pl-xs">Individual sides</div>
<div class="px-lg py-sm">Horizontal: 32px, Vertical: 16px</div>
```

**Available classes:**
- `p-*`, `pt-*`, `pr-*`, `pb-*`, `pl-*`, `px-*`, `py-*`
- Sizes: `0`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `1`, `2`, `3`, `4`, `6`, `8`, `12`, `16`, `24`

---

## Grid System

A powerful **12-column CSS Grid** system. No row wrappers needed - items automatically flow into columns!

### How It Works

1. **Parent**: Add `.grid .grid-cols-*` to define the grid
2. **Children**: Add `.cols-*` to span columns
3. **Gap**: Add `.gap-*` for spacing between items

### Basic Grid

```html
<!-- 12-column grid with medium gap -->
<div class="grid grid-cols-12 gap-md">
  <div class="cols-12">Full width header</div>
  <div class="cols-8">Main content (8/12 = 2/3)</div>
  <div class="cols-4">Sidebar (4/12 = 1/3)</div>
  <div class="cols-6">Half width</div>
  <div class="cols-6">Half width</div>
</div>
```

### Grid Container Classes

**Define grid:**
```html
<div class="grid">Display: grid</div>
<div class="inline-grid">Display: inline-grid</div>
```

**Define columns (on parent):**
```html
<div class="grid-cols-1">1 column</div>
<div class="grid-cols-2">2 columns</div>
<div class="grid-cols-3">3 columns</div>
<div class="grid-cols-4">4 columns</div>
...
<div class="grid-cols-12">12 columns</div>
```

**Define rows (on parent):**
```html
<div class="grid-rows-1">1 row</div>
<div class="grid-rows-2">2 rows</div>
...
<div class="grid-rows-6">6 rows</div>
```

### Grid Child Classes

**Span columns:**
```html
<div class="grid grid-cols-12">
  <div class="cols-1">Spans 1 column</div>
  <div class="cols-2">Spans 2 columns</div>
  <div class="cols-6">Spans 6 columns (half)</div>
  <div class="cols-12">Spans 12 columns (full)</div>
  <div class="cols-full">Spans all columns</div>
</div>
```

**Span rows:**
```html
<div class="grid grid-cols-3 grid-rows-3">
  <div class="cols-2 rows-2">Spans 2 columns and 2 rows</div>
  <div class="rows-3">Spans 3 rows</div>
</div>
```

### Column Positioning

**Start/End positions:**
```html
<div class="grid grid-cols-12">
  <!-- Start at column 1, end at column 5 (spans 4 columns) -->
  <div class="col-start-1 col-end-5">Positioned</div>

  <!-- Start at column 7, end at column 13 (spans 6 columns) -->
  <div class="col-start-7 col-end-13">Positioned</div>
</div>
```

**Available classes:**
- `col-start-1` through `col-start-13`
- `col-end-1` through `col-end-13`
- `row-start-1` through `row-start-7`
- `row-end-1` through `row-end-7`

### Gap Utilities

Use the same spacing scale for gaps:

```html
<!-- Gap on both axes -->
<div class="grid grid-cols-4 gap-md">Equal gap everywhere</div>

<!-- Column gap only -->
<div class="grid grid-cols-4 gap-x-lg">Horizontal gap: 32px</div>

<!-- Row gap only -->
<div class="grid grid-cols-4 gap-y-sm">Vertical gap: 16px</div>

<!-- Different gaps -->
<div class="grid grid-cols-4 gap-x-lg gap-y-sm">Mixed gaps</div>
```

**Available classes:**
- `gap-*`, `gap-x-*`, `gap-y-*`
- Sizes: `0`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `1`, `2`, `3`, `4`, `6`, `8`, `12`, `16`, `24`

### Grid Examples

**Three equal columns:**
```html
<div class="grid grid-cols-3 gap-md">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>
```

**Two-column layout (2/3 + 1/3):**
```html
<div class="grid grid-cols-12 gap-lg">
  <div class="cols-8">Main content</div>
  <div class="cols-4">Sidebar</div>
</div>
```

**Product grid:**
```html
<div class="grid grid-cols-4 gap-md">
  <div>Product 1</div>
  <div>Product 2</div>
  <div>Product 3</div>
  <div>Product 4</div>
  <!-- Automatically wraps to next row -->
</div>
```

**Complex dashboard:**
```html
<div class="grid grid-cols-12 grid-rows-3 gap-md">
  <div class="cols-12">Full-width header</div>
  <div class="cols-8 rows-2">Featured content (spans 2 rows)</div>
  <div class="cols-4 rows-2">Sidebar (spans 2 rows)</div>
  <div class="cols-12">Full-width footer</div>
</div>
```

### Important: No Row Wrappers Needed!

Unlike Bootstrap, CSS Grid doesn't need row wrapper elements. Children automatically flow into the grid:

```html
<!-- ✅ Correct - Clean and simple -->
<div class="grid grid-cols-12 gap-md">
  <div class="cols-6">Item 1</div>
  <div class="cols-6">Item 2</div>
  <div class="cols-4">Item 3</div>
  <div class="cols-4">Item 4</div>
  <div class="cols-4">Item 5</div>
  <!-- Items automatically wrap to new rows -->
</div>

<!-- ❌ Wrong - No row wrappers needed -->
<div class="grid grid-cols-12 gap-md">
  <div class="row">  <!-- Don't do this! -->
    <div class="cols-6">Item 1</div>
  </div>
</div>
```

---

## Flexbox Utilities

Complete flexbox layout control for one-dimensional layouts.

### Display

```html
<div class="flex">Display: flex</div>
<div class="inline-flex">Display: inline-flex</div>
```

### Direction

```html
<div class="flex flex-row">Horizontal (default)</div>
<div class="flex flex-row-reverse">Horizontal reversed</div>
<div class="flex flex-col">Vertical</div>
<div class="flex flex-col-reverse">Vertical reversed</div>
```

### Wrap

```html
<div class="flex flex-wrap">Allow wrapping</div>
<div class="flex flex-nowrap">No wrapping (default)</div>
<div class="flex flex-wrap-reverse">Wrap reversed</div>
```

### Justify Content (Main Axis)

```html
<div class="flex justify-start">Start (default)</div>
<div class="flex justify-center">Center</div>
<div class="flex justify-end">End</div>
<div class="flex justify-between">Space between</div>
<div class="flex justify-around">Space around</div>
<div class="flex justify-evenly">Space evenly</div>
```

### Align Items (Cross Axis)

```html
<div class="flex items-start">Start</div>
<div class="flex items-center">Center</div>
<div class="flex items-end">End</div>
<div class="flex items-baseline">Baseline</div>
<div class="flex items-stretch">Stretch (default)</div>
```

### Align Self (Individual Item)

```html
<div class="flex">
  <div class="self-start">Aligned to start</div>
  <div class="self-center">Centered</div>
  <div class="self-end">Aligned to end</div>
</div>
```

### Gap (Same as Grid)

```html
<div class="flex gap-md">Gap: 24px</div>
<div class="flex gap-lg">Gap: 32px</div>
```

### Flexbox Examples

**Horizontal navbar:**
```html
<nav class="flex items-center justify-between gap-md px-lg py-md">
  <div>Logo</div>
  <div class="flex gap-sm">
    <a>Home</a>
    <a>About</a>
    <a>Contact</a>
  </div>
</nav>
```

**Centered content:**
```html
<div class="flex items-center justify-center min-h-screen">
  <div>Perfectly centered</div>
</div>
```

**Card actions:**
```html
<div class="flex justify-end gap-sm">
  <button>Cancel</button>
  <button>Submit</button>
</div>
```

**Vertical list:**
```html
<div class="flex flex-col gap-sm">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

---

## Sizing Utilities

Control element width and height.

### Width

**Percentage-based:**
```html
<div class="w-auto">Auto width</div>
<div class="w-full">100% width</div>
<div class="w-screen">100vw width</div>
```

**Fractional:**
```html
<div class="w-1/2">50% width</div>
<div class="w-1/3">33.33% width</div>
<div class="w-2/3">66.67% width</div>
<div class="w-1/4">25% width</div>
<div class="w-3/4">75% width</div>
```

**Semantic sizing:**
```html
<div class="w-xs">320px width</div>
<div class="w-sm">384px width</div>
<div class="w-md">448px width</div>
<div class="w-lg">512px width</div>
<div class="w-xl">576px width</div>
<div class="w-2xl">672px width</div>
<div class="w-3xl">768px width</div>
```

**Min/Max width:**
```html
<div class="min-w-0">Min-width: 0</div>
<div class="min-w-full">Min-width: 100%</div>
<div class="max-w-md">Max-width: 448px</div>
<div class="max-w-full">Max-width: 100%</div>
```

### Height

Same options as width:

```html
<div class="h-auto">Auto height</div>
<div class="h-full">100% height</div>
<div class="h-screen">100vh height</div>
<div class="h-1/2">50% height</div>
<div class="min-h-screen">Min-height: 100vh</div>
<div class="max-h-full">Max-height: 100%</div>
```

---

## Position Utilities

Control element positioning.

### Position Modes

```html
<div class="static">Position: static (default)</div>
<div class="relative">Position: relative</div>
<div class="absolute">Position: absolute</div>
<div class="fixed">Position: fixed</div>
<div class="sticky">Position: sticky</div>
```

### Positioning

```html
<div class="relative">
  <div class="absolute top-0 left-0">Top-left corner</div>
  <div class="absolute top-0 right-0">Top-right corner</div>
  <div class="absolute bottom-0 left-0">Bottom-left corner</div>
  <div class="absolute bottom-0 right-0">Bottom-right corner</div>
  <div class="absolute inset-0">Fill entire parent</div>
</div>
```

**Available classes:**
- `top-0`, `right-0`, `bottom-0`, `left-0`
- `top-auto`, `right-auto`, `bottom-auto`, `left-auto`
- `inset-0`, `inset-auto`

### Z-Index

```html
<div class="z-0">Z-index: 0</div>
<div class="z-10">Z-index: 10</div>
<div class="z-20">Z-index: 20</div>
<div class="z-30">Z-index: 30</div>
<div class="z-40">Z-index: 40</div>
<div class="z-50">Z-index: 50</div>
<div class="z-auto">Z-index: auto</div>
```

---

## Display Utilities

Control display modes.

```html
<div class="block">Display: block</div>
<div class="inline-block">Display: inline-block</div>
<div class="inline">Display: inline</div>
<div class="flex">Display: flex</div>
<div class="inline-flex">Display: inline-flex</div>
<div class="grid">Display: grid</div>
<div class="inline-grid">Display: inline-grid</div>
<div class="hidden">Display: none</div>
```

### Visibility

```html
<div class="visible">Visibility: visible</div>
<div class="invisible">Visibility: hidden (takes up space)</div>
```

---

## Examples

### Responsive Dashboard

```html
<div class="grid grid-cols-12 gap-lg p-lg">
  <!-- Header -->
  <header class="cols-12 flex items-center justify-between p-md">
    <h1>Dashboard</h1>
    <nav class="flex gap-md">
      <a>Home</a>
      <a>Settings</a>
    </nav>
  </header>

  <!-- Main Content -->
  <main class="cols-8">
    <div class="grid grid-cols-2 gap-md">
      <div class="p-lg">Chart 1</div>
      <div class="p-lg">Chart 2</div>
      <div class="cols-full p-lg">Full-width chart</div>
    </div>
  </main>

  <!-- Sidebar -->
  <aside class="cols-4 flex flex-col gap-sm">
    <div class="p-md">Widget 1</div>
    <div class="p-md">Widget 2</div>
    <div class="p-md">Widget 3</div>
  </aside>

  <!-- Footer -->
  <footer class="cols-12 flex justify-center p-md">
    <p>© 2026 Company</p>
  </footer>
</div>
```

### Product Card

```html
<div class="grid grid-cols-3 gap-lg">
  <div class="flex flex-col">
    <img class="w-full h-auto" src="product.jpg" alt="Product">
    <div class="flex flex-col gap-sm p-md">
      <h3>Product Name</h3>
      <p class="mb-auto">Description text goes here</p>
      <div class="flex justify-between items-center mt-md">
        <span>$99.99</span>
        <button>Add to Cart</button>
      </div>
    </div>
  </div>
  <!-- Repeat for more products -->
</div>
```

### Modal Dialog

```html
<div class="fixed inset-0 flex items-center justify-center z-50">
  <!-- Backdrop -->
  <div class="absolute inset-0 bg-black" style="opacity: 0.5;"></div>

  <!-- Modal -->
  <div class="relative w-full max-w-md p-lg mx-md" style="background: white; border-radius: 8px;">
    <div class="flex justify-between items-center mb-md">
      <h2>Modal Title</h2>
      <button class="absolute top-0 right-0 p-sm">×</button>
    </div>
    <p class="mb-lg">Modal content goes here.</p>
    <div class="flex justify-end gap-sm">
      <button>Cancel</button>
      <button>Confirm</button>
    </div>
  </div>
</div>
```

### Form Layout

```html
<form class="grid grid-cols-12 gap-md max-w-2xl mx-auto p-lg">
  <div class="cols-12">
    <label>Full Name</label>
    <input type="text" class="w-full">
  </div>

  <div class="cols-6">
    <label>Email</label>
    <input type="email" class="w-full">
  </div>

  <div class="cols-6">
    <label>Phone</label>
    <input type="tel" class="w-full">
  </div>

  <div class="cols-12">
    <label>Message</label>
    <textarea class="w-full"></textarea>
  </div>

  <div class="cols-12 flex justify-end gap-sm">
    <button type="reset">Clear</button>
    <button type="submit">Submit</button>
  </div>
</form>
```

---

## Customization

All utility classes use CSS custom properties that can be overridden:

```css
:root {
  /* Customize spacing scale */
  --spacing-md: 2rem;  /* Change medium spacing from 24px to 32px */
  --spacing-lg: 3rem;  /* Change large spacing from 32px to 48px */
}
```

See [CUSTOMIZATION.md](./CUSTOMIZATION.md) for more details.

---

## Browser Support

The utility classes use modern CSS features:
- **CSS Grid** - All modern browsers (IE11 not supported)
- **Flexbox** - All modern browsers
- **CSS Custom Properties** - All modern browsers

For older browser support, consider using a CSS preprocessor or PostCSS with appropriate plugins.

---

## Related Resources

- [CSS Grid Layout (W3Schools)](https://www.w3schools.com/css/css_grid.asp) - Learn about native CSS Grid
- [Flexbox Guide (CSS-Tricks)](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) - Complete flexbox guide
- [CUSTOMIZATION.md](./CUSTOMIZATION.md) - How to customize the library
- [demo.html](./demo.html) - Interactive examples of all utilities

---

**Need help?** Open an issue on [GitHub](https://github.com/ManusGitchen/m3re-unicorn/unicorn-lib/issues).
