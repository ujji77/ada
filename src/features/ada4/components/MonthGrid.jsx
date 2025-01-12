import React, { useState } from 'react';

const MonthGrid = () => {
  const [selectedMonths, setSelectedMonths] = useState(new Set());

  const months = [
    ['Jan', 'Feb', 'Mar', 'Apr'],
    ['May', 'Jun', 'Jul', 'Aug'],
    ['Sep', 'Oct', 'Nov', 'Dec']
  ];

  const containerStyle = {
    width: '100%',
    maxWidth: '600px'
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '24px'
  };

  const titleStyle = {
    fontSize: '16px',
    fontWeight: '600',
    margin: 0,
    color: '#333'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px'
  };

  const buttonStyle = {
    aspectRatio: '1',
    backgroundColor: '#C84C0C',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    fontSize: '16px',
    fontWeight: '500',
    padding: '24px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '80px',
    minHeight: '80px'
  };

  const toggleMonth = (month) => {
    const newSelected = new Set(selectedMonths);
    if (newSelected.has(month)) {
      newSelected.delete(month);
    } else {
      newSelected.add(month);
    }
    setSelectedMonths(newSelected);
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h3 style={titleStyle}>View by Month (Effective Date)</h3>
        <span style={{ 
          color: '#666',
          cursor: 'help',
          fontSize: '14px'
        }}>ⓘ</span>
      </div>
      <div style={gridStyle}>
        {months.flat().map((month) => (
          <button
            key={month}
            onClick={() => toggleMonth(month)}
            style={{
              ...buttonStyle,
              backgroundColor: selectedMonths.has(month) ? '#d56200' : '#C84C0C',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#d56200';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 
                selectedMonths.has(month) ? '#d56200' : '#C84C0C';
            }}
          >
            {month}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MonthGrid;