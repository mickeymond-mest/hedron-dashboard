import { NextPage } from "next";

import withDefaultLayout from "../../layouts/DefaultLayout";

const ProductsCreate: NextPage<{}> = ({}) => {
  return (
    <p>ProductsCreate Page Next.js</p>
  );
}

export default withDefaultLayout(ProductsCreate);