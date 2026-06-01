export const BOGEY_NUMBERS = [169, 168, 166, 165, 163, 162, 159]

/**
 * Check if score is a bogey number (impossible to checkout)
 */
export function isBogeyNumber(score: number): boolean {
  return BOGEY_NUMBERS.includes(score)
}

/**
 * Validate score is in valid range for sum mode
 */
export function isValidSumScore(score: number): boolean {
  return Number.isInteger(score) && score >= 0 && score <= 180
}

/**
 * Check if checkout is theoretically possible
 */
export function canCheckout(score: number, dartsRemaining: number): boolean {
  if (score > 170) return false
  if (score === 0) return true
  if (score === 1) return false
  if (isBogeyNumber(score) && dartsRemaining < 3) return false

  // Single dart checkouts (even numbers ≤ 40)
  if (dartsRemaining >= 1 && score <= 40 && score % 2 === 0) return true

  // Bull (50)
  if (dartsRemaining >= 1 && score === 50) return true

  // Multi-dart checkouts (simplified)
  return score <= 170 && dartsRemaining >= 2
}
