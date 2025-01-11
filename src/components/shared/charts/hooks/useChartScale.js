// src/features/shared/charts/hooks/useChartScale.js
import { useState, useCallback } from 'react';

export const useChartScale = () => {
  const [scaleType, setScaleType] = useState('linear');
  
  const toggleScale = useCallback(() => {
    setScaleType(prev => prev === 'linear' ? 'log' : 'linear');
  }, []);

  const getScaleConfig = useCallback((axis = 'x') => {
    if (scaleType === 'log') {
      return {
        type: 'log',
        base: 10,
        domain: axis === 'x' ? [1, 'auto'] : [1, 'auto'],
        allowDataOverflow: true
      };
    }
    return {
      type: 'linear',
      domain: [0, 'auto']
    };
  }, [scaleType]);

  return {
    scaleType,
    toggleScale,
    getScaleConfig
  };
};