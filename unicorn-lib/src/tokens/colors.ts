/**
 * Color Design Tokens
 * Theme System with Light/Dark Mode Support
 */

/**
 * Adjusts a hex color's lightness by a percentage
 * @param hex - The hex color (e.g., '#7B40F7')
 * @param percent - Percentage to lighten (positive) or darken (negative)
 */
function adjustColor(hex: string, percent: number): string {
  // Remove # if present
  hex = hex.replace('#', '')

  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  // Adjust each channel
  const adjust = (channel: number) => {
    const adjusted = Math.round(channel + (255 - channel) * (percent / 100))
    return Math.max(0, Math.min(255, adjusted))
  }

  const newR = adjust(r)
  const newG = adjust(g)
  const newB = adjust(b)

  // Convert back to hex
  return `#${[newR, newG, newB].map(x => x.toString(16).padStart(2, '0')).join('')}`
}

/**
 * Creates a color variation set with light and dark variants
 */
function createColorVariation(baseColor: string, lightenPercent = 20, darkenPercent = 20) {
  return {
    base: baseColor,
    light: adjustColor(baseColor, lightenPercent),
    dark: adjustColor(baseColor, -darkenPercent),
  }
}

// Primary Colors
export const primary = createColorVariation('#7B40F7', 20, 20)
export const secondary = createColorVariation('#F740A4', 20, 20)

// Semantic Colors
export const success = createColorVariation('#4CAF50', 70, 20)
export const error = createColorVariation('#F44336', 70, 20)
export const warning = createColorVariation('#FF9800', 70, 20)
export const info = createColorVariation('#08c9af', 70, 20)

// Neutral Colors
export const neutral = {
  black: '#121212',
  black60: '#717171',
  black30: '#B8B8B8',
  black20: '#D0D0D0',
  white: '#FFFFFF',
} as const

// Background & Text Colors (Light Theme)
export const lightTheme = {
  background: {
    base: '#FFFFFF',
    contrast: '#D0D0D0', // black20 - for disabled components
  },
  text: {
    base: '#121212',
    disabled: '#717171', // black60
  },
  border: {
    base: '#B8B8B8', // black30
    error: error.base,
  },
} as const

// Background & Text Colors (Dark Theme)
export const darkTheme = {
  background: {
    base: '#121212',
    contrast: '#2A2A2A',
  },
  text: {
    base: '#FFFFFF',
    disabled: '#B8B8B8',
  },
  border: {
    base: '#717171',
    error: error.light,
  },
} as const

// Border Widths
export const borderWidths = {
  thin: '1px',
  medium: '2px',
  thick: '4px',
} as const

// Border Radius
export const borderRadius = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  full: '9999px',
} as const

// Border Styles
export const borderStyles = {
  solid: 'solid',
  transparent: 'transparent',
  none: 'none',
} as const

// Export all colors
export const colors = {
  primary,
  secondary,
  success,
  error,
  warning,
  info,
  neutral,
  lightTheme,
  darkTheme,
  borderWidths,
  borderRadius,
  borderStyles,
} as const

// Type definitions
export type ColorVariation = typeof primary
export type NeutralColor = keyof typeof neutral
export type BorderWidth = keyof typeof borderWidths
export type BorderRadius = keyof typeof borderRadius
export type BorderStyle = keyof typeof borderStyles

export interface ThemeColors {
  background: {
    base: string
    contrast: string
  }
  text: {
    base: string
    disabled: string
  }
  border: {
    base: string
    error: string
  }
}
