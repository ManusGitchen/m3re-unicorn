import { describe, it, expect } from 'vitest'
import { isBogeyNumber, isValidSumScore, canCheckout, BOGEY_NUMBERS } from '@/utils/validation'

describe('validation', () => {
  describe('BOGEY_NUMBERS', () => {
    it('should contain expected bogey numbers', () => {
      expect(BOGEY_NUMBERS).toEqual([169, 168, 166, 165, 163, 162, 159])
    })
  })

  describe('isBogeyNumber', () => {
    it('should return true for bogey numbers', () => {
      expect(isBogeyNumber(169)).toBe(true)
      expect(isBogeyNumber(168)).toBe(true)
      expect(isBogeyNumber(166)).toBe(true)
      expect(isBogeyNumber(165)).toBe(true)
      expect(isBogeyNumber(163)).toBe(true)
      expect(isBogeyNumber(162)).toBe(true)
      expect(isBogeyNumber(159)).toBe(true)
    })

    it('should return false for non-bogey numbers', () => {
      expect(isBogeyNumber(170)).toBe(false)
      expect(isBogeyNumber(167)).toBe(false)
      expect(isBogeyNumber(100)).toBe(false)
      expect(isBogeyNumber(50)).toBe(false)
      expect(isBogeyNumber(0)).toBe(false)
    })
  })

  describe('isValidSumScore', () => {
    it('should return true for valid sum scores', () => {
      expect(isValidSumScore(0)).toBe(true)
      expect(isValidSumScore(60)).toBe(true)
      expect(isValidSumScore(180)).toBe(true)
      expect(isValidSumScore(100)).toBe(true)
    })

    it('should return false for invalid sum scores', () => {
      expect(isValidSumScore(-1)).toBe(false)
      expect(isValidSumScore(181)).toBe(false)
      expect(isValidSumScore(200)).toBe(false)
    })

    it('should return false for non-integers', () => {
      expect(isValidSumScore(50.5)).toBe(false)
    })
  })

  describe('canCheckout', () => {
    it('should return false for scores > 170', () => {
      expect(canCheckout(171, 3)).toBe(false)
      expect(canCheckout(180, 3)).toBe(false)
      expect(canCheckout(200, 3)).toBe(false)
    })

    it('should return true for score 0', () => {
      expect(canCheckout(0, 0)).toBe(true)
      expect(canCheckout(0, 1)).toBe(true)
      expect(canCheckout(0, 3)).toBe(true)
    })

    it('should return false for score 1', () => {
      expect(canCheckout(1, 1)).toBe(false)
      expect(canCheckout(1, 2)).toBe(false)
      expect(canCheckout(1, 3)).toBe(false)
    })

    it('should return false for bogey numbers with < 3 darts', () => {
      expect(canCheckout(169, 1)).toBe(false)
      expect(canCheckout(169, 2)).toBe(false)
      expect(canCheckout(168, 1)).toBe(false)
      expect(canCheckout(166, 2)).toBe(false)
    })

    it('should return true for bogey numbers with 3 darts', () => {
      expect(canCheckout(169, 3)).toBe(true)
      expect(canCheckout(168, 3)).toBe(true)
    })

    it('should return true for single dart checkouts (even numbers <= 40)', () => {
      expect(canCheckout(2, 1)).toBe(true)
      expect(canCheckout(20, 1)).toBe(true)
      expect(canCheckout(40, 1)).toBe(true)
    })

    it('should return false for odd numbers with single dart', () => {
      expect(canCheckout(3, 1)).toBe(false)
      expect(canCheckout(21, 1)).toBe(false)
      expect(canCheckout(39, 1)).toBe(false)
    })

    it('should return true for bull (50) with single dart', () => {
      expect(canCheckout(50, 1)).toBe(true)
    })

    it('should return true for scores <= 170 with 2+ darts', () => {
      expect(canCheckout(100, 2)).toBe(true)
      expect(canCheckout(170, 2)).toBe(true)
      expect(canCheckout(150, 3)).toBe(true)
    })

    it('should handle edge cases', () => {
      expect(canCheckout(42, 1)).toBe(false) // > 40 even number
      expect(canCheckout(60, 2)).toBe(true)
      expect(canCheckout(170, 3)).toBe(true)
    })
  })
})
