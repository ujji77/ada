// src/features/ada3/components/MonthSelectorMatrix.jsx
import React, { useState, useEffect } from 'react';
import { api } from '../../../services/api';

const MonthSelectorMatrix = () => {
  const [monthData, setMonthData] = useState([]);

  useEffect(() => {
    const fetchMonthData = async () => {
      try {
        const data = await api.getADA3Filter();
        setMonthData(data);
      } catch (error) {
        console.error('Error fetching month data:', error);
      }
    };
    fetchMonthData();
  }, []);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gridGap: '8px',
      padding: '16px'
    }}>
      {monthData.map((month, index) => (
        <div
          key={index}
          style={{
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backgroundColor: '#C84C0C',
            transition: 'background-color 0.3s'
          }}
        >
          <div style={{ fontWeight: 'bold' }}>{month.active_users}</div>
          <div>{month.entry_date_occurrences}</div>
        </div>
      ))}
    </div>
  );
};

export default MonthSelectorMatrix;