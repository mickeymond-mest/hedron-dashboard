import { NextComponentType } from 'next';
import Head from 'next/head';

import '../styles/styles.scss';

import Header from '../components/Header';

const NAV_ITEMS = [
  { label: "Home", icon: "home", link: "/" },
  { label: "Dashboard", icon: "dashboard", link: "/dashboard" },
  { label: "Inbox", icon: "inbox", link: "/inbox" },
  { label: "Products", icon: "verified_user", link: "/products" },
  { label: "My Leads", icon: "perm_identity", link: "/leads" },
  { label: "Chat Room", icon: "chat", link: "/chat" },
  { label: "Calendar", icon: "calendar_today", link: "/calendar" },
  { label: "Help Center", icon: "help", link: "/help" },
  { label: "Settings", icon: "settings", link: "/settings" },
];

const DefaultLayout: NextComponentType = props => (
  <div className="columns hedron-layout">
    <div className="column is-2 hedron-sidebar">
      <div className="has-text-white hedron-logo">
        <span>DEEGIFY</span>
      </div>
      {NAV_ITEMS.map(item => (
        <div key={item.link} className={
          item.link === '/calendar' ?
          "has-text-white hedron-sidebar-menu hedron-sidebar-menu-selected":
          "has-text-white hedron-sidebar-menu"
        }>
          <i className="material-icons">{item.icon}</i>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
    <div className="column">
      <Head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </Head>
      <Header />
      {props.children}
    </div>
  </div>
);

export default DefaultLayout;