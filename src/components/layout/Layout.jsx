// src/components/layout/Layout.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import MessageBox from '../shared/MessageBox';
import DataVisualization from '../shared/DataVisualization';
import DataPointDetails from '../tables/DataPointDetails';

const Layout = () => {
  const [activeTab, setActiveTab] = useState('amount');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopNav />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar 
          isCollapsed={isSidebarCollapsed}
          onCollapse={setIsSidebarCollapsed}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <div style={{ 
          flex: 1, 
          padding: '24px',
          backgroundColor: 'white',
          overflow: 'auto'
        }}>
          {/* Header Section */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 24
          }}>
            <h2 style={{ margin: 0 }}>Revenue to AR</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span>USD</span>
              <span>Performance materiality: $550,000</span>
            </div>
          </div>
          
          {/* Message Box */}
          <MessageBox 
            message="No outliers selected. If none exist, mark the ADA as completed without outliers."
            actionText="Complete - no outliers"
            onAction={() => console.log('Completed without outliers')}
          />
          
          {/* Data Visualization Section */}
          <DataVisualization />

          {/* Histogram and Data Point Details Section */}
          <div style={{ 
            display: 'flex', 
            gap: '24px', 
            marginTop: '24px'
          }}>
            {/* Left side - Histogram */}
            <div style={{ flex: 1 }}>
              <div style={{ 
                borderBottom: '1px solid #eaeaea',
                paddingBottom: '16px',
                marginBottom: '16px'
              }}>
                <h3 style={{ 
                  margin: 0, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px' 
                }}>
                  Histogram
                  <i className="ms-Icon ms-Icon--Info" style={{ color: '#666', fontSize: '14px' }} />
                </h3>
              </div>
              {/* Placeholder for Histogram Chart */}
              <div style={{ 
                height: '300px', 
                backgroundColor: '#f8f8f8', 
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                Histogram Chart will go here
              </div>
            </div>

            {/* Right side - Data Point Details */}
            <div style={{ flex: 1 }}>
              <DataPointDetails />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;