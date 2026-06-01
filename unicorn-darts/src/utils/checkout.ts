export interface CheckoutSuggestion {
  description: string
  path: string[]
  score: number
}

/**
 * Get checkout suggestions for a given score
 */
export function getCheckoutSuggestions(score: number): CheckoutSuggestion[] {
  const suggestions: CheckoutSuggestion[] = []

  // Single-dart finishes (even numbers ≤ 40)
  if (score <= 40 && score % 2 === 0 && score > 0) {
    const doubleTarget = score / 2
    suggestions.push({
      description: `Double-${doubleTarget}`,
      path: [`D${doubleTarget}`],
      score
    })
  }

  // Bull finish (50)
  if (score === 50) {
    suggestions.push({
      description: 'Bull',
      path: ['Bull'],
      score: 50
    })
  }

  // Common two-dart finishes
  const twoDartCheckouts: Record<number, { description: string; path: string[] }> = {
    60: { description: '20, D20', path: ['20', 'D20'] },
    70: { description: 'T10, D20', path: ['T10', 'D20'] },
    80: { description: 'T20, D10', path: ['T20', 'D10'] },
    90: { description: 'T20, D15', path: ['T20', 'D15'] },
    100: { description: 'T20, D20', path: ['T20', 'D20'] },
    110: { description: 'T20, Bull', path: ['T20', 'Bull'] },
  }

  if (twoDartCheckouts[score]) {
    suggestions.push({
      ...twoDartCheckouts[score],
      score
    })
  }

  // Generic suggestion for larger scores
  if (suggestions.length === 0 && score > 40 && score <= 170) {
    // Try to find a valid setup - work backwards from common doubles
    const commonDoubles = [20, 18, 16, 10, 8] // D20=40, D18=36, D16=32, D10=20, D8=16

    for (const double of commonDoubles) {
      const doubleValue = double * 2
      const needed = score - doubleValue

      // Check if the needed score can be achieved with remaining darts (max 120 with 2 darts)
      if (needed > 0 && needed <= 120) {
        suggestions.push({
          description: `Score ${needed}, then D${double}`,
          path: [`${needed}`, `D${double}`],
          score
        })
        break
      }
    }
  }

  return suggestions
}

/**
 * Check if score is a bogey number
 */
export function isBogey(score: number): boolean {
  return [169, 168, 166, 165, 163, 162, 159].includes(score)
}
