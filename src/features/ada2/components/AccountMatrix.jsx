import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Icon } from '@fluentui/react/lib/Icon';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { api } from '../../../services/api';

initializeIcons();

const MatrixCell = (props) => {
  const formatAmount = (amount) => {
    return `${(amount / 1000000).toFixed(1)}M`;
  };

  const formatCount = (count) => {
    if (count >= 1000000) return `${(count/1000000).toFixed(1)}m`;
    if (count >= 1000) return `${(count/1000).toFixed(1)}k`;
    return count.toString();
  };

  if (!props.value) return null;

  return (
    <div 
      className={`matrix-cell ${props.selected ? 'selected' : ''}`}
      title={`
        AR ${props.rowIndex + 1} × Rev ${props.colDef.headerName.split(' ')[1]}
        Amount: $${props.value.amount.toLocaleString()}
        Journals: ${props.value.journalCount.toLocaleString()}
      `}
    >
      <div className="cell-content">
        <div style={{ fontWeight: 500, fontSize: '14px' }}>
          {formatAmount(props.value.amount)}
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '4px',
          color: '#666',
          fontSize: '12px',
          marginTop: '4px'
        }}>
          <Icon iconName="AccountActivity" style={{ fontSize: 12 }} />
          <span>{formatCount(props.value.journalCount)}</span>
        </div>
      </div>
    </div>
  );
};

const AccountMatrix = () => {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultColDef = {
    sortable: false,
    resizable: false,
    suppressMovable: true,
    flex: 1,
    minWidth: 120,
    maxWidth: 120,
    cellStyle: { 
      padding: '2px',
      border: 'none' 
    },
    headerClass: 'centered-header'
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await api.getADA2Main();
        
        const debitAccounts = [...new Set(rawData.map(item => item.debit_account))];
        const creditAccounts = [...new Set(rawData.map(item => item.credit_account))];

        const cols = [
          {
            headerName: '',
            field: 'debitAccount',
            pinned: 'left',
            cellClass: 'centered-cell',
            valueFormatter: params => `AR ${params.node.rowIndex + 1}`,
            minWidth: 100,
            flex: 0.5
          },
          ...creditAccounts.map((credit, index) => ({
            headerName: `Rev ${index + 1}`,
            field: credit,
            cellRenderer: MatrixCell
          }))
        ];

        const rows = debitAccounts.map(debit => {
          const row = { debitAccount: debit };
          creditAccounts.forEach(credit => {
            const match = rawData.find(item => 
              item.debit_account === debit && 
              item.credit_account === credit
            );
            if (match) {
              row[credit] = {
                amount: match.amount,
                journalCount: match.journal_count
              };
            }
          });
          return row;
        });

        setColumnDefs(cols);
        setRowData(rows);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching matrix data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginBottom: '16px',
        flexShrink: 0
      }}>
        <h3>Account Combination Matrix</h3>
        <button style={{ color: '#E86C00', border: 'none', background: 'none', cursor: 'pointer' }}>
          Clear filters
        </button>
      </div>
      <div style={{ textAlign: 'center', marginBottom: '16px', color: '#666', flexShrink: 0 }}>
        Credit Accounts
      </div>
      <div 
        className="ag-theme-alpine" 
        style={{ 
          height: '100%',
          width: '100%',
          overflow: 'auto',
          '--ag-header-height': '120px',
          '--ag-row-height': '120px',
          '--ag-header-background-color': '#fff',
          '--ag-header-cell-hover-background-color': '#fff',
          '--ag-row-hover-color': 'transparent',
          '--ag-borders': 'none',
          '--ag-borders-critical': 'none',
          '--ag-borders-secondary': 'none',
          '--ag-row-border-style': 'none',
          '--ag-row-border-width': '0',
          '--ag-row-border-color': 'transparent',
          '--ag-cell-horizontal-border': 'none',
          '--ag-cell-vertical-border': 'none',
          '--ag-header-column-separator-display': 'none',
          '--ag-header-column-resize-handle-display': 'none',
          '--ag-cell-horizontal-padding': '2px',
          '--ag-cell-vertical-padding': '2px',
          '--ag-selected-row-background-color': 'transparent',
          '--ag-range-selection-border-color': 'transparent',
          '--ag-range-selection-background-color': 'transparent',
          '--ag-cell-focus-color': 'transparent'
        }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          suppressRowHoverHighlight={true}
          suppressCellSelection={true}
          headerHeight={120}
          rowHeight={120}
          suppressHorizontalScroll={false}
          domLayout='normal'
        />
      </div>

      <style>{`
        .matrix-cell {
          width: 100%;
          height: 100%;
          padding: 2px;
        }
        
        .cell-content {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: white;
          border-radius: 8px;
          border: 1px solid #e0e0e0;
          transition: all 0.2s ease;
        }
        
        .matrix-cell:hover .cell-content {
          border-color: #E86C00;
          border-width: 2px;
          box-shadow: 0 0 8px rgba(232, 108, 0, 0.3);
        }
        
        .matrix-cell.selected .cell-content {
          background-color: #E86C00;
          border-color: #E86C00;
          color: white;
        }
        
        .matrix-cell.selected .cell-content > div {
          color: white;
        }

        .centered-header {
          display: flex;
          align-items: center;
          justify-content: center;
          background: none !important;
          border: none !important;
          min-height: 120px !important;
        }

        .centered-cell {
          display: flex;
          align-items: center;
          justify-content: center;
          background: none !important;
          border: none !important;
        }

        .ag-header {
          border: none !important;
        }

        .ag-header-row {
          border: none !important;
          height: 120px !important;
        }

        .ag-header-cell {
          border: none !important;
          height: 120px !important;
        }

        .ag-header-cell-text {
          text-align: center;
          width: 100%;
        }

        .ag-row {
          border: none !important;
        }

        .ag-cell {
          border: none !important;
        }

        .ag-cell:focus {
          outline: none !important;
          border: none !important;
        }
      `}</style>
    </div>
  );
};

export default AccountMatrix;