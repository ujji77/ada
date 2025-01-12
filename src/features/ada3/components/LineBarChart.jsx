// src/features/ada3/components/LineBarChart.jsx
import React, { useState, useEffect } from 'react';
import { LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { api } from '../../../services/api';

const LineBarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chartData = await api.getADA3Main();
        setData(chartData);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <XAxis dataKey="entry_date" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="value" name="Value" stroke="#C84C0C" />
          <Bar yAxisId="right" dataKey="journals" name="Journals" fill="#FFB100" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineBarChart;