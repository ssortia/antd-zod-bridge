import { describe, it, expect } from 'vitest'
import { formatPhoneNumber, parsePhoneNumber } from '../utils/phoneUtils'

describe('Phone Utils', () => {
  describe('formatPhoneNumber', () => {
    it('formats empty string correctly', () => {
      expect(formatPhoneNumber('')).toBe('')
    })

    it('formats single digit correctly', () => {
      expect(formatPhoneNumber('7')).toBe('+7')
      expect(formatPhoneNumber('9')).toBe('+7 (9')
    })

    it('formats partial numbers correctly', () => {
      expect(formatPhoneNumber('79')).toBe('+7 (9')
      expect(formatPhoneNumber('799')).toBe('+7 (99')
      expect(formatPhoneNumber('7999')).toBe('+7 (999')
      expect(formatPhoneNumber('79991')).toBe('+7 (999) 1')
      expect(formatPhoneNumber('7999123')).toBe('+7 (999) 123')
      expect(formatPhoneNumber('799912345')).toBe('+7 (999) 123-45')
      expect(formatPhoneNumber('79991234567')).toBe('+7 (999) 123-45-67')
    })

    it('handles numbers starting with 8', () => {
      expect(formatPhoneNumber('8')).toBe('+7')
      expect(formatPhoneNumber('89991234567')).toBe('+7 (999) 123-45-67')
    })

    it('adds 7 prefix to numbers not starting with 7', () => {
      expect(formatPhoneNumber('9991234567')).toBe('+7 (999) 123-45-67')
      expect(formatPhoneNumber('5551234567')).toBe('+7 (555) 123-45-67')
    })

    it('limits to 11 digits maximum', () => {
      expect(formatPhoneNumber('799912345678999')).toBe('+7 (999) 123-45-67')
      expect(formatPhoneNumber('89991234567999')).toBe('+7 (999) 123-45-67')
    })

    it('ignores non-digit characters', () => {
      expect(formatPhoneNumber('+7(999)123-45-67')).toBe('+7 (999) 123-45-67')
      expect(formatPhoneNumber('7-999-123-45-67')).toBe('+7 (999) 123-45-67')
      expect(formatPhoneNumber('7 999 123 45 67')).toBe('+7 (999) 123-45-67')
      expect(formatPhoneNumber('7abc999def123ghi45jkl67')).toBe('+7 (999) 123-45-67')
    })

    it('handles already formatted numbers', () => {
      expect(formatPhoneNumber('+7 (999) 123-45-67')).toBe('+7 (999) 123-45-67')
      expect(formatPhoneNumber('+7(999)123-45-67')).toBe('+7 (999) 123-45-67')
    })

    it('handles edge cases', () => {
      expect(formatPhoneNumber('0')).toBe('+7 (0')
      expect(formatPhoneNumber('00000')).toBe('+7 (000) 00')
      expect(formatPhoneNumber('777777777777')).toBe('+7 (777) 777-77-77')
    })
  })

  describe('parsePhoneNumber', () => {
    it('removes all non-digit characters', () => {
      expect(parsePhoneNumber('+7 (999) 123-45-67')).toBe('79991234567')
      expect(parsePhoneNumber('7-999-123-45-67')).toBe('79991234567')
      expect(parsePhoneNumber('7 999 123 45 67')).toBe('79991234567')
    })

    it('handles numbers starting with 8', () => {
      expect(parsePhoneNumber('8 999 123 45 67')).toBe('79991234567')
      expect(parsePhoneNumber('8(999)123-45-67')).toBe('79991234567')
    })

    it('preserves numbers starting with 7', () => {
      expect(parsePhoneNumber('7 999 123 45 67')).toBe('79991234567')
      expect(parsePhoneNumber('79991234567')).toBe('79991234567')
    })

    it('handles empty string', () => {
      expect(parsePhoneNumber('')).toBe('')
    })

    it('handles numbers with mixed characters', () => {
      expect(parsePhoneNumber('abc7def999ghi123jkl45mno67')).toBe('79991234567')
      expect(parsePhoneNumber('8abc999def123ghi45jkl67')).toBe('79991234567')
    })

    it('handles very long inputs', () => {
      expect(parsePhoneNumber('799912345679999999')).toBe('799912345679999999')
      expect(parsePhoneNumber('899912345679999999')).toBe('799912345679999999')
    })
  })
})