// src/components/shared/DataVisualization.jsx
import React, { useState } from 'react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';

const DataVisualization = () => {
  const [selectedView, setSelectedView] = useState('Log');

  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h3 style={{ margin: 0 }}>Distribution of Amounts</h3>
          <i className="ms-Icon ms-Icon--Info" style={{ color: '#666' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>Journals selected (0)</span>
          <DefaultButton text="Add" />
          <DefaultButton text="Clear all" style={{ color: '#E86C00' }} />
          <div style={{ 
            border: '1px solid #eaeaea', 
            borderRadius: '4px', 
            display: 'flex' 
          }}>
            <button 
              onClick={() => setSelectedView('Log')}
              style={{
                padding: '4px 12px',
                border: 'none',
                backgroundColor: selectedView === 'Log' ? '#E86C00' : 'transparent',
                color: selectedView === 'Log' ? 'white' : 'black',
                cursor: 'pointer'
              }}
            >
              Log
            </button>
            <button 
              onClick={() => setSelectedView('Linear')}
              style={{
                padding: '4px 12px',
                border: 'none',
                backgroundColor: selectedView === 'Linear' ? '#E86C00' : 'transparent',
                color: selectedView === 'Linear' ? 'white' : 'black',
                cursor: 'pointer'
              }}
            >
              Linear
            </button>
          </div>
        </div>
      </div>
      {/* We'll add the chart here later */}
      <div style={{ height: '300px', backgroundColor: '#f8f8f8', borderRadius: '4px' }}>
        {/* Placeholder for chart */}
      </div>
    </div>
  );
};

export default DataVisualization;