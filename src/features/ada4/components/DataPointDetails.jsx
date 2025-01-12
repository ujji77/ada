import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Icon } from '@fluentui/react/lib/Icon';
import { api } from '../../../services/api';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const DataPointDetails = () => {
  const [rowData, setRowData] = useState([]);

  // Custom Styles for AG Grid
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
      headerName: 'Days forward/backdated',
      field: 'days',
      width: 180,
      valueFormatter: (params) => params.value.toString(),
    },
    {
      headerName: 'Month',
      field: 'month',
      width: 120,
    },
    {
      headerName: 'Value',
      field: 'value',
      width: 150,
      valueFormatter: (params) => `$${params.value.toLocaleString()}`,
      sort: 'desc', // Default sort
      sortIndex: 0,  // Primary sort column
    },
    {
      headerName: 'Journals',
      field: 'journals',
      width: 100,
      valueFormatter: (params) => params.value.toLocaleString(),
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

  const defaultColDef = {
    sortable: true,
    resizable: true,
    suppressMovable: true,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getADA4Main();
        setRowData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const gridOptions = {
    onGridReady: (params) => {
      params.api.sizeColumnsToFit();
    },
    onGridSizeChanged: (params) => {
      params.api.sizeColumnsToFit();
    }
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
          rowData={rowData}
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
          {...gridOptions}
        />
      </div>
    </div>
  );
};

export default DataPointDetails;