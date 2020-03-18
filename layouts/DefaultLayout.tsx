import React, { Component } from 'react';
import { NextPage, NextPageContext, NextApiRequest } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import { ApolloProvider } from '@apollo/client';
import {
  Content,
  SideNav,
  SideNavItems,
  SideNavMenu,
  SideNavMenuItem,
  Search
} from 'carbon-components-react';

import auth0 from '../utils/auth0';
import apolloClient from '../utils/apolloClient';

import Header from '../components/Header';
import { links } from '../utils/data';

import '../styles/styles.scss';
import { NextPageProps } from '../utils/PropTypes';

const client = apolloClient();

const DefaultLayout = (WrappedComponent: NextPage) => {
  return class extends Component<NextPageProps> {

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
          return {
            ...componentProps,
            ...session,
            authenticated: true,
            role: session.user['https://deegify.dev/roles'][0]
          };
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
          return {
            ...componentProps,
            ...session,
            authenticated: true,
            role: session?.user['https://deegify.dev/roles'][0]
          };
        }
      }
    }

    render () {
      const NAV_ITEMS = links[this.props.role] || [];
      return (
        <ApolloProvider client={client}>
          <Head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css" />
            <link href="https://cdn.jsdelivr.net/npm/suneditor@latest/dist/css/suneditor.min.css" rel="stylesheet" />
          </Head>
          <Header />
          {NAV_ITEMS.length ?  <SideNav
            expanded={true}
            isChildOfHeader={false}
            aria-label="Side navigation"
          >
            <SideNavItems>
            {NAV_ITEMS.map(parent => (
                <SideNavMenu key={parent.label} title={parent.label}>
                  {parent.subs.map(child => (
                    <SideNavMenuItem key={child.label} href={child.link}>
                      {child.label}
                    </SideNavMenuItem>
                  ))}
                </SideNavMenu>
            ))}
            </SideNavItems>
          </SideNav>: ''}
          <Content>
            {/* <Search id="hedron-search" labelText="Search Here" /> <br /><br /> */}
            <WrappedComponent {...this.props} />
          </Content>
        </ApolloProvider>
      );
    }
  }
}

export default DefaultLayout;