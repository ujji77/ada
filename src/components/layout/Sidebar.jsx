import React from 'react';
import { Nav } from '@fluentui/react/lib/Nav';
import { IconButton } from '@fluentui/react/lib/Button';
import { routes } from '../../constants/routes';

const Sidebar = ({ isCollapsed, onCollapse, activeTab, onTabChange }) => {
  const navItems = routes.map(route => ({
    key: route.id,
    name: isCollapsed ? '' : route.label,
    iconProps: { iconName: route.icon },
    onClick: () => onTabChange(route.id)
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