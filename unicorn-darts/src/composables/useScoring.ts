import { calculateScore, isBust, isWin, isValidThrow, isValidTurn } from '@/utils/scoring'
import { canCheckout, isBogeyNumber } from '@/utils/validation'

export function useScoring() {
  return {
    calculateScore,
    isBust,
    isWin,
    isValidThrow,
    isValidTurn,
    canCheckout,
    isBogeyNumber
  }
}
