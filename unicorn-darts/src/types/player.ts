export interface Player {
  id: string
  name: string
  imageUrl: string
  stats: PlayerStats
  createdAt: Date
  updatedAt: Date
}

export interface PlayerStats {
  gamesPlayed: number
  gamesWon: number
  totalDartsThrown: number
  averageScore: number
  highestScore: number
  checkoutRate: number
  favorite180s: number
}
