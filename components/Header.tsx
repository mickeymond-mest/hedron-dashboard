import { NextComponentType } from "next";

import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  SkipToContent,
  HeaderGlobalAction,
  HeaderPanel,
  Switcher,
  SwitcherItem,
} from 'carbon-components-react';

import Search20 from '@carbon/icons-react/lib/search/20';
import Notification20 from '@carbon/icons-react/lib/notification/20';
import AppSwitcher20 from '@carbon/icons-react/lib/app-switcher/20';
import UserProfile20 from '@carbon/icons-react/lib/user--profile/20';
import { useState } from "react";

const AppHeader: NextComponentType = () => {
  const [hidePanel, setHidePanel] = useState(true);

  return (
    <Header aria-label="Hedron Dashboard">
      <SkipToContent />
      <HeaderName href="/" prefix="Hedron">
        Dashboard
      </HeaderName>
      <HeaderNavigation aria-label="Hedron Dasboard">
        <HeaderMenuItem href="https://hedron.now.sh">
          Discover & Buy Products
        </HeaderMenuItem>
      </HeaderNavigation>
      <HeaderGlobalBar>
        <HeaderGlobalAction aria-label="Search" onClick={() => { }}>
          <Search20 />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="Notifications" onClick={() => { }}>
          <Notification20 />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="User Profile" onClick={() => {
          setHidePanel(!hidePanel);
        }}>
          <UserProfile20 />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
      <HeaderPanel
        aria-label="Header Panel"
        hidden={hidePanel}
        expanded>
          <Switcher
            aria-label="Main Switcher">
            <SwitcherItem
              aria-label="Switcher Item"
              href="/api/logout">
              Sign Out
            </SwitcherItem>
          </Switcher>
        </HeaderPanel>
    </Header>
  );
}
      
export default AppHeader;