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

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{
        backgroundColor: 'white',
        padding: '12px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '12px',
        lineHeight: '1.5'
      }}>
        <p style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>{data.user}</p>
        <p style={{ margin: '0 0 4px 0' }}><strong>Total Value:</strong> ${data.value.toLocaleString()}</p>
        <p style={{ margin: '0 0 4px 0' }}><strong>Journals:</strong> {data.journals.toLocaleString()}</p>
        <p style={{ margin: '0 0 4px 0' }}><strong>Amount Range:</strong></p>
        <p style={{ margin: '0 0 4px 0', paddingLeft: '8px' }}>
          Min: ${data.smallest_amount.toLocaleString()}<br />
          Max: ${data.largest_amount.toLocaleString()}
        </p>
        <p style={{ margin: '0' }}><strong>Active Period:</strong> {data.active_period}</p>
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
        const userData = await api.getADA6Main();

        // Transform data for scatter plot
        const transformedData = userData.map(user => ({
          ...user,
          x: user.value, // Use total value for x-axis
          y: user.journals // Use journal count for y-axis
        }));

        setData(transformedData);

        // Calculate axis limits
        const maxValue = Math.max(...userData.map(d => d.value));
        const maxJournals = Math.max(...userData.map(d => d.journals));

        const xLimit = Math.ceil(maxValue / 1000000) * 1000000; // Round to nearest million
        const yLimit = Math.ceil(maxJournals / 1000) * 1000; // Round to nearest thousand

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
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleToggleScale = () => {
    setUseLogScale(prev => !prev);
  };

  if (loading) return <div>Loading user distribution data...</div>;

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '16px'
      }}>
        <h3 style={{ margin: 0 }}>Distribution of User Values</h3>
        <i className="ms-Icon ms-Icon--Info" style={{ color: '#666' }} />
        <div style={{ marginLeft: 'auto' }}>
          <ScaleToggleButton useLogScale={useLogScale} handleToggleScale={handleToggleScale} />
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          margin={{ top: 20, right: 20, bottom: 40, left: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="x"
            scale={useLogScale ? 'log' : 'linear'}
            type="number"
            domain={useLogScale ? [1, 'auto'] : [0, axisConfig.maxX]}
            ticks={useLogScale ? undefined : axisConfig.xTicks}
            tickFormatter={value =>
              useLogScale ? 
                `$${value.toLocaleString()}` : 
                `$${(value / 1000000).toLocaleString()}M`
            }
            label={{
              value: 'Total Value Posted',
              position: 'bottom',
              offset: 20
            }}
          />
          <YAxis
            dataKey="y"
            scale={useLogScale ? 'log' : 'linear'}
            type="number"
            domain={useLogScale ? [1, 'auto'] : [0, axisConfig.maxY]}
            ticks={useLogScale ? undefined : axisConfig.yTicks}
            tickFormatter={value => value.toLocaleString()}
            label={{
              value: 'Number of Journals',
              angle: -90,
              position: 'insideLeft',
              offset: 10,
              style: { textAnchor: 'middle' }
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Scatter
            data={data}
            fill="#E86C00"
            shape="circle"
            r={4}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScatterPlot;