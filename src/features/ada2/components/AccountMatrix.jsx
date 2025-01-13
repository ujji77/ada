import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Icon } from '@fluentui/react/lib/Icon';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { api } from '../../../services/api';
import './AccountMatrix.css';

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

  const { debitAccountName, creditAccountName } = props.value;

  return (
    <div 
      className={`matrix-cell ${props.selected ? 'selected' : ''}`}
      title={`
        ${debitAccountName} × ${creditAccountName}
        Amount: $${props.value.amount.toLocaleString()}
        Journals: ${props.value.journalCount.toLocaleString()}
      `}
    >
      <div className="cell-content">
        <div className="cell-amount">
          {formatAmount(props.value.amount)}
        </div>
        <div className="cell-stats">
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
    minWidth: 90,
    maxWidth: 90,
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
            minWidth: 60,
            maxWidth: 60,
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
                journalCount: match.journal_count,
                debitAccountName: match.debit_account_name || debit,
                creditAccountName: match.credit_account_name || credit
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
    <div className="account-matrix-container">
      <div className="matrix-header">
        <h3>Account Combination Matrix</h3>
        <span style={{ 
          color: '#666',
          cursor: 'help',
          fontSize: '14px'
        }}>ⓘ</span>
        <button>Clear filters</button>
      </div>
      <div className="matrix-side-label">
        Debit Accounts
      </div>
      <div className="matrix-subheader">
        Credit Accounts
      </div>

      <div 
        className="ag-theme-alpine" 
        style={{ 
          height: '100%',
          width: '100%',
          overflow: 'auto'
        }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          suppressRowHoverHighlight={true}
          suppressCellSelection={true}
          headerHeight={80}
          rowHeight={80}
          suppressHorizontalScroll={false}
          domLayout='normal'
        />
      </div>
    </div>
  );
};

export default AccountMatrix;