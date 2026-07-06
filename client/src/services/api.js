import axios from 'axios'

/**
 * Axios instance configured with the API base URL
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  timeout: 120000, // 2 minute timeout for AI analysis
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Analyze a company using the AI agent pipeline
 * @param {string} companyName - Name of the company to analyze
 * @returns {Promise<object>} Analysis result
 */
export const analyzeCompany = async (companyName) => {
  const response = await api.post('/api/analyze', { company: companyName })
  return response.data
}

export default api
