# Customization Guide

All component styles use CSS custom properties with `!default`, making them easy to customize without modifying the library code.

## Quick Start

Import the main stylesheet in your app:

```ts
// In your main.ts or App.vue
import '@ManusGitchen/m3re-unicorn/unicorn/styles.css'
```

## How to Customize

Override any CSS variable in your own stylesheet. The `!default` flag means your values will take precedence.

### Method 1: Global Overrides

Create a `custom-theme.css` file:

```css
:root {
  /* Override primary color */
  --color-primary: #FF6B6B;
  --color-primary-light: #FF8E8E;
  --color-primary-dark: #CC5656;

  /* Customize button styles */
  --btn-border-radius: 8px;
  --btn-font-weight: 600;

  /* Customize card styles */
  --card-border-radius: 16px;
  --card-padding: 2rem;
}
```

Import this after the library styles:

```ts
import '@ManusGitchen/m3re-unicorn/unicorn/styles.css'
import './custom-theme.css'  // Your overrides
```

### Method 2: Component-Specific Overrides

Target specific component classes:

```css
/* Custom button styles */
.btn-primary {
  --btn-primary-bg: #FF6B6B;
  --btn-primary-hover-bg: #FF4949;
  border-radius: 20px;
}

/* Custom card styles */
.card-elevated {
  --card-elevated-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  --card-padding: 2rem;
}
```

### Method 3: Inline Overrides

Use style attributes for one-off customizations:

```vue
<Button
  class="btn-primary"
  style="--btn-primary-bg: #FF6B6B; --btn-border-radius: 20px;"
>
  Custom Button
</Button>
```

## Available Customization Variables

### Button Component

#### Base Button
- `--btn-font-family` - Font family
- `--btn-font-size` - Font size
- `--btn-font-weight` - Font weight (default: 500)
- `--btn-line-height` - Line height (default: 1.5)
- `--btn-padding-y` - Vertical padding (default: 0.5rem)
- `--btn-padding-x` - Horizontal padding (default: 1rem)
- `--btn-border-width` - Border width
- `--btn-border-radius` - Border radius (default: 12px)
- `--btn-gap` - Gap between icon and text (default: 0.5rem)
- `--btn-transition` - Transition effect
- `--btn-focus-outline` - Focus outline style
- `--btn-focus-outline-offset` - Focus outline offset (default: 2px)

#### Button Variants

**Primary:**
- `--btn-primary-bg` - Background color
- `--btn-primary-color` - Text color
- `--btn-primary-border` - Border color
- `--btn-primary-hover-bg` - Hover background
- `--btn-primary-hover-border` - Hover border
- `--btn-primary-active-bg` - Active background

**Secondary:**
- `--btn-secondary-bg`
- `--btn-secondary-color`
- `--btn-secondary-border`
- `--btn-secondary-hover-bg`
- `--btn-secondary-hover-border`
- `--btn-secondary-active-bg`

**Danger:**
- `--btn-danger-bg`
- `--btn-danger-color`
- `--btn-danger-border`
- `--btn-danger-hover-bg`
- `--btn-danger-hover-border`
- `--btn-danger-active-bg`

#### Button Sizes
- `--btn-sm-font-size` - Small button font size
- `--btn-sm-padding-y` - Small button vertical padding
- `--btn-sm-padding-x` - Small button horizontal padding
- `--btn-md-font-size` - Medium button font size
- `--btn-md-padding-y` - Medium button vertical padding
- `--btn-md-padding-x` - Medium button horizontal padding
- `--btn-lg-font-size` - Large button font size
- `--btn-lg-padding-y` - Large button vertical padding
- `--btn-lg-padding-x` - Large button horizontal padding

#### Button States
- `--btn-disabled-bg` - Disabled background
- `--btn-disabled-color` - Disabled text color
- `--btn-disabled-border` - Disabled border
- `--btn-disabled-opacity` - Disabled opacity (default: 0.6)
- `--btn-hover-transform` - Hover transform effect
- `--btn-active-transform` - Active transform effect

