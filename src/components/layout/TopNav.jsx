import React from 'react';
import { IconButton } from '@fluentui/react/lib/Button';

const styles = {
  topNav: {
    borderBottom: '1px solid #eee',
    backgroundColor: 'white',
    padding: '12px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px'
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  brandText: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#333'
  },
  button: {
    padding: '6px 16px',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer'
  },
  confirmButton: {
    backgroundColor: '#f3f3f3',
    border: 'none',
    color: '#333'
  },
  outliersButton: {
    backgroundColor: 'white',
    border: '1px solid #C84C0C',
    color: '#C84C0C'
  },
  questionIcon: {
    color: '#666',
    fontSize: '16px',
    marginLeft: '8px',
    cursor: 'pointer'
  }
};

const TopNav = () => {
  return (
    <div style={styles.topNav}>
      <div style={styles.leftSection}>
        <span style={styles.brandText}>Alchemy</span>
        <span style={styles.brandText}>Audit Data Analytics</span>
        <i className="ms-Icon ms-Icon--Info" style={styles.questionIcon} />
      </div>
      <div style={styles.rightSection}>
        <button style={{...styles.button, ...styles.confirmButton}}>
          Confirm
        </button>
        <button style={{...styles.button, ...styles.outliersButton}}>
          Outliers
        </button>
        <IconButton
          iconProps={{ iconName: 'Settings' }}
          styles={{ root: { color: '#666' } }}
        />
        <IconButton
          iconProps={{ iconName: 'Cancel' }}
          styles={{ root: { color: '#666' } }}
        />
      </div>
    </div>
  );
};

export default TopNav;