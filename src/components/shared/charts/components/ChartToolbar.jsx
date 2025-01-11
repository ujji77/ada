// src/features/shared/charts/components/ChartToolbar.jsx
import React from 'react';

const ChartToolbar = ({
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onToggleScale,
  scaleType,
  onStartSelection,
  selectionMode,
  onClearSelection
}) => {
  return (
    <div className="chart-toolbar">
      <div className="zoom-controls">
        <button onClick={onZoomIn}>+</button>
        <button onClick={onZoomOut}>-</button>
        <button onClick={onResetZoom}>Reset</button>
      </div>
      <div className="scale-controls">
        <button 
          onClick={onToggleScale}
          className={scaleType === 'log' ? 'active' : ''}
        >
          {scaleType === 'log' ? 'Linear' : 'Log'}
        </button>
      </div>
      <div className="selection-controls">
        <button 
          onClick={() => onStartSelection('lasso')}
          className={selectionMode === 'lasso' ? 'active' : ''}
        >
          Lasso
        </button>
        <button onClick={onClearSelection}>Clear</button>
      </div>
    </div>
  );
};

export default ChartToolbar;