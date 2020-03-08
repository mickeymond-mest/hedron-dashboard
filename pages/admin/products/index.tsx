import { NextPage } from "next";
import { useQuery, useMutation } from "@apollo/client";

import toastr from 'toastr';

import withDefaultLayout from "../../../layouts/DefaultLayout";

import { GET_PRODUCTS } from "../../../graphql/queries";
import { UPDATE_STATUS } from "../../../graphql/mutations";

import { NextPageProps } from '../../../utils/PropTypes';
import { ProductType, ProductFilter, UpdateStatusInput } from "../../../utils/interfaces";

import ProductCardItem from '../../../components/ProductCardItem';
import Filter from "../../../components/Filter";

const ProductsIndex: NextPage<NextPageProps> = ({ user }) => {
  const { loading, error, data } = useQuery<{ products: ProductType[] }, ProductFilter>(GET_PRODUCTS);

  const [updateStatus] = useMutation<{ updateStatus: ProductType }, UpdateStatusInput>(UPDATE_STATUS);

  if (loading) {
    return (
      <div className="pageloader is-active is-bottom-to-top">
        <span className="title">Retrieving Products...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pageloader has-background-danger is-active is-bottom-to-top">
        <span className="title">{error.message}</span>
      </div>
    );
  }

  return (
    <section className="section">
      <section className="section">
        <h1 className="title is-4">Products</h1>
        <Filter />
      </section>
      <section className="section">
        <div className="columns is-multiline">
          {data.products.map(product => (
            <ProductCardItem
              key={product._id}
              product={product}
              hasVendorActions={false}
              onStatusChange={(productId: string, status: string) => {
                updateStatus({
                  variables: { productId, status },
                  refetchQueries: [
                    { query: GET_PRODUCTS }
                  ]
                })
                .then(data => {
                  toastr.success(
                    `Status of Product with ID: ${productId} has changed to ${status}`,
                    `Product Status Change`
                  )
                });
              }}
            />
          ))}
        </div>
      </section>
    </section>
  );
}

export default withDefaultLayout(ProductsIndex);