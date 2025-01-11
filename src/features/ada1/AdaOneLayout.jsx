// src/features/ada1/AdaOneLayout.jsx
import React from 'react';
import MessageBox from '../../components/shared/MessageBox';

const AdaOneLayout = ({ children }) => {
  return (
    <div className="ada-layout">
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 24
      }}>
        <h2 style={{ margin: 0 }}>Revenue to AR</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span>USD</span>
          <span>Performance materiality: $550,000</span>
        </div>
      </div>
      
      <MessageBox 
        message="No outliers selected. If none exist, mark the ADA as completed without outliers."
        actionText="Complete - no outliers"
        onAction={() => console.log('Completed without outliers')}
      />
      
      {children}
    </div>
  );
};

export default AdaOneLayout;