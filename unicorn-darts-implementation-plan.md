# Unicorn Darts - 501 Darts Game Implementation Plan

## Table of Contents
1. [501 Darts Rules Summary](#501-darts-rules-summary)
2. [Darts Slang Dictionary](#darts-slang-dictionary)
3. [Project Structure](#project-structure)
4. [IndexedDB Schema Design](#indexeddb-schema-design)
5. [Component Architecture](#component-architecture)
6. [State Management Design](#state-management-design)
7. [User Flows](#user-flows)
8. [Implementation Phases](#implementation-phases)
9. [Testing Strategy](#testing-strategy)
10. [Key Technical Decisions](#key-technical-decisions)

---

## 501 Darts Rules Summary

### Overview
501 is a subtraction darts game where players start with 501 points and aim to reduce their score to exactly zero.

### Game Rules

**Starting Score**: Each player begins with 501 points.

**Turn Structure**:
- Each player throws 3 darts per turn (called a "round")
- Score for each dart is subtracted from current total
- Minimum of 1 player, typically 2-4 players

**Scoring**:
- Dartboard sections: 1-20 points
- **Single**: Face value (outer sections)
- **Double**: 2x the number (outer ring)
- **Triple**: 3x the number (middle ring)
- **Bullseye**: Outer bull (25 points), Inner bull (50 points)
- **Miss**: 0 points

**Double-Out Rule**:
- Final dart MUST hit a double to win
- Player must finish on exactly 0
- If a dart would take score below 0, or to 1 (impossible to finish), the entire turn is **"bust"** and score reverts to start of turn

**Bust Conditions**:
- Score goes below 0
- Score lands on exactly 1 (can't finish - no double-0.5)
- Final dart is not a double when reaching 0

**Winning**:
- First player to reduce score to exactly 0 with a double wins
- Example finish: Score is 40, hit double-20 (wins)

**Strategic Notes**:
- Common checkout targets: Double-16 (32), Double-20 (40), Double-18 (36)
- "Bogey numbers": Scores where no checkout exists (169, 168, 166, 165, 163, 162, 159)

---

## Darts Slang Dictionary

Common shortcuts for score entry (one shortcut per unique value):

| Slang Term | Value | Description |
|------------|-------|-------------|
| **Madhouse** | 2 | Double-1 (hardest double to hit for checkout) |
| **Breakfast** | 26 | 5 + 20 + 1 (the bed and breakfast cost in old UK pence) |
| **Basement** | 38 | Double-19 (bottom of standard board) |
| **Tops** | 40 | Double-20 (top of board) |
| **Baby Ton** | 95 | Three T19s (19+19+19) |
| **Ton** | 100 | Scoring 100+ in a single turn |
| **Nelson** | 111 | Considered unlucky (one eye, one arm, one leg) |
| **Shanghai** | 120 | Hitting single, double, triple of same number in one turn |
| **Ton-80** | 180 | Maximum possible score (T20 + T20 + T20) |

**Note**: Parser will also accept numeric input directly (e.g., "26", "100", "180"). Additional terms can be added later as user requests.

---

## Project Structure

```
m3re-unicorn/
├── unicorn-lib/              # Existing component library
└── unicorn-darts/            # NEW: Darts game package
    ├── src/
    │   ├── components/
    │   │   ├── player/
    │   │   │   ├── PlayerCard.vue          # Display player info/avatar
    │   │   │   ├── PlayerList.vue          # List of players in game
    │   │   │   └── PlayerForm.vue          # Create/edit player
    │   │   ├── game/
    │   │   │   ├── GameBoard.vue           # Main game view
    │   │   │   ├── ScoreDisplay.vue        # Current scores for all players
    │   │   │   ├── ScoreEntry.vue          # Input for dart scores
    │   │   │   ├── TurnHistory.vue         # History of throws for current game
    │   │   │   └── CheckoutSuggestion.vue  # Suggest checkout paths
    │   │   ├── history/
    │   │   │   ├── GameHistory.vue         # Past games list
    │   │   │   └── GameDetail.vue          # View single past game
    │   │   └── layout/
    │   │       ├── AppLayout.vue           # Main app shell
    │   │       └── Navigation.vue          # Top nav/menu
    │   ├── composables/
    │   │   ├── useGame.ts                  # Game state management
    │   │   ├── usePlayer.ts                # Player CRUD operations
    │   │   ├── useScoring.ts               # Score calculation logic
    │   │   ├── useDatabase.ts              # IndexedDB wrapper
    │   │   ├── useSlang.ts                 # Slang shortcuts parser
    │   │   └── useCheckout.ts              # Checkout suggestions
    │   ├── types/
    │   │   ├── game.ts                     # Game-related types
    │   │   ├── player.ts                   # Player types
    │   │   ├── score.ts                    # Score/throw types
    │   │   └── database.ts                 # DB schema types
    │   ├── utils/
    │   │   ├── scoring.ts                  # Pure scoring functions
    │   │   ├── validation.ts               # Score validation
    │   │   ├── checkout.ts                 # Checkout calculation
    │   │   ├── slang.ts                    # Slang dictionary & parser
    │   │   └── constants.ts                # Game constants
    │   ├── views/
    │   │   ├── HomeView.vue                # Landing page
    │   │   ├── PlayersView.vue             # Manage players
    │   │   ├── GameView.vue                # Active game
    │   │   ├── HistoryView.vue             # Game history
    │   │   └── SettingsView.vue            # App settings (future)
    │   ├── router/
    │   │   └── index.ts                    # Vue Router setup
    │   ├── App.vue                         # Root component
    │   ├── main.ts                         # App entry point
    │   └── styles.css                      # Global styles (imports unicorn-lib)
    ├── tests/
    │   ├── unit/
    │   │   ├── scoring.test.ts             # Score calculation tests
    │   │   ├── validation.test.ts          # Validation tests
    │   │   ├── checkout.test.ts            # Checkout logic tests
    │   │   ├── slang.test.ts               # Slang parser tests
    │   │   └── database.test.ts            # DB operations tests
    │   └── integration/
    │       └── game-flow.test.ts           # Full game flow test
    ├── public/
    │   ├── images/
    │   │   └── players/                    # Hard-coded player images
    │   │       ├── player1.jpg
    │   │       ├── player2.jpg
    │   │       └── ...
    │   ├── favicon.ico
    │   └── index.html
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    ├── vitest.config.ts
    └── README.md
```

---

## IndexedDB Schema Design

### Database: `unicorn-darts`
**Version**: 1

### Object Stores

#### 1. `players`
Stores player profiles.

```typescript
interface Player {
  id: string                    // UUID
  name: string                  // Display name
  imageUrl: string              // Path to image (hard-coded for MVP)
  stats: PlayerStats
  createdAt: Date
  updatedAt: Date
}

interface PlayerStats {
  gamesPlayed: number
  gamesWon: number
  totalDartsThrown: number
  averageScore: number          // Average per 3-dart turn
  highestScore: number          // Best single turn
  checkoutRate: number          // % of checkout attempts succeeded
  favorite180s: number          // Count of 180 scores
}
```

**Indexes**:
- Primary key: `id` (auto-generated)
- Index: `name` (for search/sort)

#### 2. `games`
Stores completed and in-progress games.

```typescript
interface Game {
  id: string                    // UUID
  startingScore: number         // 501 for now, 301 later
  playerIds: string[]           // Ordered array of player IDs
  status: GameStatus            // 'in-progress' | 'completed' | 'abandoned'
  currentPlayerIndex: number    // Whose turn it is
  currentRound: number          // Round counter (increments after all players throw)
  scores: GameScore[]           // Current scores for each player
  turns: Turn[]                 // History of all turns
  winnerId?: string             // Winner's player ID (if completed)
  createdAt: Date
  updatedAt: Date
  completedAt?: Date
}

type GameStatus = 'in-progress' | 'completed' | 'abandoned'

interface GameScore {
  playerId: string
  currentScore: number          // Remaining score
  dartsThrown: number           // Total darts thrown so far
}

interface Turn {
  id: string                    // UUID
  playerId: string
  round: number                 // Which round
  throws: Throw[]               // 1-3 throws
  totalScore: number            // Sum of throws
  remainingAfter: number        // Score after this turn
  isBust: boolean               // Did they bust?
  isWin: boolean                // Did they win?
  timestamp: Date
}

interface Throw {
  score: number                 // 0-180 (or 0-60 per dart)
  multiplier: number            // 1=single, 2=double, 3=triple
  section: number               // Board number (1-20, or 25 for bull)
  // For MVP, we might just store total score per dart
  // Full tracking can come later
}
```

**Indexes**:
- Primary key: `id`
- Index: `status` (filter active/completed)
- Index: `createdAt` (sort by date)
- Compound index: `[status, createdAt]` (for efficient queries)

#### 3. `app-settings` (Future)
Key-value store for app preferences.

```typescript
interface AppSetting {
  key: string                   // Setting name
  value: any                    // Setting value
  updatedAt: Date
}
```

**Indexes**:
- Primary key: `key`

---

## Component Architecture

### Core Components

#### 1. **AppLayout** (`src/components/layout/AppLayout.vue`)
**Responsibility**: Main app shell with navigation and theme toggle.

**Props**:
- None (uses router for view switching)

**Format**: Vue SFC with `<template>`, `<script setup lang="ts">`, and `<style scoped>`

**unicorn-lib CSS Classes**:
- `.container` (if exists, or custom layout with tokens)
- Design tokens for spacing/colors

**Structure**:
```vue
<template>
  <div class="app-layout">
    <Navigation />
    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>
```

---

#### 2. **Navigation** (`src/components/layout/Navigation.vue`)
**Responsibility**: Top navigation bar with links and theme switcher.

**Props**: None

**Format**: Vue SFC with Composition API

**unicorn-lib CSS Classes**:
- Custom nav classes with unicorn-lib tokens
- `.btn` for nav buttons

---

#### 3. **PlayerCard** (`src/components/player/PlayerCard.vue`)
**Responsibility**: Display player avatar, name, and stats.

**Props**:
```typescript
{
  player: Player
  variant?: 'compact' | 'detailed'
  selectable?: boolean
  selected?: boolean
}
```

**Emits**: `click`, `select`

**Format**: Vue SFC with Composition API

**unicorn-lib CSS Classes**:
- `.card` (from unicorn-lib)
- `.card-content`, `.card-title`, `.card-body`
- Custom classes for avatar display

---

#### 4. **PlayerList** (`src/components/player/PlayerList.vue`)
**Responsibility**: Display list of players with selection/management.

**Props**:
```typescript
{
  players: Player[]
  selectable?: boolean
  selectedIds?: string[]
  maxSelection?: number
}
```

**Emits**: `select`, `add`, `edit`, `delete`

**Format**: Vue SFC with Composition API

**unicorn-lib CSS Classes**:
- Grid/flex utilities from unicorn-lib
- `.btn` for action buttons

---

#### 5. **PlayerForm** (`src/components/player/PlayerForm.vue`)
**Responsibility**: Create or edit player profile.

**Props**:
```typescript
{
  player?: Player              // Edit mode if provided
  mode: 'create' | 'edit'
}
```

**Emits**: `save`, `cancel`

**Format**: Vue SFC with Composition API

**unicorn-lib CSS Classes**:
- `.card` for form container
- `.btn` for submit/cancel
- Custom input styles with design tokens

---

#### 6. **GameBoard** (`src/components/game/GameBoard.vue`)
**Responsibility**: Main game view orchestrating all game components.

**Props**:
```typescript
{
  gameId: string
}
```

**Format**: Vue SFC with Composition API

**unicorn-lib CSS Classes**:
- Layout utilities (flex, grid)
- `.card` for sections
- Mobile-first responsive design

**Structure**:
```vue
<template>
  <div class="game-board">
    <ScoreDisplay :game="game" />
    <ScoreEntry 
      :currentPlayer="currentPlayer"
      @score-entered="handleScore"
    />
    <CheckoutSuggestion :score="currentScore" />
    <TurnHistory :turns="recentTurns" />
  </div>
</template>
```

---

#### 7. **ScoreDisplay** (`src/components/game/ScoreDisplay.vue`)
**Responsibility**: Show all players' current scores prominently.

**Props**:
```typescript
{
  game: Game
  highlightPlayerId?: string    // Current player
}
```

**Format**: Vue SFC with Composition API

**unicorn-lib CSS Classes**:
- `.card` with `.card-color-*` variants
- Large typography tokens
- Success/error colors for score changes

---

#### 8. **ScoreEntry** (`src/components/game/ScoreEntry.vue`)
**Responsibility**: Input interface for entering dart scores.

**Props**:
```typescript
{
  playerId: string
  currentScore: number
  mode?: 'per-dart' | 'sum'     // Default: 'sum' (enter total per turn)
}
```

**Emits**: 
```typescript
{
  'score-entered': {
    throws: number[]            // Array of scores
    total: number
    isBust: boolean
  }
}
```

**Features**:
- Number pad for quick entry (0-180 for sum mode, 0-60 for per-dart)
- Slang shortcut buttons (Breakfast, Ton-80, etc.)
- Text input with slang parser
- Validation feedback (bust detection)
- Undo last dart (in per-dart mode)

**Format**: Vue SFC with Composition API

**unicorn-lib CSS Classes**:
- `.btn` for number pad and shortcuts
- `.btn-color-primary/secondary/success/error`
- Grid layout for number pad
- `.text-error` for bust warnings

---

#### 9. **CheckoutSuggestion** (`src/components/game/CheckoutSuggestion.vue`)
**Responsibility**: Suggest optimal checkout paths when score is ≤ 170.

**Props**:
```typescript
{
  score: number                 // Current score
  maxDarts?: number             // How many darts left (1-3)
}
```

**Format**: Vue SFC with Composition API

**unicorn-lib CSS Classes**:
- `.card` with `.card-color-info`
- `.text-info` for suggestions

**Logic**:
- Show common checkout paths (e.g., 40 → "Double-20")
- Indicate if checkout is possible with remaining darts
- Warn if on "bogey number"

---

#### 10. **TurnHistory** (`src/components/game/TurnHistory.vue`)
**Responsibility**: Show recent turns (scrollable list).

**Props**:
```typescript
{
  turns: Turn[]
  limit?: number                // Max turns to show (default: 10)
}
```

**Format**: Vue SFC with Composition API

**unicorn-lib CSS Classes**:
- `.card`
- List utilities
- `.text-success` for good scores, `.text-error` for busts

---

#### 11. **GameHistory** (`src/components/history/GameHistory.vue`)
**Responsibility**: List past games with summary info.

**Props**: None (fetches from DB)

**Format**: Vue SFC with Composition API

**unicorn-lib CSS Classes**:
- `.card` for each game summary
- `.btn` for "View Details"

---

#### 12. **GameDetail** (`src/components/history/GameDetail.vue`)
**Responsibility**: Detailed view of a past game.

**Props**:
```typescript
{
  gameId: string
}
```

**Format**: Vue SFC with Composition API

**unicorn-lib CSS Classes**:
- `.card` for sections
- Typography tokens for stats

---

## State Management Design

### Composables Architecture

#### 1. **useDatabase** (`src/composables/useDatabase.ts`)
**Responsibility**: IndexedDB wrapper with type-safe operations.

**API**:
```typescript
{
  // Initialization
  init(): Promise<void>
  
  // Players
  addPlayer(player: Omit<Player, 'id'>): Promise<Player>
  updatePlayer(id: string, updates: Partial<Player>): Promise<Player>
  deletePlayer(id: string): Promise<void>
  getPlayer(id: string): Promise<Player | undefined>
  getAllPlayers(): Promise<Player[]>
  
  // Games
  addGame(game: Omit<Game, 'id'>): Promise<Game>
  updateGame(id: string, updates: Partial<Game>): Promise<Game>
  deleteGame(id: string): Promise<void>
  getGame(id: string): Promise<Game | undefined>
  getGames(status?: GameStatus): Promise<Game[]>
  
  // Settings
  getSetting(key: string): Promise<any>
  setSetting(key: string, value: any): Promise<void>
}
```

**State**: None (stateless utility)

---

#### 2. **usePlayer** (`src/composables/usePlayer.ts`)
**Responsibility**: Player management with reactive state.

**API**:
```typescript
{
  // Reactive state
  players: Ref<Player[]>
  loading: Ref<boolean>
  error: Ref<Error | null>
  
  // Methods
  loadPlayers(): Promise<void>
  createPlayer(name: string, imageUrl: string): Promise<Player>
  updatePlayer(id: string, updates: Partial<Player>): Promise<void>
  deletePlayer(id: string): Promise<void>
  getPlayerById(id: string): ComputedRef<Player | undefined>
  updatePlayerStats(id: string, gameResult: GameResult): Promise<void>
}
```

---

#### 3. **useGame** (`src/composables/useGame.ts`)
**Responsibility**: Game state management (active game).

**API**:
```typescript
{
  // Reactive state
  currentGame: Ref<Game | null>
  currentPlayer: ComputedRef<Player | undefined>
  canUndo: ComputedRef<boolean>
  
  // Game lifecycle
  startNewGame(playerIds: string[]): Promise<Game>
  loadGame(id: string): Promise<void>
  endGame(status: 'completed' | 'abandoned'): Promise<void>
  
  // Turn actions
  recordTurn(throws: number[]): Promise<void>
  undoLastTurn(): Promise<void>
  
  // Getters
  getPlayerScore(playerId: string): ComputedRef<number>
  getCurrentRound(): ComputedRef<number>
  getTurnHistory(): ComputedRef<Turn[]>
}
```

**State Flow**:
1. Start game → Initialize Game object with all players at 501
2. Record turn → Validate, calculate new score, check for bust/win
3. Update IndexedDB after each turn
4. Switch to next player
5. Detect win condition → End game, update player stats

---

#### 4. **useScoring** (`src/composables/useScoring.ts`)
**Responsibility**: Score calculation and validation logic.

**API**:
```typescript
{
  // Calculations
  calculateRemainingScore(currentScore: number, throwScores: number[]): number
  isBust(currentScore: number, throwScores: number[]): boolean
  isWin(currentScore: number, throwScores: number[], lastThrowIsDouble: boolean): boolean
  
  // Validation
  validateThrow(score: number): boolean        // 0-60 range check
  validateTurn(scores: number[]): boolean      // 1-3 throws, valid scores
  
  // Checkout detection
  canCheckout(score: number, dartsRemaining: number): boolean
  isBogeyNumber(score: number): boolean
}
```

---

#### 5. **useSlang** (`src/composables/useSlang.ts`)
**Responsibility**: Parse slang terms into numeric scores.

**API**:
```typescript
{
  // Parser
  parseSlang(input: string): number | null
  
  // Dictionary
  slangDictionary: ComputedRef<SlangEntry[]>
  
  // Suggestions
  getSlangSuggestions(score: number): string[]
}

interface SlangEntry {
  term: string
  value: number
  description: string
  category: 'exact' | 'range' | 'special'
}
```

**Implementation**:
- Map terms to values (case-insensitive)
- Support both full names and abbreviations
- Example: "ton 80" → 180, "breakfast" → 26, "ton" → 100

---

#### 6. **useCheckout** (`src/composables/useCheckout.ts`)
**Responsibility**: Calculate checkout suggestions.

**API**:
```typescript
{
  getCheckoutSuggestions(score: number, dartsRemaining: number): CheckoutPath[]
  isBogey(score: number): boolean
}

interface CheckoutPath {
  description: string           // e.g., "Double-20"
  throws: CheckoutThrow[]
  probability: 'high' | 'medium' | 'low'
}

interface CheckoutThrow {
  section: number               // Board number
  multiplier: number            // 1, 2, or 3
  score: number                 // Resulting score
}
```

**Checkout Logic** (MVP - Simple):
- Score ≤ 40 and even: Suggest double of (score/2)
- Score ≤ 60: Suggest single to set up double
- Score ≤ 170: Suggest common 2-dart or 3-dart combinations
- Bogey numbers: Warn "No checkout possible"

---

## User Flows

### Flow 1: Create/Manage Players

1. User navigates to "Players" view
2. Sees list of existing players (fetched from IndexedDB)
3. Clicks "Add Player" button
4. **PlayerForm** appears (dialog or inline)
5. User enters name, selects hard-coded image
6. Clicks "Save"
7. **usePlayer.createPlayer()** called
8. New player saved to IndexedDB
9. Player list refreshes
10. Success message shown

**Edit Flow**: Click player card → **PlayerForm** in edit mode → Save → Update DB

**Delete Flow**: Click delete icon → Confirm dialog → Delete from DB → Refresh list

---

### Flow 2: Start New Game

1. User navigates to "Home" or "New Game" view
2. Sees **PlayerList** with all players
3. Selects 1-4 players (checkboxes or click to select)
4. Clicks "Start Game" button
5. **useGame.startNewGame(selectedPlayerIds)** called
6. New **Game** object created with:
   - Starting score: 501 for each player
   - Status: 'in-progress'
   - Current player: First in list
7. Game saved to IndexedDB
8. User navigated to **GameView** with game ID
9. **GameBoard** component loads

---

### Flow 3: Enter Scores (Sum Mode)

1. **GameBoard** displays current player's turn
2. **ScoreEntry** component shows:
   - Number pad (0-180)
   - Slang shortcut buttons
   - Text input field
3. User enters total score for turn (e.g., "85")
   - **Option A**: Clicks number pad buttons
   - **Option B**: Types in text field
   - **Option C**: Clicks shortcut button (e.g., "Ton-80")
4. Clicks "Submit" button
5. **useScoring** validates score:
   - Check if bust (score < 0 or = 1)
   - Check if win (score = 0 and last dart was double)
   - For MVP sum mode: Assume user correctly calculates per-dart scores
6. If valid:
   - **useGame.recordTurn()** called
   - New **Turn** object created
   - Game score updated
   - Turn saved to DB
   - **ScoreDisplay** updates (animated transition)
   - Move to next player
7. If bust:
   - Show error message
   - Score reverts to start of turn
   - Still move to next player (no score change)
8. If win:
   - Show win animation/dialog
   - **useGame.endGame('completed')** called
   - Update winner's stats
   - Navigate to game summary

---

### Flow 4: Enter Scores (Per-Dart Mode)

1. Same as Flow 3, but:
2. User enters score for EACH dart (3 inputs or sequential entry)
3. After each dart:
   - Running total shown
   - Can undo last dart
4. After 3rd dart (or early if bust detected):
   - Same validation and turn recording as Flow 3
5. Advantage: More granular, can catch errors earlier
6. Disadvantage: Slower input

**MVP Decision**: Start with **Sum Mode** only, add Per-Dart mode in Phase 3.

---

### Flow 5: Use Slang Shortcuts

1. In **ScoreEntry** text field, user types "ton 80"
2. **useSlang.parseSlang("ton 80")** returns `180`
3. Field updates to show "180"
4. User submits
5. Turn recorded with score 180

**Common Shortcuts**:
- "breakfast" → 26
- "ton" → 100
- "high ton" → User must specify (e.g., "165")
- "t80" or "180" → 180
- "double top" → 40

---

### Flow 6: Checkout Suggestions

1. Player's score reaches ≤ 170
2. **CheckoutSuggestion** component displays
3. **useCheckout.getCheckoutSuggestions()** called
4. Shows 1-3 suggested paths:
   - "40: Double-20"
   - "50: Bull"
   - "32: Double-16"
5. User aims for suggested checkout
6. If successful → Win condition triggers

---

### Flow 7: Undo Last Turn

1. User clicks "Undo" button (visible after any turn)
2. **useGame.undoLastTurn()** called
3. Last turn removed from **Game.turns**
4. Scores reverted to previous state
5. Current player index adjusted
6. DB updated
7. UI refreshes

**Limitation**: Can only undo within current game session (not after closing app).

---

### Flow 8: View Game History

1. User navigates to "History" view
2. **GameHistory** component loads
3. Fetches all completed games from IndexedDB
4. Displays cards with:
   - Date
   - Players
   - Winner
   - Total rounds
5. User clicks "View Details"
6. **GameDetail** component loads
7. Shows full turn-by-turn history
8. Stats: Average score, best turn, checkout rate

---

### Flow 9: End/Abandon Game

1. User clicks "End Game" button during active game
2. Confirmation dialog: "Abandon Game?" or "Mark as Complete?"
3. If abandon:
   - **useGame.endGame('abandoned')** called
   - No stats updated
4. If complete (manual):
   - User selects winner (if not auto-detected)
   - Stats updated for winner
5. Navigate to home or history

---

## Implementation Phases

### Phase 1: Project Setup & Core Infrastructure
**Estimated Time**: 4-6 hours

#### Files to Create:
1. **`unicorn-darts/package.json`**
   - Dependencies: `vue@^3.5`, `vue-router@^4`, `uuid`, `vitest@latest`
   - Dev dependencies: `vite-plus`, `typescript`, `@vitejs/plugin-vue`
   - Scripts: `dev`, `build`, `test`, `typecheck`

2. **`unicorn-darts/tsconfig.json`**
   - Extends unicorn-lib config
   - Path aliases: `@/*` → `src/*`

3. **`unicorn-darts/vite.config.ts`**
   - Vue plugin
   - Path resolution
   - Dev server config

4. **`unicorn-darts/vitest.config.ts`**
   - Test environment: jsdom (for Vue components)
   - Coverage config

5. **Database Setup**: `src/composables/useDatabase.ts`
   - IndexedDB initialization
   - Schema version 1
   - Create object stores: `players`, `games`
   - CRUD operations

6. **Types**: `src/types/*.ts`
   - Define all TypeScript interfaces (Player, Game, Turn, etc.)

7. **Constants**: `src/utils/constants.ts`
   - Starting score: 501
   - Max players: 4
   - Hard-coded player images array

#### Tests to Write:
- `tests/unit/database.test.ts`
  - Test IndexedDB initialization
  - Test CRUD operations for players and games
  - Mock IndexedDB with `fake-indexeddb`

#### Acceptance Criteria:
- [ ] Package builds successfully
- [ ] TypeScript compiles with no errors
- [ ] IndexedDB initializes correctly
- [ ] Can create/read/update/delete players and games
- [ ] All database tests pass

---

### Phase 2: Player Management
**Estimated Time**: 6-8 hours

#### Files to Create:
1. **Composable**: `src/composables/usePlayer.ts`
   - Reactive player list
   - CRUD methods
   - Stats calculation

2. **Components** (Vue SFCs with `<template>`, `<script setup lang="ts">`, `<style scoped>`):
   - `src/components/player/PlayerCard.vue`
   - `src/components/player/PlayerList.vue`
   - `src/components/player/PlayerForm.vue`

3. **View**: `src/views/PlayersView.vue`
   - List all players
   - Add/edit/delete functionality

4. **Hard-coded Images**: `public/images/players/`
   - Add 10-20 placeholder images (can use avataaars.io or similar)

#### Key Features:
- Create player with name and image selection
- Edit player name/image
- Delete player (with confirmation)
- Display player stats (initially all zeros)
- Responsive card grid layout

#### Component Structure:
- All components use Vue 3 Composition API with `<script setup lang="ts">`
- Scoped styles using unicorn-lib classes
- TypeScript props with `defineProps<T>()`

#### Tests to Write:
- `tests/unit/usePlayer.test.ts`
  - Test player creation, update, deletion
  - Test stats calculation

#### Acceptance Criteria:
- [ ] Can create players with name and image
- [ ] Can edit and delete players
- [ ] Players persist in IndexedDB
- [ ] UI is responsive and accessible
- [ ] All usePlayer tests pass

---

### Phase 3: Core Scoring Logic
**Estimated Time**: 8-10 hours

#### Files to Create:
1. **Utils**:
   - `src/utils/scoring.ts` - Pure functions for score calculation
   - `src/utils/validation.ts` - Validation functions
   - `src/utils/checkout.ts` - Checkout suggestions (simple MVP version)
   - `src/utils/slang.ts` - Slang dictionary and parser

2. **Composables**:
   - `src/composables/useScoring.ts` - Wraps scoring utils
   - `src/composables/useSlang.ts` - Wraps slang parser
   - `src/composables/useCheckout.ts` - Wraps checkout utils

#### Key Functions (`src/utils/scoring.ts`):
```typescript
// Calculate new score after throws
function calculateScore(current: number, throws: number[]): number {
  const total = throws.reduce((sum, t) => sum + t, 0)
  return current - total
}

// Check if turn results in bust
function isBust(current: number, throws: number[]): boolean {
  const newScore = calculateScore(current, throws)
  return newScore < 0 || newScore === 1
}

// Check if turn is a winning turn
function isWin(current: number, throws: number[], lastIsDouble: boolean): boolean {
  const newScore = calculateScore(current, throws)
  return newScore === 0 && lastIsDouble
}

// Validate individual throw (0-60)
function isValidThrow(score: number): boolean {
  return score >= 0 && score <= 60
}

// Validate entire turn (1-3 throws, sum ≤ 180)
function isValidTurn(throws: number[]): boolean {
  if (throws.length === 0 || throws.length > 3) return false
  const sum = throws.reduce((a, b) => a + b, 0)
  return sum >= 0 && sum <= 180 && throws.every(isValidThrow)
}
```

#### Key Functions (`src/utils/slang.ts`):
```typescript
const SLANG_DICTIONARY: Record<string, number> = {
  'madhouse': 2,
  'breakfast': 26,
  'basement': 38,
  'tops': 40,
  'baby ton': 95,
  'ton': 100,
  'nelson': 111,
  'shanghai': 120,
  'ton 80': 180,
  'ton-80': 180,
  't80': 180,
}

function parseSlang(input: string): number | null {
  const normalized = input.toLowerCase().trim()
  
  // Check exact match
  if (SLANG_DICTIONARY[normalized] !== undefined) {
    return SLANG_DICTIONARY[normalized]
  }
  
  // Check if it's a number
  const num = parseInt(normalized, 10)
  if (!isNaN(num)) {
    return num
  }
  
  // Check for "high ton" or "low ton" - requires specific number
  if (normalized.includes('high ton')) {
    // Parse following number (e.g., "high ton 165")
    const match = normalized.match(/(\d+)/)
    if (match) {
      const val = parseInt(match[1], 10)
      if (val >= 150 && val <= 179) return val
    }
  }
  
  if (normalized.includes('low ton')) {
    const match = normalized.match(/(\d+)/)
    if (match) {
      const val = parseInt(match[1], 10)
      if (val >= 100 && val <= 149) return val
    }
  }
  
  return null
}

function getSlangForScore(score: number): string[] {
  const matches: string[] = []
  for (const [term, value] of Object.entries(SLANG_DICTIONARY)) {
    if (value === score) matches.push(term)
  }
  return matches
}
```

#### Key Functions (`src/utils/checkout.ts`):
```typescript
const BOGEY_NUMBERS = [169, 168, 166, 165, 163, 162, 159]

function isBogey(score: number): boolean {
  return BOGEY_NUMBERS.includes(score)
}

function canCheckout(score: number, dartsRemaining: number): boolean {
  if (score > 170) return false
  if (score === 0) return true
  if (score === 1) return false // Impossible
  if (isBogey(score) && dartsRemaining < 3) return false
  
  // Simplified: If even and ≤ 40, can checkout with double
  if (dartsRemaining >= 1 && score <= 40 && score % 2 === 0) return true
  
  // More complex logic for 2-3 dart checkouts
  // MVP: Just check common finishes
  return score <= 170 && dartsRemaining >= 2
}

interface CheckoutSuggestion {
  description: string
  path: string[]
}

function getCheckoutSuggestions(score: number): CheckoutSuggestion[] {
  const suggestions: CheckoutSuggestion[] = []
  
  // Single-dart finishes (even numbers ≤ 40)
  if (score <= 40 && score % 2 === 0) {
    const doubleTarget = score / 2
    suggestions.push({
      description: `Double-${doubleTarget}`,
      path: [`D${doubleTarget}`]
    })
  }
  
  // Bull finish
  if (score === 50) {
    suggestions.push({
      description: 'Bull',
      path: ['Bull']
    })
  }
  
  // Two-dart finishes (simplified common ones)
  const twoDArtCheckouts: Record<number, CheckoutSuggestion> = {
    60: { description: '20, D20', path: ['20', 'D20'] },
    70: { description: 'T10, D20', path: ['T10', 'D20'] },
    80: { description: 'T20, D10', path: ['T20', 'D10'] },
    90: { description: 'T20, D15', path: ['T20', 'D15'] },
    100: { description: 'T20, D20', path: ['T20', 'D20'] },
    110: { description: 'T20, Bull', path: ['T20', 'Bull'] },
    // Add more common ones
  }
  
  if (twoDArtCheckouts[score]) {
    suggestions.push(twoDArtCheckouts[score])
  }
  
  // If no exact match, suggest setup shots
  if (suggestions.length === 0 && score > 40) {
    // Suggest getting to a good checkout number
    const targetCheckout = 40 // Most common
    const needed = score - targetCheckout
    if (needed > 0 && needed <= 60) {
      suggestions.push({
        description: `Score ${needed}, then D20`,
        path: [`${needed}`, 'D20']
      })
    }
  }
  
  return suggestions
}
```

#### Tests to Write:
- `tests/unit/scoring.test.ts` ✅ **CRITICAL**
  - Test score calculation (various combinations)
  - Test bust detection (negative, score=1, etc.)
  - Test win detection (must be double)
  - Test validation (range checks, invalid throws)
  - Edge cases: 0 score, 180, bust on last dart
  
- `tests/unit/slang.test.ts`
  - Test all dictionary entries
  - Test case-insensitivity
  - Test number parsing
  - Test invalid inputs return null
  
- `tests/unit/checkout.test.ts`
  - Test bogey number detection
  - Test checkout possibility
  - Test suggestion generation

#### Acceptance Criteria:
- [ ] All scoring calculations are accurate
- [ ] Bust detection works correctly
- [ ] Win detection requires double-out
- [ ] Slang parser handles all dictionary terms
- [ ] Checkout suggestions are reasonable
- [ ] 100% test coverage on scoring functions

---

### Phase 4: Game State Management
**Estimated Time**: 8-10 hours

#### Files to Create:
1. **Composable**: `src/composables/useGame.ts`
   - Game lifecycle management
   - Turn recording
   - Player rotation
   - Win/bust handling
   - Undo functionality

#### Key Implementation (`useGame.ts`):
```typescript
import { ref, computed } from 'vue'
import type { Game, Turn, Player } from '../types'
import { useDatabase } from './useDatabase'
import { calculateScore, isBust, isWin } from '../utils/scoring'
import { v4 as uuid } from 'uuid'

export function useGame() {
  const db = useDatabase()
  
  const currentGame = ref<Game | null>(null)
  const players = ref<Player[]>([])
  
  const currentPlayer = computed(() => {
    if (!currentGame.value) return undefined
    const playerId = currentGame.value.playerIds[currentGame.value.currentPlayerIndex]
    return players.value.find(p => p.id === playerId)
  })
  
  const canUndo = computed(() => {
    return currentGame.value && currentGame.value.turns.length > 0
  })
  
  async function startNewGame(playerIds: string[]): Promise<Game> {
    // Load players
    players.value = await Promise.all(
      playerIds.map(id => db.getPlayer(id))
    ).then(results => results.filter(Boolean) as Player[])
    
    // Create game
    const game: Game = {
      id: uuid(),
      startingScore: 501,
      playerIds,
      status: 'in-progress',
      currentPlayerIndex: 0,
      currentRound: 1,
      scores: playerIds.map(playerId => ({
        playerId,
        currentScore: 501,
        dartsThrown: 0
      })),
      turns: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    await db.addGame(game)
    currentGame.value = game
    return game
  }
  
  async function loadGame(id: string): Promise<void> {
    const game = await db.getGame(id)
    if (!game) throw new Error('Game not found')
    
    currentGame.value = game
    
    // Load players
    players.value = await Promise.all(
      game.playerIds.map(id => db.getPlayer(id))
    ).then(results => results.filter(Boolean) as Player[])
  }
  
  async function recordTurn(throwScores: number[]): Promise<void> {
    if (!currentGame.value) throw new Error('No active game')
    
    const game = currentGame.value
    const playerId = game.playerIds[game.currentPlayerIndex]
    const playerScore = game.scores.find(s => s.playerId === playerId)!
    
    const totalScore = throwScores.reduce((sum, s) => sum + s, 0)
    const newScore = calculateScore(playerScore.currentScore, throwScores)
    const bustDetected = isBust(playerScore.currentScore, throwScores)
    
    // For MVP, we don't track per-dart details for double detection
    // Assume user indicates if last dart was double (or add a checkbox)
    // Simplified: If newScore === 0, assume it's a valid double-out
    const lastIsDouble = newScore === 0 // MVP assumption
    const winDetected = isWin(playerScore.currentScore, throwScores, lastIsDouble)
    
    // Create turn record
    const turn: Turn = {
      id: uuid(),
      playerId,
      round: game.currentRound,
      throws: throwScores.map(score => ({
        score,
        multiplier: 1, // MVP: not tracking this
        section: 0     // MVP: not tracking this
      })),
      totalScore,
      remainingAfter: bustDetected ? playerScore.currentScore : newScore,
      isBust: bustDetected,
      isWin: winDetected,
      timestamp: new Date()
    }
    
    // Update game state
    game.turns.push(turn)
    
    if (!bustDetected) {
      playerScore.currentScore = newScore
    }
    
    playerScore.dartsThrown += throwScores.length
    
    if (winDetected) {
      game.status = 'completed'
      game.winnerId = playerId
      game.completedAt = new Date()
      
      // Update winner stats
      await updateWinnerStats(playerId, game)
    } else {
      // Move to next player
      game.currentPlayerIndex = (game.currentPlayerIndex + 1) % game.playerIds.length
      
      // Increment round if back to first player
      if (game.currentPlayerIndex === 0) {
        game.currentRound++
      }
    }
    
    game.updatedAt = new Date()
    await db.updateGame(game.id, game)
    currentGame.value = { ...game } // Trigger reactivity
  }
  
  async function undoLastTurn(): Promise<void> {
    if (!currentGame.value || !canUndo.value) return
    
    const game = currentGame.value
    const lastTurn = game.turns.pop()!
    
    // Revert player score
    const playerScore = game.scores.find(s => s.playerId === lastTurn.playerId)!
    playerScore.currentScore = playerScore.currentScore + lastTurn.totalScore
    playerScore.dartsThrown -= lastTurn.throws.length
    
    // Revert player index
    game.currentPlayerIndex = (game.currentPlayerIndex - 1 + game.playerIds.length) % game.playerIds.length
    
    // Revert round if needed
    if (game.currentPlayerIndex === game.playerIds.length - 1) {
      game.currentRound = Math.max(1, game.currentRound - 1)
    }
    
    game.updatedAt = new Date()
    await db.updateGame(game.id, game)
    currentGame.value = { ...game }
  }
  
  async function endGame(status: 'completed' | 'abandoned'): Promise<void> {
    if (!currentGame.value) return
    
    currentGame.value.status = status
    currentGame.value.completedAt = new Date()
    currentGame.value.updatedAt = new Date()
    
    await db.updateGame(currentGame.value.id, currentGame.value)
  }
  
  async function updateWinnerStats(playerId: string, game: Game): Promise<void> {
    const player = await db.getPlayer(playerId)
    if (!player) return
    
    const playerTurns = game.turns.filter(t => t.playerId === playerId)
    const totalScore = playerTurns.reduce((sum, t) => t.totalScore, 0)
    const avgScore = totalScore / playerTurns.length
    const highestScore = Math.max(...playerTurns.map(t => t.totalScore))
    
    player.stats.gamesPlayed++
    player.stats.gamesWon++
    player.stats.totalDartsThrown += playerTurns.reduce((sum, t) => t.throws.length, 0)
    player.stats.averageScore = (player.stats.averageScore * (player.stats.gamesPlayed - 1) + avgScore) / player.stats.gamesPlayed
    player.stats.highestScore = Math.max(player.stats.highestScore, highestScore)
    
    await db.updatePlayer(playerId, player)
  }
  
  function getPlayerScore(playerId: string) {
    return computed(() => {
      if (!currentGame.value) return 501
      const score = currentGame.value.scores.find(s => s.playerId === playerId)
      return score?.currentScore ?? 501
    })
  }
  
  const getCurrentRound = computed(() => currentGame.value?.currentRound ?? 1)
  const getTurnHistory = computed(() => currentGame.value?.turns ?? [])
  
  return {
    currentGame,
    currentPlayer,
    canUndo,
    startNewGame,
    loadGame,
    recordTurn,
    undoLastTurn,
    endGame,
    getPlayerScore,
    getCurrentRound,
    getTurnHistory
  }
}
```

#### Tests to Write:
- `tests/integration/game-flow.test.ts`
  - Test full game flow: start → turns → win
  - Test bust handling (score unchanged)
  - Test undo functionality
  - Test game completion and stats update
  - Test multi-player rotation

#### Acceptance Criteria:
- [ ] Can start new game with players
- [ ] Turns are recorded correctly
- [ ] Player rotation works
- [ ] Bust detection prevents score change
- [ ] Win detection ends game
- [ ] Undo reverts last turn
- [ ] Stats are updated on win
- [ ] All integration tests pass

---

### Phase 5: Game UI Components
**Estimated Time**: 10-12 hours

#### Files to Create:
1. **Components** (Vue SFCs with Composition API):
   - `src/components/game/GameBoard.vue`
   - `src/components/game/ScoreDisplay.vue`
   - `src/components/game/ScoreEntry.vue`
   - `src/components/game/CheckoutSuggestion.vue`
   - `src/components/game/TurnHistory.vue`

2. **View**: `src/views/GameView.vue`

#### ScoreEntry Component Details (Vue SFC):

**File**: `src/components/game/ScoreEntry.vue`

```vue
<template>
  <div class="score-entry card">
    <h3>{{ currentPlayer.name }}'s Turn</h3>
    <p>Current Score: {{ currentScore }}</p>
    
    <!-- Text input with slang support -->
    <input 
      type="text" 
      v-model="scoreInput"
      @input="handleSlangParse"
      placeholder="Enter score or slang (e.g., 'ton 80')"
    />
    
    <!-- Slang shortcut buttons (based on final dictionary) -->
    <div class="slang-shortcuts">
      <button class="btn btn-sm btn-color-secondary" @click="applySlang('breakfast')">
        Breakfast (26)
      </button>
      <button class="btn btn-sm btn-color-secondary" @click="applySlang('tops')">
        Tops (40)
      </button>
      <button class="btn btn-sm btn-color-secondary" @click="applySlang('ton')">
        Ton (100)
      </button>
      <button class="btn btn-sm btn-color-secondary" @click="applySlang('shanghai')">
        Shanghai (120)
      </button>
      <button class="btn btn-sm btn-color-secondary" @click="applySlang('ton-80')">
        Ton-80 (180)
      </button>
    </div>
    
    <!-- Number pad (optional, for touch devices) -->
    <div class="number-pad">
      <button 
        v-for="n in [7, 8, 9, 4, 5, 6, 1, 2, 3, 0]" 
        :key="n"
        class="btn btn-lg"
        @click="appendNumber(n)"
      >
        {{ n }}
      </button>
      <button class="btn btn-lg btn-color-error" @click="clear">Clear</button>
    </div>
    
    <!-- Validation feedback -->
    <div v-if="validationError" class="text-error">
      {{ validationError }}
    </div>
    
    <!-- Bust warning -->
    <div v-if="wouldBust" class="text-error">
      ⚠️ This would BUST! Score would be {{ projectedScore }}
    </div>
    
    <!-- Submit button -->
    <button 
      class="btn btn-primary btn-block btn-lg"
      :disabled="!isValid"
      @click="submitScore"
    >
      Submit Score
    </button>
    
    <!-- Undo button -->
    <button 
      v-if="canUndo"
      class="btn btn-secondary btn-block"
      @click="undo"
    >
      Undo Last Turn
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGame } from '../../composables/useGame'
import { useSlang } from '../../composables/useSlang'
import { useScoring } from '../../composables/useScoring'

defineProps<{
  playerId: string
  currentScore: number
  mode?: 'per-dart' | 'sum'
}>()

const game = useGame()
const slang = useSlang()
const scoring = useScoring()

const scoreInput = ref('')
const parsedScore = ref<number | null>(null)

const currentScore = computed(() => 
  game.currentPlayer.value 
    ? game.getPlayerScore(game.currentPlayer.value.id).value 
    : 501
)

function handleSlangParse() {
  const result = slang.parseSlang(scoreInput.value)
  parsedScore.value = result
}

function applySlang(term: string) {
  const value = slang.parseSlang(term)
  if (value !== null) {
    scoreInput.value = value.toString()
    parsedScore.value = value
  }
}

function appendNumber(n: number) {
  scoreInput.value += n.toString()
  handleSlangParse()
}

function clear() {
  scoreInput.value = ''
  parsedScore.value = null
}

const validationError = computed(() => {
  if (!scoreInput.value) return null
  if (parsedScore.value === null) return 'Invalid input'
  if (parsedScore.value < 0 || parsedScore.value > 180) return 'Score must be 0-180'
  return null
})

const wouldBust = computed(() => {
  if (parsedScore.value === null) return false
  return scoring.isBust(currentScore.value, [parsedScore.value])
})

const projectedScore = computed(() => {
  if (parsedScore.value === null) return currentScore.value
  return currentScore.value - parsedScore.value
})

const isValid = computed(() => {
  return parsedScore.value !== null && !validationError.value
})

async function submitScore() {
  if (!isValid.value || parsedScore.value === null) return
  
  // For MVP sum mode: Record as single "throw" (simplification)
  await game.recordTurn([parsedScore.value])
  
  // Clear input
  clear()
}

async function undo() {
  await game.undoLastTurn()
}
</script>

<style scoped>
/* Component-specific styles using unicorn-lib tokens */
.score-entry {
  /* Styles will use unicorn-lib design tokens and classes */
}

.slang-shortcuts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: var(--spacing-sm);
}

.number-pad {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-xs);
}
</style>
```

#### CSS Approach for Other Components:
- **GameBoard**: Flexbox/Grid layout
  - Mobile: Stack vertically
  - Tablet+: Side-by-side sections
  
- **ScoreDisplay**: Large, prominent numbers
  - Use typography tokens from unicorn-lib
  - Color-code by player (use semantic colors)
  - Animate score changes (CSS transitions)
  
- **CheckoutSuggestion**: 
  - `.card` with `.card-color-info` variant
  - Icon for lightbulb/suggestion
  
- **TurnHistory**: 
  - Scrollable list (max-height with overflow)
  - Alternating row colors for readability

All components use Vue 3 SFC format with `<script setup lang="ts">` and scoped styles.

#### Acceptance Criteria:
- [ ] Game board displays all components correctly
- [ ] Score entry works with text, number pad, and shortcuts
- [ ] Slang terms are parsed correctly
- [ ] Bust detection warns user before submission
- [ ] Submit updates game state and UI
- [ ] Undo reverts last turn
- [ ] Checkout suggestions appear at correct times
- [ ] Turn history shows recent turns
- [ ] Responsive design works on mobile and desktop
- [ ] All interactions are keyboard accessible

---

### Phase 6: Navigation & History
**Estimated Time**: 6-8 hours

#### Files to Create:
1. **Router**: `src/router/index.ts`
   - Define routes
   - Navigation guards

2. **Layout Components** (Vue SFCs):
   - `src/components/layout/AppLayout.vue`
   - `src/components/layout/Navigation.vue`

3. **Views** (Vue SFCs):
   - `src/views/HomeView.vue` - Landing page with "New Game" and "Resume Game"
   - `src/views/HistoryView.vue` - Game history list

4. **History Components** (Vue SFCs):
   - `src/components/history/GameHistory.vue`
   - `src/components/history/GameDetail.vue`

#### Router Setup:
```typescript
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('../views/HomeView') },
  { path: '/players', name: 'players', component: () => import('../views/PlayersView') },
  { path: '/game/new', name: 'new-game', component: () => import('../views/NewGameView') },
  { path: '/game/:id', name: 'game', component: () => import('../views/GameView') },
  { path: '/history', name: 'history', component: () => import('../views/HistoryView') },
  { path: '/history/:id', name: 'game-detail', component: () => import('../views/GameDetailView') },
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
```

#### HomeView Features:
- Check for in-progress games
- Show "Resume Game" button if exists
- Show "New Game" button
- Show quick stats (total games, favorite player, etc.)

#### GameHistory Features:
- Fetch all games with status 'completed'
- Sort by date (most recent first)
- Display cards with:
  - Date/time
  - Players (with avatars)
  - Winner highlighted
  - Total rounds
  - Click to view details

#### GameDetail Features:
- Full turn-by-turn breakdown
- Stats per player:
  - Average score per turn
  - Highest turn
  - Total darts thrown
  - Checkout attempts
- Graph/chart (optional for MVP, can add later)

#### Acceptance Criteria:
- [ ] All routes navigate correctly
- [ ] Home view shows correct state (resume/new)
- [ ] History list displays all completed games
- [ ] Game detail shows full history
- [ ] Navigation bar works on all pages
- [ ] Back button works correctly

---

### Phase 7: Polish & Testing
**Estimated Time**: 6-8 hours

#### Tasks:
1. **Add Win Animation**:
   - Confetti effect or celebration modal
   - Display winner name and stats

2. **Add Loading States**:
   - Spinner when fetching from DB
   - Skeleton loaders for lists

3. **Error Handling**:
   - Toast notifications for errors
   - Fallback UI for missing data

4. **Accessibility Audit**:
   - Check all keyboard navigation
   - Add ARIA labels where needed
   - Test with screen reader

5. **Mobile Optimization**:
   - Test on various screen sizes
   - Optimize touch targets (min 44x44px)
   - Add pull-to-refresh for history (optional)

6. **Dark Theme Support**:
   - Ensure all components work in dark mode
   - Add theme toggle in navigation

7. **Performance**:
   - Lazy-load routes
   - Optimize images (compress player avatars)
   - Add service worker for offline support (optional)

8. **Final Testing**:
   - Manual testing of full game flow
   - Edge case testing (1 player, 4 players, quick win, long game)
   - Cross-browser testing

9. **Documentation**:
   - Update README with:
     - How to install and run
     - How to play
     - Screenshots
     - Roadmap for future features

#### Acceptance Criteria:
- [ ] Win screen looks great
- [ ] All loading states work
- [ ] Errors are handled gracefully
- [ ] Accessible to keyboard and screen reader users
- [ ] Works on mobile, tablet, desktop
- [ ] Dark theme works correctly
- [ ] Performance is smooth (no lag)
- [ ] README is complete

---

## Testing Strategy

### Unit Tests (Vitest)

#### High Priority (Must Have):
1. **Scoring Logic** (`scoring.test.ts`):
   - Test all score calculations
   - Test bust detection edge cases
   - Test win detection (with double-out)
   - **Why critical**: Core game logic; errors here break the game

2. **Validation** (`validation.test.ts`):
   - Test throw range validation (0-60)
   - Test turn validation (1-3 throws, sum ≤ 180)
   - Test bogey number detection

3. **Slang Parser** (`slang.test.ts`):
   - Test all dictionary entries
   - Test case insensitivity
   - Test invalid inputs

4. **Database Operations** (`database.test.ts`):
   - Test CRUD for players and games
   - Test IndexedDB initialization
   - Use `fake-indexeddb` for mocking

#### Medium Priority (Should Have):
5. **Checkout Suggestions** (`checkout.test.ts`):
   - Test suggestion accuracy
   - Test bogey detection

6. **Game State Management** (`useGame.test.ts`):
   - Test game lifecycle
   - Test turn recording
   - Test undo

#### Low Priority (Nice to Have):
7. **Component Tests**:
   - Test ScoreEntry component logic
   - Test form validation in PlayerForm
   - (UI tests less critical for MVP)

### Integration Tests

1. **Full Game Flow** (`game-flow.test.ts`):
   - Start game → record turns → handle bust → win
   - Test multi-player rotation
   - Test stats update on win

### Test Coverage Goals:
- **Scoring/Validation**: 100% coverage (critical)
- **Composables**: 80%+ coverage
- **Components**: 60%+ coverage (focus on logic, not rendering)

### Testing Tools:
- **Vitest 8**: Test runner
- **@vue/test-utils**: Component testing
- **fake-indexeddb**: Mock IndexedDB
- **happy-dom** or **jsdom**: DOM environment

---

## Key Technical Decisions

### 1. Score Entry Mode: Sum vs. Per-Dart

**Decision**: Start with **Sum Mode** only.

**Rationale**:
- Faster input (1 entry per turn vs. 3)
- Simpler validation
- Easier to implement slang shortcuts
- Per-Dart mode can be added in Phase 3 as enhancement

**Trade-off**:
- Less granular data (can't track individual dart scores for MVP)
- Can't detect bust mid-turn (must enter full turn score)
- Solution: Add checkbox "Last dart was double" for win detection

**Future Enhancement**:
- Add toggle in ScoreEntry: "Per-Dart Mode"
- Track individual throws for better stats

---

### 2. Double-Out Detection

**Decision**: For MVP, assume user correctly enters scores. Add simple validation for win (score must be exactly 0).

**Rationale**:
- Full double tracking requires per-dart entry and multiplier tracking
- Too complex for MVP
- Users playing physical darts know the rules

**MVP Implementation**:
- When score reaches 0, assume it's a valid double
- Add checkbox: "Finished with double" (optional enhancement)

**Future Enhancement**:
- Per-dart mode with multiplier tracking
- Enforce double-out rule in validation

---

### 3. Data Persistence: IndexedDB

**Decision**: Use **IndexedDB** for all data storage.

**Rationale**:
- Browser-native (no backend needed)
- Works offline
- Good performance for structured data
- Supports indexes for efficient queries

**Alternative Considered**: localStorage
- Rejected: Too limited (5-10MB), no querying, no structure

**Implementation**:
- Wrapper composable (`useDatabase`) for type safety
- Schema versioning for future migrations

---

### 4. State Management: Composables vs. Pinia

**Decision**: Use **Vue Composables** (Composition API) without Pinia.

**Rationale**:
- Simpler for small app
- Composition API provides reactive state
- No need for global store yet
- Easier to test

**When to switch to Pinia**:
- If app grows significantly (more complex features)
- If multiple views need same state
- If undo/redo across views is needed

---

### 5. Undo Functionality

**Decision**: Support **undo for last turn only**, within current session.

**Rationale**:
- Simple to implement (pop last turn from array)
- Covers most common use case (mistake on current turn)
- No need for full history stack

**Limitation**:
- Can't undo after closing app (turns are persisted)
- Can't undo multiple turns back

**Future Enhancement**:
- Full undo/redo stack with command pattern
- Persistent undo history

---

### 6. Real-Time Score Updates

**Decision**: Instant local updates, no animations/delays.

**Rationale**:
- Users expect immediate feedback
- No network latency (local DB)
- Simple implementation

**Enhancement**:
- Add CSS transitions for score changes (fade in/out)
- Animate score display with counting effect

---

### 7. Mobile Responsiveness Strategy

**Decision**: **Mobile-first design** with breakpoints.

**Rationale**:
- Likely primary use case (tablet/phone while playing darts)
- Easier to scale up than down
- Touch-friendly buttons

**Breakpoints**:
- Mobile: < 768px (stack vertically)
- Tablet: 768px - 1024px (side-by-side where space allows)
- Desktop: > 1024px (full layout with sidebars)

**Touch Targets**:
- Minimum 44x44px (Apple HIG)
- Number pad buttons: Large and spaced

---

### 8. Image Storage: Hard-Coded vs. Upload

**Decision**: **Hard-coded images** for MVP, plan for upload later.

**Rationale**:
- MVP: Faster to implement (no file upload, no storage)
- Provides variety (10-20 avatar options)
- Users can still personalize by choosing avatar

**Future Enhancement**:
- Allow camera capture or file upload
- Store in IndexedDB as base64 or use FileSystem API
- Add image cropping UI

---

### 9. Checkout Suggestions: Simple vs. AI

**Decision**: **Hardcoded lookup table** for common checkouts.

**Rationale**:
- MVP: Fast and reliable
- No need for complex algorithm
- Most checkouts are well-known combinations

**Coverage**:
- All single-dart finishes (doubles ≤ 40)
- Common 2-dart and 3-dart finishes (lookup table)
- Fallback: Generic suggestion ("Score X, then double Y")

**Future Enhancement**:
- Full checkout calculator with all possible paths
- Probability scoring based on player skill level

---

### 10. Validation: Client-Side Only

**Decision**: All validation happens **client-side** (no backend).

**Rationale**:
- No backend in MVP
- Users are trusted (playing physical game)
- Validation for UX, not security

**Validation Rules**:
- Score per turn: 0-180
- No negative scores
- No score of 1 (impossible to finish)
- Bust: Revert to start of turn

---

### 11. Player Stats: Basic vs. Advanced

**Decision**: **Basic stats** for MVP (games played/won, average score).

**Rationale**:
- Simple to calculate
- Most valuable metrics
- Advanced stats require per-dart tracking

**MVP Stats**:
- Games played
- Games won
- Total darts thrown
- Average score per turn
- Highest turn score

**Future Stats** (require per-dart tracking):
- Doubles hit rate
- Triples hit rate
- Favorite number
- Checkout percentage
- Average darts per game

---

## Summary

### Total Estimated Time: 48-62 hours

### Phase Breakdown:
1. **Setup & Infrastructure**: 4-6 hours
2. **Player Management**: 6-8 hours
3. **Core Scoring Logic**: 8-10 hours
4. **Game State Management**: 8-10 hours
5. **Game UI Components**: 10-12 hours
6. **Navigation & History**: 6-8 hours
7. **Polish & Testing**: 6-8 hours

### Critical Path:
1. Setup → Database → Types
2. Scoring logic → Tests (MUST be 100% correct)
3. Game state management → Integration tests
4. UI components → Game flow
5. Polish → Launch

### Success Criteria:
- [ ] Can create and manage players
- [ ] Can start a 501 game with 1-4 players
- [ ] Can enter scores (sum mode) with slang support
- [ ] Bust detection works correctly
- [ ] Win detection works correctly
- [ ] Game history is saved and viewable
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Dark theme supported
- [ ] Accessible (keyboard + screen reader)
- [ ] 80%+ test coverage on critical logic
- [ ] No major bugs in manual testing

### Future Roadmap (Post-MVP):
- [ ] Per-dart entry mode with multiplier tracking
- [ ] Full double-out enforcement
- [ ] 301 game mode
- [ ] Cricket game mode
- [ ] Player image upload from device
- [ ] Advanced stats and charts
- [ ] Multiplayer over network (WebRTC/WebSockets)
- [ ] Tournament mode
- [ ] Practice mode with AI opponent
- [ ] Elo rating system
- [ ] Social features (share game results)
- [ ] PWA with offline support and install prompt
- [ ] Customizable slang dictionary

---

## Next Steps

1. **Review this plan** with stakeholders
2. **Approve architecture decisions**
3. **Set up development environment**
4. **Begin Phase 1: Project Setup**

---

**Plan Version**: 1.0  
**Created**: 2026-06-01  
**Author**: Claude (Planner Agent)
