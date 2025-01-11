// src/features/ada1/index.jsx
import React from 'react';
import AdaOneLayout from './AdaOneLayout';
import DataPointDetails from './components/DataPointDetails';
import HistogramChart from './components/HistogramChart';
import ScatterPlot from './components/ScatterChart';

const AdaOne = () => {
  return (
    <AdaOneLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Top row: Scatter chart */}
        <div style={{ width: '100%' }}>
          <ScatterPlot />
        </div>
        
        {/* Second row: Histogram and table side by side */}
        <div style={{ display: 'flex', gap: '24px' }}>
          {/* Left column: Histogram */}
          <div style={{ flex: 1 }}>
            <HistogramChart />
          </div>
          
          {/* Right column: Table with horizontal scroll */}
          <div style={{ flex: 1, overflowX: 'auto' }}>
            <DataPointDetails />
          </div>
        </div>
      </div>
    </AdaOneLayout>
  );
};

export default AdaOne;