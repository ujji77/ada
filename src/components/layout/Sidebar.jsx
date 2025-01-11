import React from 'react';
import { Nav } from '@fluentui/react/lib/Nav';
import { IconButton } from '@fluentui/react/lib/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { routes } from '../../constants/routes';

const Sidebar = ({ isCollapsed, onCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the active route id from the current path
  const activeTab = routes.find(route => route.path === location.pathname)?.id || 'ada1';

  const navItems = routes.map(route => ({
    key: route.id,
    name: isCollapsed ? '' : route.label,
    iconProps: { iconName: route.icon },
    url: route.path,  // Add the URL property
    onClick: () => navigate(route.path)  // Use navigate instead of onTabChange
  }));

  return (
    <div 
      style={{ 
        width: isCollapsed ? '48px' : '250px',
        transition: 'width 0.3s',
        borderRight: '1px solid #eee',
        height: '100vh',
        backgroundColor: '#f8f8f8'
      }}
    >
      <IconButton
        iconProps={{ iconName: isCollapsed ? 'ChevronRight' : 'ChevronLeft' }}
        onClick={() => onCollapse(!isCollapsed)}
        style={{ margin: '8px' }}
      />
      <Nav
        selectedKey={activeTab}
        groups={[{ links: navItems }]}
        styles={{
          root: {
            width: isCollapsed ? '48px' : '250px',
            transition: 'width 0.3s',
            overflowX: 'hidden'
          }
        }}
      />
    </div>
  );
};

export default Sidebar;