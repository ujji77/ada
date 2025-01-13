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
        borderRadius: '4px',
        fontSize: '12px',
        lineHeight: '1.5'
      }}>
        <p style={{ margin: '0 0 8px 0' }}>{data.account_combination}</p>
        <p style={{ margin: '0 0 4px 0' }}><strong>Value:</strong> ${data.amount.toLocaleString()}</p>
        <p style={{ margin: '0' }}><strong>Journals:</strong> {data.journal_count.toLocaleString()}</p>
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
        const accountData = await api.getADA2Main();

        // Transform data for scatter plot
        const transformedData = accountData.map(account => ({
          ...account,
          x: account.amount,
          y: account.journal_count
        }));

        setData(transformedData);

        // Calculate axis limits
        const maxValue = Math.max(...accountData.map(d => d.amount));
        const maxJournals = Math.max(...accountData.map(d => d.journal_count));

        const xLimit = Math.ceil(maxValue / 10000) * 10000;
        const yLimit = Math.ceil(maxJournals / 1000) * 1000;

        const xTicks = Array.from(
          { length: 6 },
          (_, i) => Math.round(xLimit / 5 * i)
        );

        const yTicks = Array.from(
          { length: 5 },
          (_, i) => Math.round(yLimit / 4 * i)
        );

        setAxisConfig({
          maxX: xLimit,
          maxY: yLimit,
          xTicks,
          yTicks
        });
      } catch (error) {
        console.error('Error fetching account data:', error);
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
        <h3 style={{ margin: 0 }}>Count and Total Value of Postings per Account Pattern</h3>
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
          margin={{ top: 20, right: 20, bottom: 40, left: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="x"
            scale={useLogScale ? 'log' : 'linear'}
            type="number"
            domain={useLogScale ? [1, 'auto'] : [0, axisConfig.maxX]}
            ticks={useLogScale ? undefined : axisConfig.xTicks}
            tickFormatter={value => `$${abbreviateNumber(value)}`}
            tickLine={false}
            tickSize={10}
            axisLine={false}
            label={{
              value: 'Value',
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
            tickFormatter={value => abbreviateNumber(value)}
            tickLine={false}
            tickSize={10}
            axisLine={false}
            label={{
              value: 'Number of Journals',
              angle: -90,
              position: 'insideLeft',
              offset: -10,
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