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

/**
 * Parse slang term or numeric input into score
 */
export function parseSlang(input: string): number | null {
  if (!input) return null

  const normalized = input.toLowerCase().trim()

  // Check exact match in dictionary
  if (SLANG_DICTIONARY[normalized] !== undefined) {
    return SLANG_DICTIONARY[normalized]
  }

  // Check if it's a number
  const num = parseInt(normalized, 10)
  if (!isNaN(num) && num >= 0 && num <= 180) {
    return num
  }

  return null
}

/**
 * Get slang terms for a given score
 */
export function getSlangForScore(score: number): string[] {
  const matches: string[] = []
  for (const [term, value] of Object.entries(SLANG_DICTIONARY)) {
    if (value === score) matches.push(term)
  }
  return matches
}

/**
 * Get all available slang terms with their values
 */
export function getAllSlang(): Array<{ term: string; value: number }> {
  // Return unique values only (one term per value)
  const seen = new Set<number>()
  const result: Array<{ term: string; value: number }> = []

  const terms = [
    ['madhouse', 2],
    ['breakfast', 26],
    ['basement', 38],
    ['tops', 40],
    ['baby ton', 95],
    ['ton', 100],
    ['nelson', 111],
    ['shanghai', 120],
    ['ton-80', 180],
  ] as const

  for (const [term, value] of terms) {
    if (!seen.has(value)) {
      result.push({ term, value })
      seen.add(value)
    }
  }

  return result
}
