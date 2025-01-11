// src/components/layout/MainLayout.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

const MainLayout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('ada1');

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
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;