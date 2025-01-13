import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { api } from '../../../services/api';
import SortToggleButton from '../../../components/shared/SortToggleButton';

const CustomBarLabel = ({ x, y, width, value }) => {
  const formattedValue = new Intl.NumberFormat().format(value);
  const minWidthForInternalLabel = 70;
  const isLabelInternal = width > minWidthForInternalLabel;
  
  return (
    <text
      x={isLabelInternal ? x + width - 8 : x + width + 8}
      y={y + 15}
      textAnchor={isLabelInternal ? "end" : "start"}
      fill={isLabelInternal ? "white" : "#666"}
      fontSize="12"
    >
      {formattedValue}
    </text>
  );
};

const FilterBarChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortByValue, setSortByValue] = useState(true);
  const [rawData, setRawData] = useState(null);

  const transformData = (responseData, useValue) => {
    return responseData
      .filter(row => row.isGroup)
      .map(item => ({
        day: item.day.slice(0, 3),
        value: useValue ? item.volume : item.journal_count
      }))
      .sort((a, b) => {
        const dayOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        return dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await api.getADA5AMain();
        setRawData(responseData);
        const transformedData = transformData(responseData, sortByValue);
        setData(transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (rawData) {
      const transformedData = transformData(rawData, sortByValue);
      setData(transformedData);
    }
  }, [sortByValue, rawData]);

  const handleToggleSort = () => {
    setSortByValue(prev => !prev);
  };

  if (loading) return <div>Loading chart data...</div>;

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '16px',
      }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>
          {sortByValue ? 'Value' : 'Number of Journals'}
        </h3>
        <span style={{ 
          color: '#666',
          cursor: 'help',
          fontSize: '14px'
        }}>ⓘ</span>
        <div style={{ marginLeft: 'auto' }}>
          <SortToggleButton sortByValue={sortByValue} handleToggleSort={handleToggleSort} />
        </div>
      </div>
      <BarChart
        width={600}
        height={300}
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 100, left: 40, bottom: 5 }}
      >
        <XAxis
          type="number"
          hide={true}
        />
        <YAxis
          type="category"
          dataKey="day"
          axisLine={false}
          tickLine={false}
          tick={{ 
            fontSize: 12, 
            fill: '#666',
            dx: -10
          }}
          width={40}
          label={{ 
            value: 'Weekday',
            angle: -90,
            position: 'insideLeft',
            offset: -20,
            style: { textAnchor: 'middle' }
          }}
        />
        <Tooltip
          formatter={(value) => new Intl.NumberFormat().format(value)}
          cursor={false}
        />
        <Bar
          dataKey="value"
          fill="#C84C0C"
          radius={[0, 4, 4, 0]}
          barSize={20}
          label={<CustomBarLabel />}
        />
      </BarChart>
    </div>
  );
};

export default FilterBarChart;