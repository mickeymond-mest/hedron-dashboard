import { NextPage } from "next";

import withDefaultLayout from "../../layouts/DefaultLayout";

const ProductsIndex: NextPage<{}> = ({}) => {
  return (
    <p>ProductsIndex Page Next.js</p>
  );
}

export default withDefaultLayout(ProductsIndex);