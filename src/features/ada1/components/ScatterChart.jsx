import React, { useState, useEffect } from 'react';
import ScaleToggleButton from '../../../components/shared/ScaleToggleButton';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { api } from '../../../services/api';
import { abbreviateNumber } from '../../../utils/numberFormat';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{
        backgroundColor: 'white',
        padding: '12px',
        border: '1px solid #ccc',
        borderRadius: '4px'
      }}>
        <p style={{ margin: '0 0 8px 0' }}><strong>Range:</strong> {data.range}</p>
        <p style={{ margin: '0 0 8px 0' }}><strong>Journals:</strong> {data.count.toLocaleString()}</p>
        <p style={{ margin: '0' }}><strong>Total:</strong> ${data.sum_amount.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const ScatterPlot = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [useLogScale, setUseLogScale] = useState(false);
  const [axisConfig, setAxisConfig] = useState({
    maxX: 0,
    maxY: 0,
    xTicks: [],
    yTicks: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const scatterData = await api.getADA1Scatter();

        const transformedData = scatterData.map(d => ({
          ...d,
          x: (d.bucket_start + d.bucket_end) / 2 // Use middle of bucket for x position
        }));

        setData(transformedData);

        const maxBucketValue = Math.max(...scatterData.map(d => d.bucket_end));
        const maxCount = Math.max(...scatterData.map(d => d.count));

        const xLimit = Math.ceil(maxBucketValue / 100000) * 100000;
        const yLimit = Math.ceil(maxCount / 100) * 100;

        const xTicks = Array.from(
          { length: 5 },
          (_, i) => Math.round(xLimit / 4 * i)
        );

        const yTicks = Array.from(
          { length: 7 },
          (_, i) => Math.round(yLimit / 6 * i)
        );

        setAxisConfig({
          maxX: xLimit,
          maxY: yLimit,
          xTicks,
          yTicks
        });
      } catch (error) {
        console.error('Error fetching scatter data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleToggleScale = () => {
    setUseLogScale(prev => !prev);
  };

  if (loading) return <div>Loading distribution data...</div>;

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '16px'
      }}>
        <h3 style={{ margin: 0 }}>Distribution of Amounts</h3>
        <span style={{ 
          color: '#666',
          cursor: 'help',
          fontSize: '14px'
        }}>ⓘ</span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>Journals selected (0)</span>
          <button className="add-button">Add</button>
          <button className="clear-button">Clear all</button>
          <ScaleToggleButton useLogScale={useLogScale} handleToggleScale={handleToggleScale} />
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="x"
            scale={useLogScale ? 'log' : 'linear'}
            type="number"
            domain={useLogScale ? [1, 'auto'] : [0, axisConfig.maxX]}
            axisLine={false}
            ticks={useLogScale ? undefined : axisConfig.xTicks}
            tickLine={false}
            tickSize={10}
            tickFormatter={value => `$${abbreviateNumber(value)}`}
            label={{
              value: 'Amount',
              position: 'bottom',
              offset: 20
            }}
          />
          <YAxis
            dataKey="count"
            scale={useLogScale ? 'log' : 'linear'}
            type="number"
            domain={useLogScale ? [1, 'auto'] : [0, axisConfig.maxY]}
            axisLine={false}
            tickLine={false}
            tickSize={10}
            ticks={useLogScale ? undefined : axisConfig.yTicks}
            tickFormatter={value => abbreviateNumber(value)}
            label={{
              value: 'Number of journals',
              angle: -90,
              position: 'insideLeft',
              offset: 0,
              style: { textAnchor: 'middle' }
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Scatter
            data={data}
            fill="#C84C0C"
            shape="circle"
            r={4}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScatterPlot;