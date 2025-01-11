// src/features/ada6/index.jsx
import React from 'react';
import DataPointDetails from './components/DataPointDetails';
import ScatterPlot from './components/ScatterChart';

const AdaSix = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top row: Scatter chart */}
      <div style={{ 
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <ScatterPlot />
      </div>
      
      {/* Second row: Full-width table */}
      <div style={{ 
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        overflowX: 'auto'
      }}>
        <DataPointDetails />
      </div>
    </div>
  );
};

export default AdaSix;