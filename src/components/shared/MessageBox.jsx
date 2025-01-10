// src/components/shared/MessageBox.jsx
import React from 'react';

const MessageBox = ({ message, actionText, onAction }) => {
  return (
    <div style={{
      backgroundColor: '#f8f8f8',
      border: '1px solid #eaeaea',
      borderRadius: '4px',
      padding: '16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <i className="ms-Icon ms-Icon--Info" style={{ color: '#666' }} />
        <span>{message}</span>
      </div>
      {actionText && (
        <button 
          onClick={onAction}
          style={{
            padding: '8px 16px',
            border: '1px solid #eaeaea',
            borderRadius: '4px',
            backgroundColor: 'white',
            cursor: 'pointer'
          }}
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default MessageBox;