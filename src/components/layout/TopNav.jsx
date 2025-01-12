// src/components/layout/TopNav.jsx
import React from 'react';
import { CommandBar } from '@fluentui/react/lib/CommandBar';

const TopNav = () => {
  const commandItems = [
    {
      key: 'confirm',
      text: 'Confirm',
      buttonStyles: { root: { backgroundColor: '#f3f3f3', marginRight: 8 } }
    },
    {
      key: 'outliers',
      text: 'Outliers',
      buttonStyles: { root: { borderColor: '#C84C0C', color: '#C84C0C' } }
    }
  ];

  const farItems = [
    {
      key: 'settings',
      iconProps: { iconName: 'Settings' },
      buttonStyles: { root: { color: '#666' } }
    },
    {
      key: 'close',
      iconProps: { iconName: 'Cancel' },
      buttonStyles: { root: { color: '#666' } }
    }
  ];

  return (
    <div style={{ borderBottom: '1px solid #eee', backgroundColor: 'white' }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px' }}>
        <div style={{ fontWeight: 500, marginRight: 24 }}>Alchemy</div>
        <div style={{ fontWeight: 500 }}>Audit Data Analytics</div>
        <div style={{ 
          backgroundColor: '#f3f3f3', 
          padding: '2px 6px', 
          borderRadius: 4, 
          marginLeft: 8 
        }}>0</div>
        <CommandBar
          items={commandItems}
          farItems={farItems}
          styles={{
            root: { border: 'none' }
          }}
        />
      </div>
    </div>
  );
};

export default TopNav;