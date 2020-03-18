import { NextPage } from "next";

import withDefaultLayout from "../layouts/DefaultLayout";
import { NextPageProps } from "../utils/PropTypes";
import { withRouter } from "next/router";
import IndexComponent from "../components/IndexComponent";
import GettingStarted from "../components/GettingStarted";

const Index: NextPage<NextPageProps> = (props) => {
  return (
    <section className="section">
      {props.role ? <IndexComponent /> : <GettingStarted />}
    </section>
  );
}

export default withDefaultLayout(withRouter(Index));