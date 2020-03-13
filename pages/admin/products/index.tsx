import { NextPage } from "next";
import { useQuery, useMutation } from "@apollo/client";

import toastr from 'toastr';

import withDefaultLayout from "../../../layouts/DefaultLayout";

import { GET_PRODUCTS } from "../../../graphql/queries";
import { UPDATE_STATUS } from "../../../graphql/mutations";

import { NextPageProps } from '../../../utils/PropTypes';
import { ProductType, ProductFilter, UpdateStatusInput } from "../../../utils/interfaces";

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
  const { loading, error, data } = useQuery<{ products: ProductType[] }, ProductFilter>(GET_PRODUCTS);

  const [updateStatus] = useMutation<{ updateStatus: ProductType }, UpdateStatusInput>(UPDATE_STATUS);

  const renderActions = (id: string) => {
    const product = data.products.find(x => x._id === id);
    switch (product.status) {
      case 'approved':
        return (
          <Fragment>
            <OverflowMenuItem
              itemText="Revoke Approval"
              onClick={() => {
                updateStatus({
                  variables: { productId: id, status: 'pending' },
                  refetchQueries: [
                    { query: GET_PRODUCTS }
                  ]
                });
              }}
            />
          </Fragment>
        );
      case 'denied':
        return (
          <Fragment>
            <OverflowMenuItem
              itemText="Revoke Denial"
              onClick={() => {
                updateStatus({
                  variables: { productId: id, status: 'pending' },
                  refetchQueries: [
                    { query: GET_PRODUCTS }
                  ]
                });
              }}
            />
          </Fragment>
        );
      default:
        return (
          <Fragment>
            <OverflowMenuItem
              itemText="Approve"
              onClick={() => {
                updateStatus({
                  variables: { productId: id, status: 'approved' },
                  refetchQueries: [
                    { query: GET_PRODUCTS }
                  ]
                });
              }}
            />
            <OverflowMenuItem
              itemText="Deny"
              onClick={() => {
                updateStatus({
                  variables: { productId: id, status: 'denied' },
                  refetchQueries: [
                    { query: GET_PRODUCTS }
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
        rows={(data.products.map(product => ({ ...product, id: product._id })) as any[])}
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