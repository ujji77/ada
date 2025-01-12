// src/features/ada3/index.jsx
import React from 'react';
import DataPointDetails from './components/DataPointDetails';
import FilterBarChart from './components/FilterBarChart';
import LineBarChart from './components/LineBarChart';

const AdaThree = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Line/Bar Chart */}
      <div style={{
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <LineBarChart />
      </div>

      {/* Month Selector Matrix */}
      <div style={{
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <FilterBarChart />
      </div>

      {/* Data Point Details Table */}
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

export default AdaThree;