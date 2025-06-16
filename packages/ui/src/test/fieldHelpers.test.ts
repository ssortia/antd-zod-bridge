import { describe, it, expect } from 'vitest'
import { hasError, getFieldStatus, formatErrorMessage, isRequired } from '../utils/fieldUtils'

describe('fieldUtils', () => {
  describe('hasError', () => {
    it('returns true when error exists', () => {
      const error = { message: 'This field is required', type: 'required' }
      expect(hasError(error)).toBe(true)
    })

    it('returns false when error is undefined', () => {
      expect(hasError(undefined)).toBe(false)
    })

    it('returns false when error is null', () => {
      expect(hasError(null)).toBe(false)
    })
  })

  describe('getFieldStatus', () => {
    it('returns "error" when error exists', () => {
      const error = { message: 'This field is required', type: 'required' }
      expect(getFieldStatus(error)).toBe('error')
    })

    it('returns undefined when error is undefined', () => {
      expect(getFieldStatus(undefined)).toBeUndefined()
    })

    it('returns undefined when error is null', () => {
      expect(getFieldStatus(null)).toBeUndefined()
    })
  })

  describe('formatErrorMessage', () => {
    it('returns error message when error exists', () => {
      const error = { message: 'This field is required', type: 'required' }
      expect(formatErrorMessage(error)).toBe('This field is required')
    })

    it('returns empty string when error is undefined', () => {
      expect(formatErrorMessage(undefined)).toBe('')
    })

    it('returns empty string when error is null', () => {
      expect(formatErrorMessage(null)).toBe('')
    })
  })

  describe('isRequired', () => {
    it('returns true when required is true', () => {
      expect(isRequired(true)).toBe(true)
    })

    it('returns false when required is false', () => {
      expect(isRequired(false)).toBe(false)
    })

    it('returns false when required is undefined', () => {
      expect(isRequired(undefined)).toBe(false)
    })

    it('returns false when required is null', () => {
      expect(isRequired(null as any)).toBe(false)
    })
  })
})