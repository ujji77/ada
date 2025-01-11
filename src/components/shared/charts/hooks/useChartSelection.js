// src/features/shared/charts/hooks/useChartSelection.js
import { useState, useCallback } from 'react';

export const useChartSelection = () => {
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [selectionMode, setSelectionMode] = useState('none');

  const startSelection = useCallback((mode) => {
    setSelectionMode(mode);
  }, []);

  const handleSelectionComplete = useCallback((points) => {
    setSelectedPoints(prev => [...prev, ...points]);
    setSelectionMode('none');
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedPoints([]);
  }, []);

  return {
    selectedPoints,
    selectionMode,
    startSelection,
    handleSelectionComplete,
    clearSelection
  };
};