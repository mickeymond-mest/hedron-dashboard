import { NextPage } from "next";
import { useQuery, useMutation } from "@apollo/client";

import toastr from 'toastr';

import withDefaultLayout from "../../../layouts/DefaultLayout";

import { All_PRODUCTS, ALL_VENDORS } from "../../../graphql/queries";
import { UPDATE_PRODUCT } from "../../../graphql/mutations";

import { NextPageProps } from '../../../utils/PropTypes';
import { ProductType, ProductFilter, VendorType } from "../../../utils/interfaces";

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

const headerData = [
  {
    header: 'Name',
    key: 'name',
  },
  {
    header: 'Contact',
    key: 'contact',
  },
  {
    header: 'Status',
    key: 'status',
  }
];

const ProductsIndex: NextPage<NextPageProps> = ({ user }) => {
  const { loading, error, data } = useQuery<{ allVendors: VendorType[] }>(ALL_VENDORS);

  const [
    updateProduct
  ] = useMutation<{updateProduct: ProductType}, {productId: string, status: string}>(UPDATE_PRODUCT);

  if (loading) {
    return <InlineLoading id="products-loading" description="Getting All Vendors..." />;
  }

  if (error) {
    return <InlineNotification title={error.message} kind="error" />;
  }

  return (
    <section className="section">
      <DataTable
        rows={(data.allVendors.map(vendor => ({ ...vendor, id: vendor._id })) as any[])}
        headers={headerData}
        render={({ rows, headers, getHeaderProps, getSelectionProps, getRowProps }) => (
          <TableContainer title="All Vendors">
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
                            Router.push(`/admin/vendors/${row.id}`);
                          }}
                        />
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