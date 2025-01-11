import React, { useState, useEffect } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { Icon } from '@fluentui/react/lib/Icon';
import { api } from '../../../services/api';

initializeIcons();

const CELL_SPACING = 40; // Space between cells
const CELL_SIZE = 80;   // Base cell size

const AccountMatrix = () => {
  const [data, setData] = useState([]);
  const [uniqueDebitAccounts, setUniqueDebitAccounts] = useState([]);
  const [uniqueCreditAccounts, setUniqueCreditAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatCount = (count) => {
    if (count >= 1000000) return `${(count/1000000).toFixed(1)}m`;
    if (count >= 1000) return `${(count/1000).toFixed(1)}k`;
    return count.toString();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await api.getADA2Main();
        
        const debitAccounts = [...new Set(rawData.map(item => item.debit_account))];
        const creditAccounts = [...new Set(rawData.map(item => item.credit_account))];
        
        const matrixData = [];
        debitAccounts.forEach((debit, i) => {
          creditAccounts.forEach((credit, j) => {
            const match = rawData.find(item => 
              item.debit_account === debit && 
              item.credit_account === credit
            );

            if (match) {
              matrixData.push({
                x: j * CELL_SPACING, // Space out the x coordinates
                y: i * CELL_SPACING, // Space out the y coordinates
                debitAccount: debit,
                creditAccount: credit,
                amount: match.amount,
                journalCount: match.journal_count,
                debitIndex: i + 1,
                creditIndex: j + 1
              });
            }
          });
        });

        setData(matrixData);
        setUniqueDebitAccounts(debitAccounts);
        setUniqueCreditAccounts(creditAccounts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching matrix data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatAmount = (amount) => {
    return `${(amount / 1000000).toFixed(1)}M`;
  };

  const CustomCell = ({ cx, cy, payload }) => {
    if (!cx || !cy) return null;

    return (
      <g className="matrix-cell">
        <rect
          x={cx - CELL_SIZE/2}
          y={cy - CELL_SIZE/2}
          width={CELL_SIZE}
          height={CELL_SIZE}
          rx={8}
          fill="white"
          stroke="#e0e0e0"
          strokeWidth={1}
          className="cell-rect"
        />
        
        <text
          x={cx}
          y={cy - 10}
          textAnchor="middle"
          fill="#000"
          fontSize="14"
          fontWeight="500"
        >
          {formatAmount(payload.amount)}
        </text>
        
        <g transform={`translate(${cx - 15}, ${cy + 15})`}>
          <Icon 
            iconName="AccountActivity" 
            style={{ 
              fontSize: 12,
              color: '#666'
            }} 
          />
        </g>
        <text
          x={cx + 15}
          y={cy + 18}
          textAnchor="middle"
          fill="#666"
          fontSize="12"
        >
          {formatCount(payload.journalCount)}
        </text>

        {payload.x === 0 && (
          <text
            x={cx - CELL_SIZE/2 - 20}
            y={cy}
            textAnchor="end"
            fill="#000"
            fontSize="14"
          >
            {`AR ${payload.debitIndex}`}
          </text>
        )}
      </g>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload[0]) return null;

    const data = payload[0].payload;
    return (
      <div style={{
        backgroundColor: 'white',
        padding: '12px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <p style={{ margin: '0 0 8px 0' }}>
          <strong>{`AR ${data.debitIndex} × Rev ${data.creditIndex}`}</strong>
        </p>
        <p style={{ margin: '0 0 4px 0' }}>Amount: ${data.amount.toLocaleString()}</p>
        <p style={{ margin: '0' }}>Journals: {data.journalCount.toLocaleString()}</p>
      </div>
    );
  };

  if (loading) return <div>Loading matrix data...</div>;

  // Calculate the content size based on the number of accounts and spacing
  const contentWidth = (uniqueCreditAccounts.length * CELL_SPACING) + 200; // Extra space for labels
  const contentHeight = (uniqueDebitAccounts.length * CELL_SPACING) + 200; // Extra space for labels

  return (
    <div style={{ width: '100%' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginBottom: '16px' 
      }}>
        <h3>Account Combination Matrix</h3>
        <button style={{ color: '#E86C00', border: 'none', background: 'none', cursor: 'pointer' }}>
          Clear filters
        </button>
      </div>
      <div style={{ textAlign: 'center', marginBottom: '16px', color: '#666' }}>
        Credit Accounts
      </div>
      <div style={{ 
        height: '600px', 
        overflow: 'auto',
        border: '1px solid #eaeaea',
        borderRadius: '8px',
        padding: '20px'
      }}>
        <div style={{ 
          width: contentWidth, 
          height: contentHeight, 
          position: 'relative' 
        }}>
          <ScatterChart
            width={contentWidth}
            height={contentHeight}
            margin={{ top: 40, right: 40, bottom: 40, left: 100 }}
          >
            <XAxis 
              type="number" 
              dataKey="x" 
              domain={[0, (uniqueCreditAccounts.length - 1) * CELL_SPACING]}
              tickFormatter={(value) => `Rev ${Math.floor(value/CELL_SPACING) + 1}`}
              ticks={Array.from({ length: uniqueCreditAccounts.length }, (_, i) => i * CELL_SPACING)}
            />
            <YAxis 
              type="number" 
              dataKey="y" 
              domain={[0, (uniqueDebitAccounts.length - 1) * CELL_SPACING]}
              tickFormatter={(value) => ''}
              ticks={Array.from({ length: uniqueDebitAccounts.length }, (_, i) => i * CELL_SPACING)}
              label={{ 
                value: 'Debit Accounts', 
                angle: -90,
                position: 'insideLeft',
                offset: -80 
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter 
              data={data} 
              shape={<CustomCell />}
            />
          </ScatterChart>
        </div>
      </div>

      <style>{`
        .matrix-cell:hover .cell-rect {
          stroke: #E86C00;
          stroke-width: 2;
          filter: drop-shadow(0px 0px 8px rgba(232, 108, 0, 0.3));
          transition: all 0.2s ease;
        }
      `}</style>
    </div>
  );
};

export default AccountMatrix;