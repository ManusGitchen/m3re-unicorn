import { describe, it, expect } from 'vitest'
import { getCheckoutSuggestions, isBogey } from '@/utils/checkout'

describe('checkout', () => {
  describe('isBogey', () => {
    it('should return true for bogey numbers', () => {
      expect(isBogey(169)).toBe(true)
      expect(isBogey(168)).toBe(true)
      expect(isBogey(166)).toBe(true)
      expect(isBogey(165)).toBe(true)
      expect(isBogey(163)).toBe(true)
      expect(isBogey(162)).toBe(true)
      expect(isBogey(159)).toBe(true)
    })

    it('should return false for non-bogey numbers', () => {
      expect(isBogey(170)).toBe(false)
      expect(isBogey(100)).toBe(false)
      expect(isBogey(50)).toBe(false)
    })
  })

  describe('getCheckoutSuggestions', () => {
    it('should return single-dart finishes for even numbers <= 40', () => {
      const suggestions = getCheckoutSuggestions(40)
      expect(suggestions.length).toBeGreaterThan(0)
      expect(suggestions[0].description).toBe('Double-20')
      expect(suggestions[0].path).toEqual(['D20'])
      expect(suggestions[0].score).toBe(40)
    })

    it('should return double suggestions for valid targets', () => {
      const suggestions2 = getCheckoutSuggestions(2)
      expect(suggestions2[0].description).toBe('Double-1')
      expect(suggestions2[0].path).toEqual(['D1'])

      const suggestions20 = getCheckoutSuggestions(20)
      expect(suggestions20[0].description).toBe('Double-10')
      expect(suggestions20[0].path).toEqual(['D10'])
    })

    it('should return bull finish for 50', () => {
      const suggestions = getCheckoutSuggestions(50)
      expect(suggestions.some(s => s.description === 'Bull' && s.path.includes('Bull'))).toBe(true)
    })

    it('should return two-dart checkouts for common scores', () => {
      const suggestions100 = getCheckoutSuggestions(100)
      expect(suggestions100.some(s => s.description === 'T20, D20')).toBe(true)

      const suggestions70 = getCheckoutSuggestions(70)
      expect(suggestions70.some(s => s.description === 'T10, D20')).toBe(true)

      const suggestions80 = getCheckoutSuggestions(80)
      expect(suggestions80.some(s => s.description === 'T20, D10')).toBe(true)

      const suggestions90 = getCheckoutSuggestions(90)
      expect(suggestions90.some(s => s.description === 'T20, D15')).toBe(true)

      const suggestions110 = getCheckoutSuggestions(110)
      expect(suggestions110.some(s => s.description === 'T20, Bull')).toBe(true)
    })

    it('should return generic suggestion for larger scores', () => {
      const suggestions = getCheckoutSuggestions(120)
      expect(suggestions.length).toBeGreaterThan(0)
      // Should suggest a path that gets to a double
      expect(suggestions[0].path.length).toBeGreaterThan(0)
    })

    it('should return empty array for impossible checkouts', () => {
      const suggestions1 = getCheckoutSuggestions(1)
      expect(suggestions1).toEqual([])

      const suggestions180 = getCheckoutSuggestions(180)
      expect(suggestions180).toEqual([])
    })

    it('should include score in each suggestion', () => {
      const suggestions = getCheckoutSuggestions(40)
      expect(suggestions.every(s => s.score === 40)).toBe(true)
    })

    it('should have valid structure', () => {
      const suggestions = getCheckoutSuggestions(100)
      suggestions.forEach(s => {
        expect(s).toHaveProperty('description')
        expect(s).toHaveProperty('path')
        expect(s).toHaveProperty('score')
        expect(Array.isArray(s.path)).toBe(true)
      })
    })
  })
})
