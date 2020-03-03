import React, { Component } from 'react';
import { NextPage, NextPageContext, NextApiRequest } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import { ApolloProvider } from '@apollo/client';

import auth0 from '../utils/auth0';
import apolloClient from '../utils/apolloClient';

import Header from '../components/Header';
import '../styles/styles.scss';

const NAV_ITEMS = [
  { label: "Home", icon: "home", link: "/index", as: "/" },
  { label: "Dashboard", icon: "dashboard", link: "/dashboard", as: "/dashboard" },
  { label: "Inbox", icon: "inbox", link: "/inbox", as: "/inbox" },
  { label: "Products", icon: "verified_user", link: "/products", as: "/products" },
  { label: "My Leads", icon: "perm_identity", link: "/leads", as: "/leads" },
  { label: "Chat Room", icon: "chat", link: "/chat", as: "/chat" },
  { label: "Help Center", icon: "help", link: "/help", as: "/help" },
  { label: "Settings", icon: "settings", link: "/settings", as: "/settings" },
];

type LayoutProps = {
  user: object | null;
  authenticated: boolean;
}

const client = apolloClient();

const DefaultLayout = (WrappedComponent: NextPage) => {
  return class extends Component<LayoutProps> {

    static async getInitialProps(ctx: NextPageContext) {
      const componentProps =
          WrappedComponent.getInitialProps &&
          (await WrappedComponent.getInitialProps(ctx));

      if (process.browser) {
        const response = await fetch(`${process.env.POST_LOGOUT_REDIRECT_URI}/api/token`);
        const session = await response.json();
        if (!session.user) {
          Router.push('/api/login');
          return { authenticated: false };
        } else {
          return { ...componentProps, ...session, authenticated: true };
        }
      } else {
        const session = await auth0.getSession((ctx.req as NextApiRequest));
        if (!session?.user) {
          ctx.res?.writeHead(302, {
            Location: '/api/login'
          });
          ctx.res?.end();
          return { authenticated: false };
        } else {
          return { ...componentProps, ...session, authenticated: true };
        }
      }
    }

    render () {
      return (
        <ApolloProvider client={client}>
          <div className="columns is-gapless hedron-layout">
            <div className="column is-2 hedron-sidebar">
              <div className="has-text-white hedron-logo">
                <span>HEDRONIZE</span>
              </div>
              {NAV_ITEMS.map(item => (
                <Link key={item.link} href={item.link} as={item.as}>
                  <a title={item.label}>
                    <div className="has-text-white hedron-sidebar-menu">
                      <i className="material-icons">{item.icon}</i>
                      <span>{item.label}</span>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
            <div className="hedron-main column">
              <Head>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
              </Head>
              <Header />
              <div className="hedron-content">
                <WrappedComponent {...this.props} />
                <footer className="footer">
                  <div className="content has-text-centered">
                    <p>
                      <strong>Bulma</strong> by <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is licensed<a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website contentis licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
                  </p>
                  </div>
                </footer>
              </div>
            </div>
          </div>
        </ApolloProvider>
      );
    }
  }
}

export default DefaultLayout;