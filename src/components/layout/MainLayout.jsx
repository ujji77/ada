// src/components/layout/MainLayout.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import AdaLayout from '../shared/AdaLayout';

// Configuration for each ADA
const adaConfigs = {
  ada1: {
    title: "Revenue to AR",
    materialityAmount: "$550,000"
  },
  ada6: {
    title: "Revenue to AR",
    materialityAmount: "$550,000"
  },
  // Add more ADA configurations as needed
};

const MainLayout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();
  
  // Get the current ADA from the path
  const currentAda = location.pathname.split('/')[1] || 'ada1';
  const adaConfig = adaConfigs[currentAda] || adaConfigs.ada1;

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopNav />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar 
          isCollapsed={isSidebarCollapsed}
          onCollapse={setIsSidebarCollapsed}
        />
        <div style={{ 
          flex: 1, 
          padding: '24px',
          backgroundColor: 'white',
          overflow: 'auto'
        }}>
          <AdaLayout
            title={adaConfig.title}
            materialityAmount={adaConfig.materialityAmount}
          >
            {children}
          </AdaLayout>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;