import React, { Component } from 'react';
import { NextPage, NextPageContext, NextApiRequest } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import { ApolloProvider } from '@apollo/client';

import auth0 from '../utils/auth0';
import apolloClient from '../utils/apolloClient';

import Drawer from 'rc-drawer';

import Header from '../components/Header';
import '../styles/styles.scss';
import { links } from '../utils/data';

type LayoutProps = {
  user: object | null;
  authenticated: boolean;
}

const client = apolloClient();

const DefaultLayout = (WrappedComponent: NextPage) => {
  return class extends Component<LayoutProps> {

    state = {
      isDrawerOpen: false
    }

    toggleDrawer = () => {
      this.setState({ isDrawerOpen: !this.state.isDrawerOpen });
    }

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
      const NAV_ITEMS = links[this.props.user['https://deegify.dev/roles'][0]] || [];
      return (
        <ApolloProvider client={client}>
          <Drawer
            open={this.state.isDrawerOpen}
            width="250px"
            handler={false}
          >
            <div
              style={this.state.isDrawerOpen ? { display: 'block' } : { display: 'none' }}
              className="hedron-sidebar">
              <div className="has-text-white hedron-logo">
                <span>HEDRON</span>
              </div>
              {NAV_ITEMS.map(item => (
                <div key={item.link} className="leadron-menu-container">
                  <Link href={item.link} as={item.as}>
                    <a
                      title={item.label}
                      onClick={e => {
                        this.toggleDrawer();
                      }}
                    >
                      <div className="has-text-white hedron-sidebar-menu">
                        <i className="material-icons">{item.icon}</i>
                        <span>{item.label}</span>
                      </div>
                    </a>
                  </Link>
                  {item.subs.map(sub => (
                    <Link key={sub.link} href={sub.link} as={sub.link}>
                      <a
                        title={sub.title}
                        onClick={e => {
                          this.toggleDrawer();
                        }}
                      >
                        <div className="has-text-white hedron-sidebar-menu hedron-sidebar-menu-sub">
                          <i className="material-icons">{sub.icon}</i>
                          <span>{sub.label}</span>
                        </div>
                      </a>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </Drawer>
          <div
            className="columns is-gapless hedron-layout"
            onClick={e => {
              // this.toggleDrawer();
            }}
          >
            <div className="hedron-main column">
              <Head>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css" />
              </Head>
              <Header
                toggleDrawer={() => {
                  this.toggleDrawer();
                }}
              />
              <WrappedComponent {...this.props} />
              <br /><br />
              <footer className="footer">
                <div className="content has-text-centered">
                  <p>Hedron is the best</p>
                </div>
              </footer>
            </div>
          </div>
        </ApolloProvider>
      );
    }
  }
}

export default DefaultLayout;