import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Copy } from 'lucide-react';
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
            cellClass: 'checkbox-cell'
        },
        {
            headerName: 'User',
            field: 'user',
            width: 150
        },
        {
            headerName: 'Value',
            field: 'value',
            width: 120,
            valueFormatter: params => {
                return params.value ? `$${params.value.toLocaleString()}` : '';
            }
        },
        {
            headerName: 'Journals',
            field: 'journals',
            width: 100,
            valueFormatter: params => {
                return params.value ? params.value.toLocaleString() : '';
            }
        },
        {
            headerName: 'Smallest amount',
            field: 'smallest_amount',
            width: 120,
            valueFormatter: params => {
                return params.value ? `$${params.value.toLocaleString()}` : '';
            }
        },
        {
            headerName: 'Largest amount',
            field: 'largest_amount',
            width: 120,
            valueFormatter: params => {
                return params.value ? `$${params.value.toLocaleString()}` : '';
            }
        },
        {
            headerName: 'Active period',
            field: 'active_period',
            width: 120
        },
        {
            headerName: '',
            field: 'copy',
            width: 50,
            cellRenderer: () => (
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    height: '100%' 
                }}>
                    <Copy size={16} color="#666" style={{ cursor: 'pointer' }} />
                </div>
            )
        }
    ];

    const defaultColDef = {
        sortable: true,
        resizable: true,
        suppressMovable: true,
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api.getADA6Main();
                setRowData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="data-point-details">
            <div className="grid-header" style={{
                padding: '16px 0',
                borderBottom: '1px solid #eaeaea',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h3 style={{ margin: 0 }}>Data Point Details</h3>
            </div>
            <div 
                className="ag-theme-alpine" 
                style={{ 
                    height: '500px', // Increased height to accommodate more columns
                    width: '100%',
                    ...gridStyle
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
                />
            </div>
        </div>
    );
};

export default DataPointDetails;