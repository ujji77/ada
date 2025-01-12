import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { api } from '../../../services/api';
import _ from 'lodash';
import './UserActivityTiles.css'

const ActivityCell = (props) => {
    if (!props.value) return null;
  
    const { amount, percentage } = props.value;
    
    return (
      <div className="activity-cell">
        <div className="cell-content">
          <div className="amount">${amount.toLocaleString()}</div>
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

  // Calculate percentage of total for each user's daily amount
  const calculatePercentages = (data) => {
    // Group by user_name to get totals
    const userTotals = {};
    data.forEach(item => {
      if (!userTotals[item.user_name]) {
        userTotals[item.user_name] = 0;
      }
      userTotals[item.user_name] += item.volume;
    });

    // Add percentage to each record
    return data.map(item => ({
      ...item,
      percentage: (item.volume / userTotals[item.user_name]) * 100
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await api.getADA5AMain();
        
        // Filter out summary rows and get unique users
        const detailData = rawData.filter(row => !row.isGroup);
        const users = _.uniq(detailData.map(item => item.user_name));
        
        // Calculate percentages
        const dataWithPercentages = calculatePercentages(detailData);

        // Create column definitions
        const cols = [
            {
            headerName: '',
            field: 'day',
            pinned: 'left',
            cellClass: 'centered-cell',
            width: 100,
            // Add center alignment for the day column
            cellStyle: { 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            },
            // Center align the header
            headerClass: 'centered-header'
            },
            ...users.map(user => ({
            headerName: user,
            field: user,
            cellRenderer: ActivityCell,
            width: 150,
            // Center align user headers
            headerClass: 'centered-header'
            }))
        ];
        
        // Create row data
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
                amount: userDay.volume,
                percentage: userDay.percentage
              };
            }
          });
          return row;
        });

        setColumnDefs(cols);
        setRowData(rows);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching activity data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const defaultColDef = {
    sortable: false,
    resizable: false,
    suppressMovable: true,
    cellStyle: { padding: 0 }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="user-activity-container">
      <div className="activity-header">
        <h3>Count and Total Value of Postings per User</h3>
        <div className="header-actions">
          <span>Journals selected (0)</span>
          <button className="add-button">Add</button>
          <button className="clear-button">Clear all</button>
          <div className="sort-buttons">
            <button className="active">By value</button>
            <button>By journal count</button>
          </div>
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
          headerHeight={60}
          rowHeight={60}
          domLayout='normal'
        />
      </div>
    </div>
  );
};

export default UserActivityTiles;