// src/features/ada1/components/HistogramChart.jsx
import React, { useState, useEffect } from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { api } from '../../../services/api';

const HistogramChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const histogramData = await api.getADA1Histogram();
        const formattedData = histogramData.map(item => ({
          range: `${item.bucket_start.toLocaleString()}-${item.bucket_end.toLocaleString()}`,
          count: item.count,
          sum_amount: item.sum_amount
        }));
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching histogram data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading histogram data...</div>;

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '16px'
      }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Histogram</h3>
        <i className="ms-Icon ms-Icon--Info" style={{ color: '#666', fontSize: '14px' }} />
      </div>
      <ComposedChart
        width={600}
        height={400}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="range"
          scale="band"
          tickLine={false}
          tickSize={10}
          fontSize={12}
        />
        <YAxis
          yAxisId="left"
          orientation="left"
          tickFormatter={(value) => `${value / 1000000}M`}
          label={{ value: 'Amount', angle: -90, position: 'insideLeft', fontSize: 12 }}
          fontSize={12}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          domain={[0, 'auto']}
          label={{ value: 'Number of journals', angle: 90, position: 'insideRight', fontSize: 12 }}
          fontSize={12}
        />
        <Tooltip />
        <Legend
          wrapperStyle={{ fontSize: 12 }}
        />
        <Bar
          yAxisId="left"
          dataKey="sum_amount"
          name="Sum of amount"
          fill="#E86C00"
          barSize={'100%'}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="count"
          name="Number of journals"
          stroke="#FFB100"
          strokeWidth={2}
          dot={{ fill: '#FFB100', r: 4 }}
        />
      </ComposedChart>
    </div>
  );
};

export default HistogramChart;