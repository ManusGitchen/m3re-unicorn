# tokens/ - Design Tokens

## Token System

Design tokens are exported as:
1. **TypeScript constants** (`colors.ts`, `typography.ts`)
2. **CSS custom properties** (`colors.css`, `typography.css`)

## Colors (`colors.ts`)

### Color Utilities
- `adjustColor(hex, percent)`: Lighten/darken hex colors
- `createColorVariation(base, lighten%, darken%)`: Generate variation set

### Color Structure
Each color has three variations: `base`, `light`, `dark`

**Brand Colors**:
- `primary`: #7B40F7 (purple)
- `secondary`: #F740A4 (pink)

**Semantic Colors**:
- `success`: #4CAF50 (green)
- `error`: #F44336 (red)
- `warning`: #FF9800 (orange)
- `info`: #08c9af (teal)

**Neutral Colors**:
- `black`, `black60`, `black30`, `black20`, `white`

### Theme System
Two themes exported: `lightTheme`, `darkTheme`

Each theme defines:
- `background.base`, `background.contrast`
- `text.base`, `text.disabled`
- `border.base`, `border.error`

### Other Tokens
- `borderWidths`: thin/medium/thick
- `borderRadius`: xs/sm/md/lg/xl/2xl/full
- `borderStyles`: solid/transparent/none

## Typography (`typography.ts`)

### Token Categories

**Font Families**:
- `primary`: System font stack
- `monospace`: Code font stack

**Font Weights**: light/regular/medium/semibold/bold (300-700)

**Font Sizes**: 11 heading sizes + 3 paragraph sizes + 3 text sizes
- Range: 0.75rem (12px) to 3.5rem (56px)

**Line Heights**: Matching line heights for each size
- Display/headings: 1.2-1.5
- Paragraphs: 1.4-1.6
- Text: 1.3-1.5

**Letter Spacing**: tight/normal/wide/wider

### Predefined Styles
`typographyStyles` object contains complete style definitions:
- Display/Heading styles (displayHeading, pageHeading, etc.)
- Paragraph styles (leadParagraph, paragraph, compactParagraph)
- Text styles (mediumText, smallText, spareM)

Each style includes: fontFamily, fontSize, fontWeight, lineHeight, letterSpacing
