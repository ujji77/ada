// src/features/ada1/index.jsx
import React from 'react';
import AdaOneLayout from './AdaOneLayout';
import DataPointDetails from './components/DataPointDetails';
import HistogramChart from './components/HistogramChart';
import ScatterPlot from './components/ScatterChart';
// import DistributionChart from './components/DistributionChart';

const AdaOne = () => {
  return (
    <AdaOneLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <ScatterPlot />
        <div style={{ 
          display: 'flex', 
          gap: '24px'
        }}>
          <HistogramChart />
          <DataPointDetails />
        </div>
      </div>
    </AdaOneLayout>
  );
};

export default AdaOne;