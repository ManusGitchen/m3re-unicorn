# 🎯 Unicorn Darts

A modern, accessible web application for tracking 501 darts games.

## Features

- **501 Darts Game**: Full implementation with double-out rules
- **Multi-Player Support**: Play with 1-4 players
- **Score Tracking**: Enter scores with bust detection and validation
- **Slang Shortcuts**: Quick entry with darts terminology (breakfast, ton, shanghai, etc.)
- **Checkout Suggestions**: Smart suggestions when approaching checkout
- **Game History**: Track all past games with detailed statistics
- **Player Profiles**: Manage players with stats tracking
- **Dark Mode**: Full theme support with system preference detection
- **Responsive Design**: Mobile-first, works on all devices
- **Offline Ready**: No backend required, runs entirely in browser
- **Accessible**: WCAG 2.1 AA compliant

## Tech Stack

- **Vue 3** with Composition API
- **TypeScript** (strict mode)
- **VitePlus** for building
- **Vitest** for testing (113 tests)
- **Vue Router** for navigation
- **IndexedDB** for persistence
- **Unicorn-lib** for styling (design tokens)

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 11.0.0

### Installation

```bash
# Clone the repository
cd unicorn-darts

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:5173
```

### Building for Production

```bash
# Build the application
npm run build

# Output in dist/
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Type checking
npm run typecheck
```

## Project Structure

```
unicorn-darts/
├── src/
│   ├── components/
│   │   ├── common/           # Reusable components
│   │   ├── game/             # Game interface components
│   │   ├── player/           # Player management components
│   │   ├── history/          # Game history components
│   │   └── layout/           # Layout components
│   ├── composables/          # Vue composables
│   ├── utils/                # Utility functions
│   ├── types/                # TypeScript types
│   ├── views/                # Page views
│   ├── router/               # Vue Router setup
│   └── App.vue               # Root component
└── tests/
    ├── unit/                 # Unit tests
    └── integration/          # Integration tests
```

## How to Play

### Starting a New Game

1. Navigate to the home page
2. Select 1-4 players from your player list
3. Click "Start Game"

### During the Game

1. Enter your score for the turn (0-180)
2. Use slang shortcuts for quick entry:
   - **Madhouse**: 2
   - **Breakfast**: 26
   - **Basement**: 38
   - **Tops**: 40
   - **Baby Ton**: 95
   - **Ton**: 100
   - **Nelson**: 111
   - **Shanghai**: 120
   - **Ton-80**: 180
3. If reaching exactly 0, check "Last dart was a double" to win
4. Click "Submit Score" to record your turn
5. Use "Undo Last Turn" if needed

### Bust Rules

- Score cannot go below 0
- Score cannot equal 1 (impossible to finish)
- If bust occurs, score remains unchanged
- Turn passes to next player

### Winning

- Reach exactly 0 points
- Last dart must be a double
- Winner stats automatically updated

## Game Rules (501)

- Starting score: 501 points
- Players take turns throwing 3 darts
- Score is subtracted from remaining total
- Must finish on exactly 0 with a double
- Invalid finishes result in a "bust"

## Development

### Key Technologies

- **IndexedDB**: All data stored locally in browser
- **Vue 3 Composition API**: Modern reactive components
- **TypeScript**: Full type safety
- **Design Tokens**: Consistent styling with unicorn-lib

### Testing

- 113 comprehensive tests
- Unit tests for all business logic
- Integration tests for game flow
- 100% coverage on scoring functions

### Contributing

This is part of the m3re-unicorn monorepo. Follow Vue 3 and TypeScript best practices.

## Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation supported
- Screen reader friendly
- High contrast modes
- Touch targets >= 44px

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2023 support required
- IndexedDB support required

## License

MIT

## Acknowledgments

- Built with Vue 3 and TypeScript
- Styled with unicorn-lib design system
- Icons: Emoji (cross-platform)
