// src/features/ada3/index.jsx
import React from 'react';
import DataPointDetails from './components/DataPointDetails';
import FilterBarChart from './components/FilterBarChart';
import LineBarChart from './components/LineBarChart';
import CalendarHeatmap from './components/CalendarHeatmap';

const AdaThree = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top row: Line/Bar Chart */}
      <div style={{ 
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <CalendarHeatmap />
      </div>
      
      {/* Second row: Filter Bar Chart and Data Point Details side by side */}
      <div style={{ display: 'flex', gap: '24px' }}>
        {/* Left column: Filter Bar Chart */}
        <div style={{ 
          flex: 1,
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '16px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <FilterBarChart />
        </div>
        
        {/* Right column: Data Point Details Table with horizontal scroll */}
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

export default AdaThree;