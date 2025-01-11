// src/services/api.js
const SHEET_ID = '1xq7lVsfhWRA9wrYMdodpi4p93VuR8UCojyWAahzEwqU';

export const api = {
  async getJournalDetails() {
    try {
      const response = await fetch(
        `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      const rows = text.split('\n').slice(1); // Skip header row
      return rows.map(row => {
        const [journal_id, amount, class_type, user_name, entry_date, accounting_date] = row.split(',');
        return {
          journal_id: parseInt(journal_id.trim()),
          amount: parseFloat(amount.trim()),
          class: class_type.trim(),
          user_name: user_name.trim(),
          entry_date: entry_date.trim(),
          accounting_date: accounting_date.trim(),
          date_difference: this.calculateDateDifference(entry_date.trim(), accounting_date.trim())
        };
      });
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  async getADA1Main() {
    try {
      const response = await fetch(
        `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=670541848`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      const rows = text.split('\n').slice(1); // Skip header row
      return rows.map(row => {
        const [amount, count, effective_date] = row.split(',');
        return {
          amount: parseFloat(amount.trim()),
          count: parseInt(count.trim()),
          effective_date: effective_date.trim().replace(/['"]+/g, '')
        };
      });
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  async getADA1Histogram() {
    try {
      const response = await fetch(
        `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=2093810098`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      const rows = text.split('\n').slice(1); // Skip header row
      return rows.map(row => {
        const [bucket_start, bucket_end, sum_amount, count] = row.split(',');
        return {
          bucket_start: parseFloat(bucket_start.trim()),
          bucket_end: parseFloat(bucket_end.trim()),
          sum_amount: parseFloat(sum_amount.trim()),
          count: parseInt(count.trim())
        };
      });
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // Helper function to calculate date difference
  calculateDateDifference(entryDate, accountingDate) {
    const entry = new Date(entryDate);
    const accounting = new Date(accountingDate);
    const diffTime = Math.abs(accounting - entry);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
};