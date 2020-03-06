import { NextPage } from "next";
import { useQuery } from "@apollo/client";
import Link from 'next/link';

import withDefaultLayout from "../../../layouts/DefaultLayout";

import { GET_PRODUCTS_BY_USER_ID } from "../../../graphql/queries";

import { NextPageProps } from '../../../utils/PropTypes';
import { ProductType, ProductFilter } from "../../../utils/interfaces";

import ProductCardItem from '../../../components/ProductCardItem';

const ProductsIndex: NextPage<NextPageProps> = ({ user }) => {
  const { loading, error, data } = useQuery<{ products: ProductType[] }, ProductFilter>(
    GET_PRODUCTS_BY_USER_ID,
    { variables: { userId: user.sub } }
  );

  if (loading) {
    return (
      <div className="pageloader is-active is-bottom-to-top">
        <span className="title">Retrieving You Products...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pageloader is-active is-bottom-to-top">
        <span className="title">{error.message}</span>
      </div>
    );
  }

  return (
    <section className="section">
      <section className="section">
        <h1 className="title">All Products</h1>
        <Link href="/vendors/products/create" as="/vendors/products/create">
          <button className="button is-link is-pulled-right">Add New Product</button>
        </Link>
      </section>
      <section className="section">
        <div className="columns is-multiline">
          {data.products.map(product => <ProductCardItem key={product._id} product={product} />)}
        </div>
      </section>
    </section>
  );
}

export default withDefaultLayout(ProductsIndex);