import { NextPage } from "next";

import withDefaultLayout from "../layouts/DefaultLayout";

const Index: NextPage<{}> = (props) => {
  return (
    <div className="card">
      <div className="card-content">
        <p className="title">
          “There are two hard things in computer science: cache invalidation, naming things, and off-by-one errors.”
          </p>
        <p className="subtitle">
          Jeff Atwood
          </p>
      </div>
      <footer className="card-footer">
        <p className="card-footer-item">
          <span>
            View on <a href="https://twitter.com/codinghorror/status/506010907021828096">Twitter</a>
          </span>
        </p>
        <p className="card-footer-item">
          <span>
            Share on <a href="#">Facebook</a>
          </span>
        </p>
      </footer>
    </div>
  );
}

export default withDefaultLayout(Index);