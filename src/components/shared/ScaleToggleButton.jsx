import React from 'react';

const ScaleToggleButton = ({ useLogScale, handleToggleScale }) => {
  return (
    <div
      style={{
        display: 'flex',
        border: '2px solid #E86C00',
        borderRadius: '4px',
        overflow: 'hidden',
        cursor: 'pointer',
        width: 'auto',
      }}
      onClick={() => handleToggleScale(!useLogScale)}
    >
      <div
        style={{
          flex: 1,
          textAlign: 'center',
          padding: '6px 6px',
          backgroundColor: useLogScale ? '#E86C00' : 'white',
          color: useLogScale ? 'white' : '#333',
          transition: 'background-color 0.3s, color 0.3s',
          fontSize: '12px',
        }}
      >
        Log
      </div>
      <div
        style={{
          flex: 1,
          textAlign: 'center',
          padding: '6px 6px',
          backgroundColor: useLogScale ? 'white' : '#E86C00',
          color: useLogScale ? '#333' : 'white',
          transition: 'background-color 0.3s, color 0.3s',
          fontSize: '12px',
        }}
      >
        Linear
      </div>
    </div>
  );
};

export default ScaleToggleButton;