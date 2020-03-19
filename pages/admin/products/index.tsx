import { NextPage } from "next";
import { useQuery, useMutation } from "@apollo/client";

import toastr from 'toastr';

import withDefaultLayout from "../../../layouts/DefaultLayout";

import { All_PRODUCTS } from "../../../graphql/queries";
import { UPDATE_PRODUCT } from "../../../graphql/mutations";

import { NextPageProps } from '../../../utils/PropTypes';
import { ProductType, ProductFilter } from "../../../utils/interfaces";

import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableSelectAll,
  TableHeader,
  TableBody,
  TableSelectRow,
  TableCell,
  InlineLoading,
  InlineNotification,
  OverflowMenu,
  OverflowMenuItem
} from "carbon-components-react";
import Router from "next/router";
import { Fragment } from "react";

const headerData = [
  {
    header: 'Name',
    key: 'name',
  },
  {
    header: 'Status',
    key: 'status',
  }
];

const ProductsIndex: NextPage<NextPageProps> = ({ user }) => {
  const { loading, error, data } = useQuery<{ allProducts: ProductType[] }, ProductFilter>(All_PRODUCTS);

  const [
    updateProduct
  ] = useMutation<{updateProduct: ProductType}, {productId: string, status: string}>(UPDATE_PRODUCT);

  const renderActions = (id: string) => {
    const product = data.allProducts.find(x => x._id === id);
    switch (product.status) {
      case 'approved':
        return (
          <OverflowMenuItem
            itemText="Revoke Approval"
            onClick={() => {
              updateProduct({
                variables: { productId: id, status: 'pending' },
                refetchQueries: [
                  { query: All_PRODUCTS }
                ]
              });
            }}
          />
        );
      case 'denied':
        return (
          <OverflowMenuItem
            itemText="Revoke Denial"
            onClick={() => {
              updateProduct({
                variables: { productId: id, status: 'pending' },
                refetchQueries: [
                  { query: All_PRODUCTS }
                ]
              });
            }}
          />
        );
      default:
        return (
          <Fragment>
            <OverflowMenuItem
              itemText="Approve"
              onClick={() => {
                updateProduct({
                  variables: { productId: id, status: 'approved' },
                  refetchQueries: [
                    { query: All_PRODUCTS }
                  ]
                });
              }}
            />
            <OverflowMenuItem
              itemText="Deny"
              onClick={() => {
                updateProduct({
                  variables: { productId: id, status: 'denied' },
                  refetchQueries: [
                    { query: All_PRODUCTS }
                  ]
                });
              }}
            />
          </Fragment>
        );
    }
  }

  if (loading) {
    return <InlineLoading id="products-loading" description="Fetching Your Products..." />;
  }

  if (error) {
    return <InlineNotification title={error.message} kind="error" />;
  }

  return (
    <section className="section">
      <DataTable
        rows={(data.allProducts.map(product => ({ ...product, id: product._id })) as any[])}
        headers={headerData}
        render={({ rows, headers, getHeaderProps, getSelectionProps, getRowProps }) => (
          <TableContainer title="All Products">
            <Table>
              <TableHead>
                <TableRow>
                  <TableSelectAll {...getSelectionProps()} />
                  {headers.map(header => (
                    <TableHeader {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                  <TableHeader>Actions</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow {...getRowProps({ row })}>
                    <TableSelectRow {...getSelectionProps({ row })} />
                    {row.cells.map(cell => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                    <TableCell>
                      <OverflowMenu>
                        <OverflowMenuItem
                          itemText="View"
                          onClick={() => {
                            Router.push(`/vendors/products/${row.id}`);
                          }}
                        />
                        {renderActions(row.id)}
                      </OverflowMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>)}
      />
    </section>
  );
}

export default withDefaultLayout(ProductsIndex);