// src/components/shared/AdaLayout.jsx
import React from 'react';
import MessageBox from './MessageBox';

const AdaLayout = ({ 
  children, 
  title, 
  currency = "USD",
  materialityAmount = "$550,000",
  messageText = "No outliers selected. If none exist, mark the ADA as completed without outliers.",
  actionText = "Complete - no outliers",
  onAction = () => console.log('Completed without outliers')
}) => {
  return (
    <div className="ada-layout">
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 24
      }}>
        <h2 style={{ margin: 0 }}>{title}</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span>{currency}</span>
          <span>Performance materiality: {materialityAmount}</span>
        </div>
      </div>
      
      <MessageBox 
        message={messageText}
        actionText={actionText}
        onAction={onAction}
      />
      
      {children}
    </div>
  );
};

export default AdaLayout;