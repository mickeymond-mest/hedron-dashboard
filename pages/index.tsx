import { NextPage } from "next";

import DefaultLayout from "../layouts/DefaultLayout";

const Index: NextPage<{ userAgent: string }> = ({ userAgent }) => {
  return (
    <DefaultLayout>
      <p>Hello to Next.js - User Agent: {userAgent}</p>
    </DefaultLayout>
  );
}

Index.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] || '' : navigator.userAgent;
  return { userAgent };
};

export default Index;