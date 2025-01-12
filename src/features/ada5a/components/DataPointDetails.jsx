import React, { useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Icon } from '@fluentui/react/lib/Icon';
import { api } from '../../../services/api';
import _ from 'lodash';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const DataPointDetails = () => {
  const [rowData, setRowData] = useState([]);
  const [expandedDays, setExpandedDays] = useState(new Set());

  const processData = (data) => {
    // Define day order
    const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const processedRows = [];
    
    // Group data by day
    const groupedByDay = _.groupBy(data, 'day');
    
    // Process days in order
    dayOrder.forEach(day => {
      if (groupedByDay[day]) {
        const dayData = groupedByDay[day];
        
        // Find and add the summary row first
        const summaryRow = dayData.find(row => row.isGroup);
        if (summaryRow) {
          processedRows.push(summaryRow);
        }

        // Add child rows if day is expanded
        if (expandedDays.has(day)) {
          // Filter out summary row and sort remaining rows by volume
          const detailRows = dayData
            .filter(row => !row.isGroup)
            .sort((a, b) => b.volume - a.volume);
            
          processedRows.push(...detailRows);
        }
      }
    });

    return processedRows;
  };

  const gridStyle = {
    '--ag-font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
    '--ag-font-size': '12px',
    '--ag-cell-horizontal-padding': '12px',
    '--ag-header-column-separator-display': 'none',
    '--ag-header-background-color': '#f8f8f8',
    '--ag-row-hover-color': '#f5f5f5',
    '--ag-selected-row-background-color': 'rgba(232, 108, 0, 0.1)',
    '--ag-checkbox-checked-color': '#E86C00',
    '--ag-checkbox-unchecked-color': '#666',
    '--ag-checkbox-background-color': 'white',
    '--ag-checkbox-border-radius': '2px',
    '--ag-checkbox-border-color': '#666',
    '--ag-checkbox-indeterminate-color': '#E86C00',
  };

  const columnDefs = [
    {
      headerName: '',
      field: 'checkboxSelection',
      headerCheckboxSelection: true,
      checkboxSelection: true,
      width: 40,
      headerCheckboxSelectionFilteredOnly: true,
      showDisabledCheckboxes: true,
      pinned: 'left',
      lockPosition: true,
      suppressMenu: true,
      cellClass: 'checkbox-cell',
    },
    {
      headerName: 'Day of week',
      field: 'day',
      width: 180,
      cellRenderer: params => {
        const isGroup = params.data.isGroup;
        if (isGroup) {
          const isExpanded = expandedDays.has(params.data.day);
          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span 
                style={{ cursor: 'pointer', marginRight: '5px' }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDay(params.data.day);
                }}
              >
                {isExpanded ? '▼' : '▶'}
              </span>
              {params.value}
            </div>
          );
        }
        return <span style={{ marginLeft: '20px' }}>{params.value}</span>;
      }
    },
    {
      headerName: 'User count',
      field: 'user_count',
      width: 120,
      valueFormatter: params => {
        // Only show user count for group rows
        if (params.data.isGroup) {
          const day = params.data.day;
          const dayData = rowData.filter(row => row.day === day && !row.isGroup);
          return dayData.length.toString();
        }
        return '';
      }
    },
    {
      headerName: 'User',
      field: 'user_name',
      width: 180,
    },
    {
      headerName: 'Value',
      field: 'volume',
      width: 150,
      valueFormatter: params => params.value ? `$${params.value.toLocaleString()}` : '',
      sort: 'desc',
    },
    {
      headerName: 'Journals',
      field: 'journal_count',
      width: 100,
      valueFormatter: params => params.value?.toLocaleString() || '',
    },
    {
      headerName: '',
      field: 'copy',
      width: 50,
      cellRenderer: () => (
        <div className="flex items-center justify-center h-full">
          <Icon 
            iconName="AccountActivity" 
            className="cursor-pointer" 
            styles={{ 
              root: { 
                fontSize: 16,
                color: '#666'
              } 
            }} 
          />
        </div>
      ),
    },
  ];

  const toggleDay = (day) => {
    setExpandedDays((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(day)) {
        newSet.delete(day);
      } else {
        newSet.add(day);
      }
      return newSet;
    });
  };

  // Memoize display data to prevent unnecessary recalculations
  const displayData = useMemo(() => processData(rowData), [rowData, expandedDays]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getADA5AMain();
        setRowData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const defaultColDef = {
    sortable: true,
    resizable: true,
    suppressMovable: true,
  };

  return (
    <div className="data-point-details">
      <div className="py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="m-0">Data Point Details</h3>
      </div>
      <div
        className="ag-theme-alpine"
        style={{
          height: '400px',
          width: '100%',
          ...gridStyle,
        }}
      >
        <AgGridReact
          rowData={displayData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          suppressRowClickSelection={true}
          headerHeight={32}
          rowHeight={32}
          suppressCellFocus={true}
          suppressRowHoverHighlight={false}
          enableCellTextSelection={true}
          suppressRowDeselection={false}
          rowMultiSelectWithClick={true}
        />
      </div>
    </div>
  );
};

export default DataPointDetails;