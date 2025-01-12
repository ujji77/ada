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
      const rows = text.split('\n');
      
      // Skip header row and process each data row
      return rows.slice(1).map(row => {
        // Handle quoted fields with commas
        const fields = [];
        let field = '';
        let inQuotes = false;
        
        for (let i = 0; i < row.length; i++) {
          const char = row[i];
          
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            fields.push(field.trim());
            field = '';
          } else {
            field += char;
          }
        }
        // Push the last field
        fields.push(field.trim());

        // Now process the fields
        const [amount, count, effective_date] = fields;
        return {
          amount: parseFloat(amount.replace(/['"]+/g, '')),
          count: parseInt(count.replace(/['"]+/g, '')),
          effective_date: effective_date.replace(/['"]+/g, '').trim()
        };
      }).filter(row => !isNaN(row.amount) && !isNaN(row.count)); // Filter out any invalid rows
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

  // Add this method to your api.js
async getADA1Scatter() {
    try {
      const response = await fetch(
        `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=1510336739`
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
          count: parseInt(count.trim()),
          range: `${parseFloat(bucket_start.trim()).toLocaleString()}-${parseFloat(bucket_end.trim()).toLocaleString()}`
        };
      });
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  async getADA2Main() {
    try {
      const response = await fetch(
        `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=1986598440`
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const text = await response.text();
      const rows = text.split('\n');
      
      // Skip header row and process each data row
      return rows.slice(1).map(row => {
        // Handle quoted fields with commas
        const fields = [];
        let field = '';
        let inQuotes = false;
        
        for (let i = 0; i < row.length; i++) {
          const char = row[i];
          
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            fields.push(field.trim());
            field = '';
          } else {
            field += char;
          }
        }
        // Push the last field
        fields.push(field.trim());
  
        // Process the fields
        const [debit_account, credit_account, account_combination, amount, journal_count] = fields;
        return {
          debit_account: debit_account.replace(/['"]+/g, '').trim(),
          credit_account: credit_account.replace(/['"]+/g, '').trim(),
          account_combination: account_combination.replace(/['"]+/g, '').trim(),
          amount: parseFloat(amount.replace(/['"$,]+/g, '')),
          journal_count: parseInt(journal_count.replace(/['"]+/g, '')),
        };
      }).filter(row => 
        !isNaN(row.amount) && 
        !isNaN(row.journal_count)
      ); // Filter out any invalid rows
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  async getADA3Main() {
    try {
      const response = await fetch(
        `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=1521024180`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      const rows = text.split('\n');
      
      // Skip header row and process each data row
      return rows.slice(1).map(row => {
        const fields = [];
        let field = '';
        let inQuotes = false;
        
        for (let i = 0; i < row.length; i++) {
          const char = row[i];
          
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            fields.push(field.trim());
            field = '';
          } else {
            field += char;
          }
        }
        // Push the last field
        fields.push(field.trim());

        // Process the fields with new schema
        const [entry_date, day, month, year, active_users, value, journals] = fields;
        
        const processed = {
          entry_date: entry_date.replace(/['"]+/g, '').trim(),
          day: day.replace(/['"]+/g, '').trim(),
          month: month.replace(/['"]+/g, '').trim(),
          year: year.replace(/['"]+/g, '').trim(),
          active_users: parseInt(active_users.replace(/['"]+/g, '')),
          value: parseFloat(value.replace(/['"$,]+/g, '')),
          journals: parseInt(journals.replace(/['"]+/g, '')),
        };

        return processed;
      }).filter(row => 
        // Only filter numeric fields
        !isNaN(row.active_users) && 
        !isNaN(row.value) && 
        !isNaN(row.journals)
      );

      console.log('Processed rows:', processedRows.slice(0, 2));
      return processedRows;

    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  async getADA3Filter() {
    try {
      const response = await fetch(
        `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=203428939`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      const rows = text.split('\n');
      
      // Skip header row and process each data row
      return rows.slice(1).map(row => {
        // Handle quoted fields with commas
        const fields = [];
        let field = '';
        let inQuotes = false;
        
        for (let i = 0; i < row.length; i++) {
          const char = row[i];
          
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            fields.push(field.trim());
            field = '';
          } else {
            field += char;
          }
        }
        // Push the last field
        fields.push(field.trim());

        // Process the fields
        const [active_users, entry_date_occurrences] = fields;
        return {
          active_users: active_users.replace(/['"]+/g, '').trim(),
          entry_date_occurrences: parseInt(entry_date_occurrences.replace(/['"]+/g, '')),
        };
      }).filter(row => 
        !isNaN(row.entry_date_occurrences)
      ); // Filter out any invalid rows
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  async getADA6Main() {
    try {
      const response = await fetch(
        `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=920040546`
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const text = await response.text();
      const rows = text.split('\n');
      
      // Skip header row and process each data row
      return rows.slice(1).map(row => {
        // Handle quoted fields with commas
        const fields = [];
        let field = '';
        let inQuotes = false;
        
        for (let i = 0; i < row.length; i++) {
          const char = row[i];
          
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            fields.push(field.trim());
            field = '';
          } else {
            field += char;
          }
        }
        // Push the last field
        fields.push(field.trim());
  
        // Process the fields
        const [user, value, journals, smallest_amount, largest_amount, active_period] = fields;
        return {
          user: user.replace(/['"]+/g, '').trim(),
          value: parseFloat(value.replace(/['"$,]+/g, '')),
          journals: parseInt(journals.replace(/['"]+/g, '')),
          smallest_amount: parseFloat(smallest_amount.replace(/['"$,]+/g, '')),
          largest_amount: parseFloat(largest_amount.replace(/['"$,]+/g, '')),
          active_period: active_period.replace(/['"]+/g, '').trim()
        };
      }).filter(row => 
        !isNaN(row.value) && 
        !isNaN(row.journals) && 
        !isNaN(row.smallest_amount) && 
        !isNaN(row.largest_amount)
      ); // Filter out any invalid rows
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

//   // Helper function to calculate date difference
//   calculateDateDifference(entryDate, accountingDate) {
//     const entry = new Date(entryDate);
//     const accounting = new Date(accountingDate);
//     const diffTime = Math.abs(accounting - entry);
//     return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//   }
};