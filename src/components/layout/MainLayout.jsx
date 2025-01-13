import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import { routes } from '../../constants/routes';

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f8f8f8'
  },
  content: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden'
  },
  mainArea: {
    flex: 1,
    overflow: 'auto',
    padding: '24px'
  },
  headerContainer: {
    backgroundColor: '#f3f3f3',
    borderRadius: '4px',
    marginBottom: '16px'
  },
  headerContent: {
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#333',
    fontSize: '14px'
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: '#666',
    fontSize: '14px'
  },
  currencyContainer: {
    backgroundColor: 'white',
    padding: '4px 12px',
    borderRadius: '999px',
    fontSize: '14px'
  },
  materialityContainer: {
    backgroundColor: 'white',
    padding: '4px 12px',
    borderRadius: '999px',
    fontSize: '14px'
  },
  divider: {
    margin: '0 8px',
    color: '#666'
  },
  statusTag: {
    backgroundColor: '#f3f3f3',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    color: '#666',
    marginLeft: '8px'
  },
  notificationContainer: {
    backgroundColor: '#f3f3f3',
    borderRadius: '4px',
    marginBottom: '16px'
  },
  notification: {
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  notificationLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  notificationIcon: {
    color: '#666'
  },
  notificationText: {
    color: '#333',
    fontSize: '14px'
  },
  completeButton: {
    backgroundColor: 'white',
    border: '1px solid #ddd',
    padding: '6px 16px',
    borderRadius: '4px',
    fontSize: '14px',
    color: '#333',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f8f8f8'
    }
  },
  childrenContainer: {
    backgroundColor: 'white',
    borderRadius: '4px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    padding: '24px'
  },
  routePath: {
    color: '#666',
    fontSize: '14px',
    marginLeft: '4px'
  }
};

const MainLayout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();
  
  // Get current route information
  const currentPath = location.pathname.split('/')[1] || 'ada1';
  const currentRoute = routes.find(route => route.id === currentPath);

  // Format the route path (e.g., "ada1" -> "ADA 1")
  const formattedPath = currentRoute?.id
    ? `(${currentRoute.id.replace('ada', 'ADA ').toUpperCase()})`
    : '';
  
  return (
    <div style={styles.container}>
      <TopNav />
      <div style={styles.content}>
        <Sidebar 
          isCollapsed={isSidebarCollapsed}
          onCollapse={setIsSidebarCollapsed}
        />
        <div style={styles.mainArea}>
          <div style={styles.headerContainer}>
            <div style={styles.headerContent}>
              <div style={styles.headerLeft}>
                <span>Revenue to AR</span>
                <span style={styles.divider}>|</span>
                <span>{currentRoute?.label}</span>
                <span style={styles.routePath}>{formattedPath}</span>
                <span style={styles.statusTag}>{currentRoute?.status || 'Not prepared'}</span>
              </div>
              <div style={styles.headerRight}>
                <div style={styles.currencyContainer}>USD</div>
                <div style={styles.materialityContainer}>Performance materiality: $550,000</div>
              </div>
            </div>
          </div>

          <div style={styles.notificationContainer}>
            <div style={styles.notification}>
              <div style={styles.notificationLeft}>
                <i className="ms-Icon ms-Icon--Info" style={styles.notificationIcon} />
                <span style={styles.notificationText}>
                  No outliers selected. If none exist, mark the ADA as completed without outliers.
                </span>
              </div>
              <button style={styles.completeButton}>
                Complete - no outliers
              </button>
            </div>
          </div>

          <div style={styles.childrenContainer}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;