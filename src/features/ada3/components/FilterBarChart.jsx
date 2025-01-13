import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { api } from '../../../services/api';

const FilterBarChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filterData = await api.getADA3Filter();
        const formattedData = filterData.map(item => ({
          active_users: item.active_users,
          entry_date_occurrences: item.entry_date_occurrences,
        }));
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching filter data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading filter data...</div>;

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '16px',
      }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Active Users vs. Entry Date Occurrences</h3>
        <span style={{ 
          color: '#666',
          cursor: 'help',
          fontSize: '14px'
        }}>ⓘ</span>
      </div>
      <BarChart
        width={600}
        height={400}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="active_users"
          tickLine={false}
          tickSize={10}
          axisLine={false}
          label={{
            value: 'Active Users',
            position: 'bottom',
            offset: 20,
            fontSize: 14,
            style: { textAnchor: 'middle' },
          }}
          fontSize={12}
        />
        <YAxis
          tickLine={false}
          tickFormatter={(value) => `${value}`}
          axisLine={false}
          label={{
            value: 'Entry Date Occurrences',
            angle: -90,
            position: 'insideLeft',
            fontSize: 14,
            style: { textAnchor: 'middle' },
          }}
          fontSize={12}
        />
        <Tooltip />
        <Bar
          dataKey="entry_date_occurrences"
          name="Entry Date Occurrences"
          fill="#C84C0C"
          width={100}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </div>
  );
};

export default FilterBarChart;
