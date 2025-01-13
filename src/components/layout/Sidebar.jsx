import React from 'react';
import { IconButton } from '@fluentui/react/lib/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { routes } from '../../constants/routes';

const styles = {
  sidebar: (isCollapsed) => ({
    width: isCollapsed ? '48px' : '250px',
    height: '100vh',
    backgroundColor: '#f8f8f8',
    transition: 'width 0.3s ease',
    borderRight: '1px solid #eee',
    overflow: 'hidden'
  }),
  
  sidebarHeader: (isCollapsed) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: isCollapsed ? 'center' : 'space-between',
    padding: isCollapsed ? '16px 0' : '16px',
    borderBottom: '1px solid #eee'
  }),

  headerTitle: {
    margin: 0,
    fontSize: '16px',
    fontWeight: 600
  },

  collapseButton: {
    padding: '4px',
    background: 'none'
  },

  navGroup: {
    padding: '16px 0'
  },

  navGroupHeader: {
    padding: '0 16px 8px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#666'
  },

  navLink: (isActive) => ({
    padding: '8px 16px',
    cursor: 'pointer',
    backgroundColor: isActive ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
    ':hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)'
    }
  }),

  navItem: (disabled) => ({
    width: '100%',
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer'
  }),

  navItemContent: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px'
  },

  navItemDot: (isActive) => ({
    width: '8px',
    height: '8px',
    border: '1px solid #C84C0C',
    borderRadius: '50%',
    marginTop: '6px',
    backgroundColor: isActive ? '#C84C0C' : 'transparent'
  }),

  navItemText: {
    flex: 1
  },

  navItemName: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#333',
    marginBottom: '4px'
  },

  navItemStatus: {
    fontSize: '12px',
    color: '#666'
  }
};

const Sidebar = ({ isCollapsed, onCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navGroups = [
    {
      name: 'Revenue to AR',
      links: routes.map(route => ({
        key: route.id,
        name: route.label,
        status: route.status,
        url: route.path,
        onClick: () => navigate(route.path),
        disabled: route.status === 'Insufficient data'
      }))
    }
  ];

  const CustomNavItem = ({ name, status, disabled }) => (
    <div style={styles.navItem(disabled)}>
      <div style={styles.navItemContent}>
        <div style={styles.navItemDot(location.pathname === `/ada${name.toLowerCase()}`)} />
        <div style={styles.navItemText}>
          <div style={styles.navItemName}>{name}</div>
          <div style={styles.navItemStatus}>{status}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={styles.sidebar(isCollapsed)}>
      <div style={styles.sidebarHeader(isCollapsed)}>
        {!isCollapsed && <h2 style={styles.headerTitle}>ADA Selection</h2>}
        <IconButton
          iconProps={{ iconName: isCollapsed ? 'ChevronRight' : 'ChevronLeft' }}
          onClick={() => onCollapse(!isCollapsed)}
          styles={{ root: styles.collapseButton }}
        />
      </div>
      {!isCollapsed && navGroups.map((group, index) => (
        <div key={index} style={styles.navGroup}>
          <div style={styles.navGroupHeader}>{group.name}</div>
          {group.links.map((link) => (
            <div
              key={link.key}
              style={styles.navLink(location.pathname === link.url)}
              onClick={!link.disabled ? link.onClick : undefined}
            >
              <CustomNavItem {...link} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;