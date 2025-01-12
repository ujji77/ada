import React, { useState, useEffect } from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { api } from '../../../services/api';
import { abbreviateNumber } from '../../../utils/numberFormat';

const LineBarChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chartData = await api.getADA4Main();
        
        // Group data by days and calculate sums
        const groupedData = chartData.reduce((acc, item) => {
          const key = item.days;
          if (!acc[key]) {
            acc[key] = {
              days: key,
              value: 0,
              journals: 0
            };
          }
          acc[key].value += item.value;
          acc[key].journals += item.journals;
          return acc;
        }, {});

        // Convert to array and sort by days
        const formattedData = Object.values(groupedData).sort((a, b) => a.days - b.days);
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-4">Loading chart data...</div>;

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-semibold m-0">Count and Total Value of Postings per User</h3>
      </div>
      <div style={{ height: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 20, right: 60, left: 60, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="days"
              tickLine={false}
              axisLine={false}
              label={{ 
                value: 'Date Difference (entry-to-effective)', 
                position: 'bottom', 
                offset: 20 
              }}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `$${abbreviateNumber(value)}`}
              label={{ 
                value: 'Value',
                angle: -90,
                position: 'insideLeft',
                offset: 10
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tickFormatter={abbreviateNumber}
              label={{ 
                value: 'Number of Journals',
                angle: 90,
                position: 'insideRight',
                offset: 10
              }}
            />
            <Tooltip 
              formatter={(value, name) => {
                if (name === "Sum of amount") {
                  return [`$${abbreviateNumber(value)}`, name];
                }
                return [abbreviateNumber(value), name];
              }}
            />
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="value"
              name="Sum of amount"
              fill="#E86C00"
              radius={[4, 4, 0, 0]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="journals"
              name="Number of journals"
              stroke="#FFB100"
              strokeWidth={2}
              dot={{ fill: '#FFB100', r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineBarChart;