import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, ScatterChart, XAxis, YAxis, ZAxis, Tooltip, Scatter, CartesianGrid } from 'recharts';
import _ from 'lodash';
import { api } from '../../../services/api';

const CalendarHeatmap = () => {
  const [data, setData] = useState([]);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chartData = await api.getADA3Main();
        
        // Log a sample of the raw data to inspect structure
        console.log('Sample raw data:', chartData.slice(0, 5));

        if (chartData && chartData.length > 0) {
          const transformedData = chartData.map(item => {
            const dataPoint = {
              x: parseInt(item.month),
              y: parseInt(item.day),
              active_users: parseInt(item.active_users),
              month: parseInt(item.month),
              day: parseInt(item.day),
              year: parseInt(item.year),
            };
            return dataPoint;
          });

          // Log a sample of transformed data to verify structure
          console.log('Sample transformed data:', transformedData.slice(0, 5));
          setData(transformedData);
        }
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };
    fetchData();
  }, []);

  const getColor = (value) => {
    if (!value) return '#ebedf0';
    if (value <= 9) return '#ffebe6';
    if (value <= 19) return '#ffb4a1';
    if (value <= 29) return '#ff8b72';
    if (value <= 39) return '#ff6b4f';
    return '#ff4d1f';
  };

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload[0]) return null;
    const data = payload[0].payload;
    return (
      <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
        <p className="text-sm text-gray-600">
          {months[data.month - 1]} {data.day}, {data.year}
        </p>
        <p className="text-sm font-semibold">
          {data.active_users || 0} active users
        </p>
      </div>
    );
  };

  return (
    <div className="w-full min-h-[400px] p-4 border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Active Users by Date</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Less</span>
          {[0, 9, 19, 29, 39].map((threshold, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: getColor(threshold + 1) }}
            />
          ))}
          <span className="text-sm text-gray-500">More</span>
        </div>
      </div>
      <div className="w-full h-[300px] border border-gray-100">
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart
            margin={{ top: 20, right: 20, bottom: 20, left: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis 
              type="number"
              dataKey="x"
              domain={[0.5, 12.5]}
              tickFormatter={(value) => months[value - 1]}
              axisLine={false}
              tickLine={false}
              interval={0}
              tick={{ fontSize: 12, fill: '#666' }}
            />
            <YAxis
              type="number"
              dataKey="y"
              domain={[0.5, 31.5]}
              tick={{ fontSize: 12, fill: '#666' }}
              axisLine={false}
              tickLine={false}
              reversed
              ticks={[1, 5, 10, 15, 20, 25, 30]}
            />
            <ZAxis type="number" range={[50, 50]} />
            <Tooltip content={<CustomTooltip />} />
            <Scatter
              data={data}
              shape={(props) => {
                if (!props.cx || !props.cy) {
                  console.log('Missing coordinates for point:', props);
                  return null;
                }
                return (
                  <circle
                    cx={props.cx}
                    cy={props.cy}
                    r={8}
                    fill={getColor(props.payload.active_users)}
                    className="transition-colors duration-200"
                  />
                );
              }}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      {/* Debug info */}
      <div className="mt-2 text-xs text-gray-500">
        Data points: {data.length}
      </div>
    </div>
  );
};

export default CalendarHeatmap;