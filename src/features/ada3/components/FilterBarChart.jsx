// src/features/ada3/components/FilterBarChart.jsx
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { api } from '../../../services/api';

const FilterBarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filterData = await api.getADA3Filter();
        const formattedData = filterData.map(item => ({
          active_users: item.active_users,
          entry_date_occurrences: item.entry_date_occurrences
        }));
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching filter data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis dataKey="active_users" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="entry_date_occurrences" fill="#E86C00" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FilterBarChart;