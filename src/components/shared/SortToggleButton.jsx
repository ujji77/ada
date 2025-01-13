// src/components/shared/SortToggleButton.jsx
import React from 'react';

const SortToggleButton = ({ sortByValue, handleToggleSort }) => {
  return (
    <div className="toggle-container" style={{ display: 'flex', borderRadius: '4px', overflow: 'hidden' }}>
      <button
        onClick={handleToggleSort}
        className={`toggle-button ${sortByValue ? 'active' : ''}`}
        style={{
          padding: '4px 12px',
          border: '1px solid #C84C0C',
          background: sortByValue ? '#C84C0C' : 'white',
          color: sortByValue ? 'white' : '#C84C0C',
          cursor: 'pointer',
          fontSize: '14px',
          borderRadius: '4px 0 0 4px',
          borderRight: 'none'
        }}
      >
        By value
      </button>
      <button
        onClick={handleToggleSort}
        className={`toggle-button ${!sortByValue ? 'active' : ''}`}
        style={{
          padding: '4px 12px',
          border: '1px solid #C84C0C',
          background: !sortByValue ? '#C84C0C' : 'white',
          color: !sortByValue ? 'white' : '#C84C0C',
          cursor: 'pointer',
          fontSize: '14px',
          borderRadius: '0 4px 4px 0'
        }}
      >
        By journals
      </button>
    </div>
  );
};

export default SortToggleButton;