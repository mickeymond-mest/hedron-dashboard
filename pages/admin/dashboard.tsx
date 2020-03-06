import { NextPage } from "next";

import withDefaultLayout from "../../layouts/DefaultLayout";

const Dashboard: NextPage<{}> = ({}) => {
  return (
    <h1 className="title">Dashboard</h1>
  );
}

export default withDefaultLayout(Dashboard);