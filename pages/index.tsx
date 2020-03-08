import { NextPage } from "next";

import withDefaultLayout from "../layouts/DefaultLayout";

const Index: NextPage<{}> = (props) => {
  return (
    <section className="section">
      <section className="section">
        <div className="card">
          <div className="card-content">
            <p className="title">
              Welcome To Hedron
            </p>
            <p className="subtitle">
              We Will Get Back To You Shortly
          </p>
          </div>
        </div>
      </section>
    </section>
  );
}

export default withDefaultLayout(Index);