#### Dark Theme
- `--btn-primary-bg-dark`
- `--btn-primary-hover-bg-dark`
- `--btn-secondary-bg-dark`
- `--btn-secondary-hover-bg-dark`
- `--btn-danger-bg-dark`
- `--btn-danger-hover-bg-dark`

### Card Component

#### Base Card
- `--card-bg` - Background color
- `--card-color` - Text color
- `--card-border-width` - Border width
- `--card-border-color` - Border color
- `--card-border-radius` - Border radius (default: 16px)
- `--card-padding` - Inner padding (default: 1.5rem)
- `--card-transition` - Transition effect
- `--card-shadow` - Box shadow

#### Card Variants

**Default:**
- `--card-default-bg`
- `--card-default-border`
- `--card-default-shadow`

**Elevated:**
- `--card-elevated-bg`
- `--card-elevated-border`
- `--card-elevated-shadow`
- `--card-elevated-hover-shadow`
- `--card-elevated-hover-transform`

**Outlined:**
- `--card-outlined-bg`
- `--card-outlined-border`
- `--card-outlined-border-width`
- `--card-outlined-shadow`
- `--card-outlined-hover-border`

#### Card States
- `--card-disabled-bg`
- `--card-disabled-color`
- `--card-disabled-border`
- `--card-disabled-opacity` (default: 0.6)
- `--card-interactive-hover-border`
- `--card-interactive-hover-shadow`
- `--card-interactive-active-transform`

#### Card Sections
- `--card-header-padding`
- `--card-header-border-width`
- `--card-header-border-color`
- `--card-header-margin`
- `--card-body-padding`
- `--card-footer-padding`
- `--card-footer-border-width`
- `--card-footer-border-color`
- `--card-footer-margin`

#### Card Typography
- `--card-title-font-size`
- `--card-title-font-weight`
- `--card-title-line-height`
- `--card-title-color`
- `--card-title-margin`
- `--card-description-font-size`
- `--card-description-font-weight`
- `--card-description-line-height`
- `--card-description-color`
- `--card-description-margin`

#### Dark Theme
- `--card-elevated-shadow-dark`
- `--card-elevated-hover-shadow-dark`
- `--card-interactive-hover-shadow-dark`

#### Responsive
- `--card-padding-mobile`
- `--card-border-radius-mobile`
- `--card-header-padding-mobile`
- `--card-header-margin-mobile`
- `--card-footer-padding-mobile`
- `--card-footer-margin-mobile`

## Examples

### Example 1: Rounded Buttons

```css
:root {
  --btn-border-radius: 50px;
}
```

### Example 2: Larger Cards

```css
:root {
  --card-padding: 2.5rem;
  --card-border-radius: 20px;
}
```

### Example 3: Custom Brand Colors

```css
:root {
  /* Your brand colors */
  --color-primary: #7B40F7;
  --color-primary-light: #9f70f9;
  --color-primary-dark: #6233c6;

  /* Button uses these automatically */
  --btn-primary-bg: var(--color-primary);
  --btn-primary-hover-bg: var(--color-primary-dark);
}
```

### Example 4: Minimalist Card

```css
.card-minimal {
  --card-border-color: transparent;
  --card-shadow: none;
  --card-padding: 1rem;
  --card-border-radius: 8px;
}
```

### Example 5: Bold Buttons

```css
.btn {
  --btn-font-weight: 700;
  --btn-border-radius: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
```

### Example 6: Dark Theme Customization

```css
[data-theme="dark"] {
  /* Override dark theme colors */
  --color-background: #0A0A0A;
  --color-text: #F5F5F5;

  /* Custom dark mode button */
  --btn-primary-bg-dark: #9f70f9;
}
```

## Tips

1. **Use CSS Variables**: Always use CSS variables instead of hard-coded values for consistency
2. **Test Both Themes**: Make sure your customizations work in both light and dark modes
3. **Scope Your Changes**: Use specific selectors to avoid affecting other components
4. **Check Contrast**: Ensure text remains readable when changing colors
5. **Responsive Design**: Use media queries for mobile-specific overrides

## Need Help?

See [README.md](./README.md) for more information about the component library.
