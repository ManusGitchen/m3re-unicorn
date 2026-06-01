export type GameStatus = 'in-progress' | 'completed' | 'abandoned'

export interface Game {
  id: string
  startingScore: number
  playerIds: string[]
  status: GameStatus
  currentPlayerIndex: number
  currentRound: number
  scores: GameScore[]
  turns: Turn[]
  winnerId?: string
  createdAt: Date
  updatedAt: Date
  completedAt?: Date
}

export interface GameScore {
  playerId: string
  currentScore: number
  dartsThrown: number
}

export interface Turn {
  id: string
  playerId: string
  round: number
  throws: ThrowScore[]
  totalScore: number
  remainingAfter: number
  isBust: boolean
  isWin: boolean
  timestamp: Date
}

export interface ThrowScore {
  score: number
  multiplier: number
  section: number
}
