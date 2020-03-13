import { NextComponentType } from "next";

import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  SkipToContent,
} from 'carbon-components-react';

const AppHeader: NextComponentType = () => (
  <Header style={{ backgroundColor: "#237586" }} aria-label="Hedron Dashboard">
    <SkipToContent />
    <HeaderName href="/" prefix="Hedron">
      Dashboard
    </HeaderName>
    <HeaderNavigation aria-label="Hedron Dasboard">
      <HeaderMenuItem style={{ backgroundColor: "#237586", color: "#fff" }} href="https://hedron.now.sh">
        Discover & Buy Products
      </HeaderMenuItem>
    </HeaderNavigation>
    <HeaderGlobalBar />
  </Header>
);
      
export default AppHeader;