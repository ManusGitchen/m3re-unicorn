/**
 * Typography Design Tokens
 * Extracted from Figma Design System: Light Component Library
 */

export const fontFamilies = {
  primary: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  monospace: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
} as const

export const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const

export const fontSizes = {
  // Display & Heading styles
  displayHeading: '3.5rem',      // 56px
  pageHeading: '3rem',           // 48px - H1
  sectionHeading: '2.25rem',     // 36px - H2
  subsectionHeading: '1.875rem', // 30px - H3
  lessLoudHeading: '1.5rem',     // 24px
  baseHeadline: '1.25rem',       // 20px
  optionHeader: '1.125rem',      // 18px
  altSmartHeadline: '1rem',      // 16px
  h5Medium: '0.875rem',          // 14px

  // Paragraph styles
  leadParagraph: '1.25rem',      // 20px
  paragraph: '1rem',             // 16px
  compactParagraph: '0.875rem',  // 14px

  // Text styles
  mediumText: '0.9375rem',       // 15px
  smallText: '0.8125rem',        // 13px
  spareM: '0.75rem',             // 12px
} as const

export const lineHeights = {
  // Display & Heading line heights
  displayHeading: 1.2,
  pageHeading: 1.2,
  sectionHeading: 1.3,
  subsectionHeading: 1.3,
  lessLoudHeading: 1.4,
  baseHeadline: 1.4,
  optionHeader: 1.4,
  altSmartHeadline: 1.5,
  h5Medium: 1.5,

  // Paragraph line heights
  leadParagraph: 1.6,
  paragraph: 1.5,
  compactParagraph: 1.4,

  // Text line heights
  mediumText: 1.5,
  smallText: 1.4,
  spareM: 1.3,
} as const

export const letterSpacings = {
  tight: '-0.02em',
  normal: '0',
  wide: '0.02em',
  wider: '0.05em',
} as const

// Type definitions
export type FontFamily = keyof typeof fontFamilies
export type FontWeight = keyof typeof fontWeights
export type FontSize = keyof typeof fontSizes
export type LineHeight = keyof typeof lineHeights
export type LetterSpacing = keyof typeof letterSpacings

export interface TypographyStyle {
  fontFamily: string
  fontSize: string
  fontWeight: number
  lineHeight: number
  letterSpacing?: string
}

// Predefined typography styles
export const typographyStyles: Record<string, TypographyStyle> = {
  displayHeading: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.displayHeading,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.displayHeading,
    letterSpacing: letterSpacings.tight,
  },
  pageHeading: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.pageHeading,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.pageHeading,
    letterSpacing: letterSpacings.tight,
  },
  sectionHeading: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.sectionHeading,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.sectionHeading,
  },
  subsectionHeading: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.subsectionHeading,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.subsectionHeading,
  },
  lessLoudHeading: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.lessLoudHeading,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.lessLoudHeading,
  },
  baseHeadline: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.baseHeadline,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.baseHeadline,
  },
  optionHeader: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.optionHeader,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.optionHeader,
  },
  altSmartHeadline: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.altSmartHeadline,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.altSmartHeadline,
    letterSpacing: letterSpacings.wider,
  },
  h5Medium: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.h5Medium,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.h5Medium,
  },
  leadParagraph: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.leadParagraph,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.leadParagraph,
  },
  paragraph: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.paragraph,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.paragraph,
  },
  compactParagraph: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.compactParagraph,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.compactParagraph,
  },
  mediumText: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.mediumText,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.mediumText,
  },
  smallText: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.smallText,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.smallText,
  },
  spareM: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.spareM,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.spareM,
  },
}
