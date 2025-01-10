// src/services/api.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
  async getADA1Main() {
    try {
      const response = await fetch(`${API_URL}/ada-1-main`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
  // Journal Details
  async getJournalDetails(filters = {}) {
    const queryParams = new URLSearchParams(filters);
    const response = await fetch(`${API_URL}/journal-details?${queryParams}`);
    return response.json();
  },

  async getJournalById(id) {
    const response = await fetch(`${API_URL}/journal-details/${id}`);
    return response.json();
  },

  // ADA 1 Main
  async getADA1Main() {
    const response = await fetch(`${API_URL}/ada-1-main`);
    return response.json();
  },

  async createADA1Main(data) {
    const response = await fetch(`${API_URL}/ada-1-main`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  // ADA 1 Histogram
  async getHistogram() {
    const response = await fetch(`${API_URL}/ada-1-histogram`);
    return response.json();
  },

  async createHistogramBucket(data) {
    const response = await fetch(`${API_URL}/ada-1-histogram`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  // Analytics
  async getDateDifferenceAnalysis() {
    const response = await fetch(`${API_URL}/analytics/date-differences`);
    return response.json();
  },

  async getUserActivity() {
    const response = await fetch(`${API_URL}/analytics/user-activity`);
    return response.json();
  }
};