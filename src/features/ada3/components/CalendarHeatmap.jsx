import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip } from 'recharts';
import { api } from '../../../services/api';

const CalendarHeatmap = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getADA3Main();
        
        // Transform API data to match the scatter plot format
        const transformedData = response.map(item => ({
          date: item.entry_date,
          week: Math.floor((new Date(item.entry_date)).getDate() / 7),
          day: getDayNumber(item.day), // Convert day name to number
          active_users: item.active_users,
          month: item.month,
          year: item.year,
          value: item.value,
          journals: item.journals
        }));

        setData(transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Convert day names to numbers (0-6)
  const getDayNumber = (dayName) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days.findIndex(day => dayName.startsWith(day));
  };

  const getColor = (value) => {
    if (!value) return '#ebedf0';
    if (value <= 9) return '#ffebe6';
    if (value <= 19) return '#ffb4a1';
    if (value <= 29) return '#ff8b72';
    if (value <= 39) return '#ff6b4f';
    return '#ff4d1f';
  };

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.[0]) return null;
    
    const { date, active_users, journals } = payload[0].payload;
    return (
      <div style={{
        backgroundColor: 'white',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>{date}</p>
        <p style={{ margin: '4px 0 0', fontSize: '12px', fontWeight: '500' }}>
          {active_users} active users
        </p>
        <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#666' }}>
          {journals} journals
        </p>
      </div>
    );
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
          Active Users by Date
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: '#666' }}>Active users</span>
          {[
            { label: '0', color: '#ebedf0' },
            { label: '1-9', color: '#ffebe6' },
            { label: '10-19', color: '#ffb4a1' },
            { label: '20-29', color: '#ff8b72' },
            { label: '30-39', color: '#ff6b4f' },
            { label: '40+', color: '#ff4d1f' }
          ].map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{
                width: '12px',
                height: '12px',
                backgroundColor: item.color,
                borderRadius: '2px'
              }} />
              <span style={{ fontSize: '12px', color: '#666' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: '200px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{ top: 20, right: 20, bottom: 20, left: 40 }}
          >
            <XAxis
              type="number"
              dataKey="week"
              domain={[0, 52]}
              tickFormatter={() => ''}
              tick={false}
              axisLine={false}
            />
            <YAxis
              type="number"
              dataKey="day"
              domain={[0, 6]}
              tickFormatter={(day) => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day]}
              tick={{ fontSize: 12, fill: '#666' }}
              axisLine={false}
              tickLine={false}
              reversed
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter
              data={data}
              shape={(props) => {
                const { cx, cy, payload } = props;
                if (!cx || !cy || !payload) return null;
                
                return (
                  <rect
                    x={cx - 8}
                    y={cy - 8}
                    width={16}
                    height={16}
                    fill={getColor(payload.active_users)}
                    rx={2}
                    style={{ transition: 'all 0.2s ease' }}
                  />
                );
              }}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CalendarHeatmap;