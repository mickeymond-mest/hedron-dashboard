import { NextPage } from "next";
import { useQuery } from "@apollo/client";
import Link from 'next/link';

import withDefaultLayout from "../../layouts/DefaultLayout";

import { GET_PRODUCTS } from "../../graphql/queries";

const ProductsIndex: NextPage<{}> = ({}) => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  console.log(data);

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">All Products</h1>
        <Link href="/products/create" as="/products/create">
          <button className="button is-link is-pulled-right">Add New Product</button>
        </Link>
      </div>
    </section>
  );
}

export default withDefaultLayout(ProductsIndex);