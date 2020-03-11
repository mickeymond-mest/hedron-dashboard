import { NextPage } from "next";

import withDefaultLayout from "../../../layouts/DefaultLayout";

const ProdcutDetail: NextPage<{}> = (props) => {
  return (
    <section className="section">
      <section className="section">
        <div className="card">
          <div className="card-content">
            <p className="title">Welcome To Hedron</p>
            <br/>
            <p className="subtitle">
              <a href="https://hedron.now.sh">
                Go Find the Prodcut You Want
              </a>
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}

export default withDefaultLayout(ProdcutDetail);