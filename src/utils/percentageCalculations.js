// src/utils/percentageCalculations.js

/**
 * Calculates percentages for grouped data based on a total value field
 * @param {Array} data - Array of objects containing the data
 * @param {string} groupField - Field name to group by
 * @param {string} valueField - Field name containing the values to sum
 * @returns {Array} Original data with added percentage field
 * @example
 * const data = [
 *   { user_name: 'John', volume: 100 },
 *   { user_name: 'John', volume: 200 },
 *   { user_name: 'Jane', volume: 150 }
 * ];
 * calculateGroupPercentages(data, 'user_name', 'volume');
 * // Returns: [
 * //   { user_name: 'John', volume: 100, percentage: 33.33 },
 * //   { user_name: 'John', volume: 200, percentage: 66.67 },
 * //   { user_name: 'Jane', volume: 150, percentage: 100 }
 * // ]
 */
export const calculateGroupPercentages = (data, groupField, valueField) => {
    // Calculate totals for each group
    const groupTotals = {};
    data.forEach(item => {
      const groupKey = item[groupField];
      if (!groupTotals[groupKey]) {
        groupTotals[groupKey] = 0;
      }
      groupTotals[groupKey] += item[valueField];
    });
  
    // Add percentage to each record
    return data.map(item => ({
      ...item,
      percentage: (item[valueField] / groupTotals[item[groupField]]) * 100
    }));
  };
  
  /**
   * Calculates percentages for each item based on the total sum of a value field
   * @param {Array} data - Array of objects containing the data
   * @param {string} valueField - Field name containing the values to sum
   * @returns {Array} Original data with added percentage field
   * @example
   * const data = [
   *   { value: 100 },
   *   { value: 200 },
   *   { value: 300 }
   * ];
   * calculateTotalPercentages(data, 'value');
   * // Returns: [
   * //   { value: 100, percentage: 16.67 },
   * //   { value: 200, percentage: 33.33 },
   * //   { value: 300, percentage: 50.00 }
   * // ]
   */
  export const calculateTotalPercentages = (data, valueField) => {
    const total = data.reduce((sum, item) => sum + item[valueField], 0);
    
    return data.map(item => ({
      ...item,
      percentage: (item[valueField] / total) * 100
    }));
  };