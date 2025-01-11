// src/features/ada2/index.jsx
import React from 'react';
import DataPointDetails from './components/DataPointDetails';
import AccountMatrix from './components/AccountMatrix';
import ScatterPlot from './components/ScatterChart';

const AdaTwo = () => {
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
      
      {/* Second row: Histogram and table side by side */}
      <div style={{ display: 'flex', gap: '24px' }}>
        {/* Left column: Histogram (placeholder) */}
        <div style={{ 
          flex: 1,
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '16px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div style={{ 
            height: '500px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: '#666',
          }}>
        <AccountMatrix />
          </div>
        </div>
        
        {/* Right column: Table with horizontal scroll */}
        <div style={{ 
          flex: 1,
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '16px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          overflowX: 'auto'
        }}>
          <DataPointDetails />
        </div>
      </div>
    </div>
  );
};

export default AdaTwo;