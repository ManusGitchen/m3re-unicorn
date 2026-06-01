import { describe, it, expect } from 'vitest'
import { parseSlang, getSlangForScore, getAllSlang } from '@/utils/slang'

describe('slang', () => {
  describe('parseSlang', () => {
    it('should parse all dictionary entries', () => {
      expect(parseSlang('madhouse')).toBe(2)
      expect(parseSlang('breakfast')).toBe(26)
      expect(parseSlang('basement')).toBe(38)
      expect(parseSlang('tops')).toBe(40)
      expect(parseSlang('baby ton')).toBe(95)
      expect(parseSlang('ton')).toBe(100)
      expect(parseSlang('nelson')).toBe(111)
      expect(parseSlang('shanghai')).toBe(120)
      expect(parseSlang('ton-80')).toBe(180)
    })

    it('should be case insensitive', () => {
      expect(parseSlang('MADHOUSE')).toBe(2)
      expect(parseSlang('MadHouse')).toBe(2)
      expect(parseSlang('TON-80')).toBe(180)
      expect(parseSlang('Ton 80')).toBe(180) // Should work with space
    })

    it('should parse numeric input', () => {
      expect(parseSlang('0')).toBe(0)
      expect(parseSlang('60')).toBe(60)
      expect(parseSlang('180')).toBe(180)
      expect(parseSlang('100')).toBe(100)
    })

    it('should return null for invalid inputs', () => {
      expect(parseSlang('')).toBe(null)
      expect(parseSlang('invalid')).toBe(null)
      expect(parseSlang('181')).toBe(null)
      expect(parseSlang('-1')).toBe(null)
      expect(parseSlang('abc')).toBe(null)
    })

    it('should handle whitespace', () => {
      expect(parseSlang('  madhouse  ')).toBe(2)
      expect(parseSlang('  100  ')).toBe(100)
    })

    it('should handle alternative ton-80 formats', () => {
      expect(parseSlang('ton-80')).toBe(180)
      expect(parseSlang('ton 80')).toBe(180)
      expect(parseSlang('t80')).toBe(180)
    })
  })

  describe('getSlangForScore', () => {
    it('should return slang terms for a score', () => {
      const terms = getSlangForScore(180)
      expect(terms).toContain('ton-80')
      expect(terms.length).toBeGreaterThan(0)
    })

    it('should return empty array for score with no slang', () => {
      expect(getSlangForScore(50)).toEqual([])
      expect(getSlangForScore(75)).toEqual([])
    })

    it('should return all matches for a score', () => {
      const terms = getSlangForScore(180)
      expect(terms).toContain('ton-80')
      expect(terms).toContain('ton 80')
      expect(terms).toContain('t80')
    })
  })

  describe('getAllSlang', () => {
    it('should return all slang terms', () => {
      const allSlang = getAllSlang()
      expect(allSlang.length).toBeGreaterThan(0)
      expect(allSlang.every(entry => entry.term && typeof entry.value === 'number')).toBe(true)
    })

    it('should return unique values', () => {
      const allSlang = getAllSlang()
      const values = allSlang.map(entry => entry.value)
      const uniqueValues = new Set(values)
      expect(values.length).toBe(uniqueValues.size)
    })

    it('should include expected entries', () => {
      const allSlang = getAllSlang()
      const terms = allSlang.map(entry => entry.term)
      expect(terms).toContain('madhouse')
      expect(terms).toContain('ton-80')
      expect(terms).toContain('ton')
    })
  })
})
