// src/components/tables/DataPointDetails.jsx
import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ClientSideRowModelModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { api } from '../../services/api';

const DataPointDetails = () => {
    const [rowData, setRowData] = useState([]);
    const [gridApi, setGridApi] = useState(null);

    // Column Definitions
    const columnDefs = [
        {
            headerName: '',  // Checkbox column
            field: 'checkboxSelection',
            checkboxSelection: true,
            headerCheckboxSelection: true,
            width: 40
        },
        {
            headerName: 'Amount',
            field: 'amount',
            width: 120,
            valueFormatter: params => {
                return params.value ? `$${params.value.toLocaleString()}` : '';
            }
        },
        {
            headerName: 'Journals',
            field: 'count',
            width: 100
        },
        {
            headerName: 'Effective date',
            field: 'effective_date',
            width: 150
        },
        {
            headerName: '',  // Copy icon column
            field: 'copy',
            width: 50,
            cellRenderer: () => {
                return '<i class="ms-Icon ms-Icon--Copy" style="color: #666; cursor: pointer;"></i>';
            }
        }
    ];

    // Grid Options
    const defaultColDef = {
        sortable: true,
        resizable: true
    };

    const onGridReady = (params) => {
        setGridApi(params.api);
    };

    // Fetch data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api.getADA1Main();
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
                    height: '300px',
                    width: '100%'
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
                    onGridReady={onGridReady}
                />
            </div>
        </div>
    );
};

export default DataPointDetails;