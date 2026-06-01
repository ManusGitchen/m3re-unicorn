import { describe, it, expect } from 'vitest'
import { calculateScore, isBust, isWin, isValidThrow, isValidTurn } from '@/utils/scoring'

describe('scoring', () => {
  describe('calculateScore', () => {
    it('should subtract throws from current score', () => {
      expect(calculateScore(501, [60, 60, 60])).toBe(321)
      expect(calculateScore(100, [20, 20, 20])).toBe(40)
      expect(calculateScore(50, [50])).toBe(0)
    })

    it('should handle single throw', () => {
      expect(calculateScore(501, [180])).toBe(321)
    })

    it('should handle empty throws', () => {
      expect(calculateScore(501, [])).toBe(501)
    })
  })

  describe('isBust', () => {
    it('should return true when score goes negative', () => {
      expect(isBust(40, [50])).toBe(true)
      expect(isBust(100, [101])).toBe(true)
    })

    it('should return true when score equals 1', () => {
      expect(isBust(41, [40])).toBe(true)
      expect(isBust(50, [49])).toBe(true)
    })

    it('should return false for valid scores', () => {
      expect(isBust(100, [50])).toBe(false)
      expect(isBust(50, [25])).toBe(false)
      expect(isBust(40, [40])).toBe(false) // Exactly 0 is not a bust
    })

    it('should return false when reaching exactly 0', () => {
      expect(isBust(40, [40])).toBe(false)
    })
  })

  describe('isWin', () => {
    it('should return true when reaching 0 with double', () => {
      expect(isWin(40, [40], true)).toBe(true)
      expect(isWin(32, [32], true)).toBe(true)
    })

    it('should return false when reaching 0 without double', () => {
      expect(isWin(40, [40], false)).toBe(false)
    })

    it('should return false when not reaching 0', () => {
      expect(isWin(40, [20], true)).toBe(false)
      expect(isWin(100, [50], true)).toBe(false)
    })

    it('should return false for bust conditions', () => {
      expect(isWin(40, [50], true)).toBe(false) // Would go negative
      expect(isWin(41, [40], true)).toBe(false) // Would equal 1
    })
  })

  describe('isValidThrow', () => {
    it('should return true for valid throws (0-60)', () => {
      expect(isValidThrow(0)).toBe(true)
      expect(isValidThrow(20)).toBe(true)
      expect(isValidThrow(60)).toBe(true)
    })

    it('should return false for invalid throws', () => {
      expect(isValidThrow(-1)).toBe(false)
      expect(isValidThrow(61)).toBe(false)
      expect(isValidThrow(100)).toBe(false)
    })

    it('should return false for non-integers', () => {
      expect(isValidThrow(20.5)).toBe(false)
    })
  })

  describe('isValidTurn', () => {
    it('should return true for valid turns', () => {
      expect(isValidTurn([60, 60, 60])).toBe(true)
      expect(isValidTurn([20, 20])).toBe(true)
      expect(isValidTurn([50])).toBe(true)
      expect(isValidTurn([0, 0, 0])).toBe(true)
    })

    it('should return false for empty turns', () => {
      expect(isValidTurn([])).toBe(false)
    })

    it('should return false for too many throws', () => {
      expect(isValidTurn([20, 20, 20, 20])).toBe(false)
    })

    it('should return false when sum exceeds 180', () => {
      expect(isValidTurn([180, 1])).toBe(false)
    })

    it('should return false for invalid individual throws', () => {
      expect(isValidTurn([61])).toBe(false)
      expect(isValidTurn([20, -1])).toBe(false)
    })
  })
})
