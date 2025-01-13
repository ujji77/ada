import React from 'react';
import DataPointDetails from './components/DataPointDetails';
import FilterBarChart from './components/VerticalBarChart';
import UserActivityTiles from './components/UserActivityTiles';
import { SortProvider } from '../../contexts/SortContext';

const AdaFiveA = () => {
  return (
    <SortProvider>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top row: Line/Bar Chart */}
      <div style={{ 
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <UserActivityTiles />
      </div>
      
      {/* Second row: Month Grid and Data Point Details side by side */}
      <div style={{ display: 'flex', gap: '24px' }}>
        {/* Left column: Month Grid */}
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
    </SortProvider>
  );
};

export default AdaFiveA;