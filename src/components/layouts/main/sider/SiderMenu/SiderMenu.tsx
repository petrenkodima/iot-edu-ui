import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import * as S from './SiderMenu.styles';
import { sidebarNavigation, SidebarNavigationItem } from '../sidebarNavigation';
import { Menu } from 'antd';
import { getRole } from '@app/api/iot-edu/FetchDataWithToken';

interface SiderContentProps {
  setCollapsed: (isCollapsed: boolean) => void;
}

const sidebarNavFlat = sidebarNavigation.reduce(
  (result: SidebarNavigationItem[], current) =>
    result.concat(current.children && current.children.length > 0 ? current.children : current),
  [],
);

const SiderMenu: React.FC<SiderContentProps> = ({ setCollapsed }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const currentMenuItem = sidebarNavFlat.find(({ url }) => url === location.pathname);
  const defaultSelectedKeys = currentMenuItem ? [currentMenuItem.key] : [];

  const openedSubmenu = sidebarNavigation.find(({ children }) =>
    children?.some(({ url }) => url === location.pathname),
  );
  const defaultOpenKeys = openedSubmenu ? [openedSubmenu.key] : [];

  return (
    <S.Menu
      mode="inline"
      defaultSelectedKeys={defaultSelectedKeys}
      defaultOpenKeys={defaultOpenKeys}
      onClick={() => setCollapsed(true)}
    >
      {sidebarNavigation
        //todo mb add const in future
        .filter((nav) => (t('iot.hide-template-sidebar-menu-items') ? !nav.old_template : true))
        .filter((item) => {
          if (item.role == 'default') return true;
          const roles = [...item.role.split('|')].map((i) => 'ROLE_' + i.toUpperCase());
          const currentRole = getRole() ?? '';
          console.log(roles);
          console.log(currentRole);
          return roles.includes(currentRole);
        })
        .map((nav) =>
          nav.children && nav.children.length > 0 ? (
            <Menu.SubMenu
              key={nav.key}
              title={t(nav.title)}
              icon={nav.icon}
              onTitleClick={() => setCollapsed(false)}
              popupClassName="d-none"
            >
              {nav.children
                .filter((item) => {
                  if (item.role == 'default') return true;
                  const roles = [...item.role.split('|')].map((i) => 'ROLE_' + i.toUpperCase());
                  const currentRole = getRole() ?? '';
                  console.log(roles);
                  console.log(currentRole);
                  return roles.includes(currentRole);
                })
                .map((childNav) => (
                  <Menu.Item key={childNav.key} title="">
                    <Link to={childNav.url || ''}>{t(childNav.title)}</Link>
                  </Menu.Item>
                ))}
            </Menu.SubMenu>
          ) : (
            <Menu.Item key={nav.key} title="" icon={nav.icon}>
              <Link to={nav.url || ''}>{t(nav.title)}</Link>
            </Menu.Item>
          ),
        )}
    </S.Menu>
  );
};

export default SiderMenu;
