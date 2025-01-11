// src/features/shared/charts/hooks/useChartZoom.js
import { useState, useCallback } from 'react';

export const useChartZoom = (initialDomain = [0, 100]) => {
  const [zoomDomain, setZoomDomain] = useState(initialDomain);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = useCallback(() => {
    const range = zoomDomain[1] - zoomDomain[0];
    const center = (zoomDomain[0] + zoomDomain[1]) / 2;
    const newRange = range * 0.5;
    
    setZoomDomain([
      center - newRange / 2,
      center + newRange / 2
    ]);
    setZoomLevel(prev => prev * 2);
  }, [zoomDomain]);

  const handleZoomOut = useCallback(() => {
    const range = zoomDomain[1] - zoomDomain[0];
    const center = (zoomDomain[0] + zoomDomain[1]) / 2;
    const newRange = range * 2;
    
    setZoomDomain([
      Math.max(0, center - newRange / 2),
      center + newRange / 2
    ]);
    setZoomLevel(prev => prev * 0.5);
  }, [zoomDomain]);

  const resetZoom = useCallback(() => {
    setZoomDomain(initialDomain);
    setZoomLevel(1);
  }, [initialDomain]);

  return {
    zoomDomain,
    zoomLevel,
    handleZoomIn,
    handleZoomOut,
    resetZoom
  };
};