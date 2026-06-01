import type { Player } from './player'
import type { Game } from './game'

export interface DBSchema {
  players: Player
  games: Game
}
