// src/utils/numberFormat.js

/**
 * Abbreviates large numbers with k, m, b suffixes
 * @param {number} value - The number to abbreviate
 * @returns {string} Abbreviated number with suffix
 * @example
 * abbreviateNumber(1234) // "1.23k"
 * abbreviateNumber(1234567) // "1.23m"
 * abbreviateNumber(1234567890) // "1.23b"
 */
export const abbreviateNumber = (value) => {
    if (value === 0) return '0';
    
    const suffixes = ['', 'k', 'm', 'b'];
    const magnitude = Math.floor(Math.log10(Math.abs(value)) / 3);
    const scaledValue = value / Math.pow(10, magnitude * 3);
    const suffix = suffixes[magnitude];
    
    // Round to at most 3 significant digits
    const rounded = scaledValue.toPrecision(3);
    // Remove trailing zeros and decimal point if whole number
    const formatted = parseFloat(rounded).toString();
    
    return formatted + suffix;
  };