import { NextPage } from "next";

import withDefaultLayout from "../layouts/DefaultLayout";

const Dashboard: NextPage<{}> = ({}) => {
  return (
    <p>Dashboard Page Next.js</p>
  );
}

export default withDefaultLayout(Dashboard);