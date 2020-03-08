import { NextPage } from "next";

import withDefaultLayout from "../../layouts/DefaultLayout";

const Dashboard: NextPage<{}> = ({}) => {
  return (
    <section className="section">
      <section className="section">
        <h1 className="title">Dashboard</h1>
      </section>
    </section>
  );
}

export default withDefaultLayout(Dashboard);