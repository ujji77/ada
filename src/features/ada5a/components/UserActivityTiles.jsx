import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { api } from '../../../services/api';
import { calculateGroupPercentages } from '../../../utils/percentageCalculations';
import SortToggleButton from '../../../components/shared/SortToggleButton';
import { useSort } from '../../../contexts/SortContext';
import _ from 'lodash';
import './UserActivityTiles.css';

const ActivityCell = (props) => {
  if (!props.value) return null;

  const { amount, percentage } = props.value;
  
  return (
    <div className="activity-cell">
      <div className="cell-content">
        <div className="amount">
          {typeof amount === 'number' && !Number.isInteger(amount) 
            ? `$${amount.toLocaleString()}` 
            : amount.toLocaleString()}
        </div>
        <div 
          className="activity-bar" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const UserActivityTiles = () => {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rawData, setRawData] = useState(null);
  const { sortByValue, handleToggleSort } = useSort();

  const transformData = (detailData, sortByValue) => {
    const users = _.uniq(detailData.map(item => item.user_name));
    const valueField = sortByValue ? 'volume' : 'journal_count';
    
    const dataWithPercentages = calculateGroupPercentages(detailData, 'user_name', valueField);

    const cols = [
      {
        headerName: '',
        field: 'day',
        pinned: 'left',
        cellClass: 'centered-cell',
        width: 100,
        cellStyle: { 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
        headerClass: 'centered-header'
      },
      ...users.map(user => ({
        headerName: user,
        field: user,
        cellRenderer: ActivityCell,
        width: 150,
        headerClass: 'centered-header'
      }))
    ];
    
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const rows = days.map(day => {
      const row = { day };
      users.forEach(user => {
        const userDay = dataWithPercentages.find(item => 
          item.day === day && 
          item.user_name === user
        );
        if (userDay) {
          row[user] = {
            amount: userDay[valueField],
            percentage: userDay.percentage
          };
        }
      });
      return row;
    });

    return { cols, rows };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getADA5AMain();
        const detailData = data.filter(row => !row.isGroup);
        setRawData(detailData);
        
        const { cols, rows } = transformData(detailData, sortByValue);
        setColumnDefs(cols);
        setRowData(rows);
      } catch (error) {
        console.error('Error fetching activity data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (rawData) {
      const { cols, rows } = transformData(rawData, sortByValue);
      setColumnDefs(cols);
      setRowData(rows);
    }
  }, [sortByValue, rawData]);

  const defaultColDef = {
    sortable: false,
    resizable: false,
    suppressMovable: true,
    cellStyle: { padding: 4 }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="user-activity-container">
      <div className="activity-header">
        <h3>Count and Total Value of Postings per User</h3>
        <span style={{ 
          color: '#666',
          cursor: 'help',
          fontSize: '14px'
        }}>ⓘ</span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>Journals selected (0)</span>
          <button className="add-button">Add</button>
          <button className="clear-button">Clear all</button>
          <SortToggleButton sortByValue={sortByValue} handleToggleSort={handleToggleSort} />
        </div>
      </div>
      <div 
        className="ag-theme-alpine" 
        style={{ 
          height: 'calc(100vh - 200px)',
          width: '100%'
        }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          suppressRowHoverHighlight={true}
          suppressCellSelection={true}
          headerHeight={50}
          rowHeight={50}
          domLayout='normal'
        />
      </div>
    </div>
  );
};

export default UserActivityTiles;