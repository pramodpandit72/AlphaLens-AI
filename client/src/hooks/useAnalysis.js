import { useState, useCallback } from 'react'
import { analyzeCompany } from '../services/api'

/**
 * Custom hook for managing company analysis state
 * Handles loading, success, and error states
 */
export default function useAnalysis() {
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const analyze = useCallback(async (companyName) => {
    if (!companyName) return

    setStatus('loading')
    setData(null)
    setError(null)

    try {
      const response = await analyzeCompany(companyName)

      if (response.success && response.analysis) {
        setData(response.analysis)
        setStatus('success')
      } else {
        throw new Error(response.error?.message || 'Analysis failed')
      }
    } catch (err) {
      const message =
        err.response?.data?.error?.message ||
        err.message ||
        'Something went wrong. Please try again.'
      setError(message)
      setStatus('error')
    }
  }, [])

  const reset = useCallback(() => {
    setStatus('idle')
    setData(null)
    setError(null)
  }, [])

  return {
    status,
    data,
    error,
    analyze,
    reset,
    isLoading: status === 'loading',
    isSuccess: status === 'success',
    isError: status === 'error',
  }
}
