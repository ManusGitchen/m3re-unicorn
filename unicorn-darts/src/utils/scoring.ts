/**
 * Calculate new score after throws
 */
export function calculateScore(current: number, throws: number[]): number {
  const total = throws.reduce((sum, t) => sum + t, 0)
  return current - total
}

/**
 * Check if turn results in bust
 * Bust conditions: score < 0 or score === 1
 * Note: score === 0 without a double is checked separately in isWin
 */
export function isBust(current: number, throws: number[]): boolean {
  const newScore = calculateScore(current, throws)
  return newScore < 0 || newScore === 1
}

/**
 * Check if turn is a winning turn
 * Must reach exactly 0 with last dart being a double
 */
export function isWin(current: number, throws: number[], lastIsDouble: boolean): boolean {
  const newScore = calculateScore(current, throws)
  return newScore === 0 && lastIsDouble
}

/**
 * Validate individual throw (0-60 range)
 */
export function isValidThrow(score: number): boolean {
  return Number.isInteger(score) && score >= 0 && score <= 60
}

/**
 * Validate entire turn (1-3 throws, sum ≤ 180)
 */
export function isValidTurn(throws: number[]): boolean {
  if (throws.length === 0 || throws.length > 3) return false
  const sum = throws.reduce((a, b) => a + b, 0)
  return sum >= 0 && sum <= 180 && throws.every(isValidThrow)
}
