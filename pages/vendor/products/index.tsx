import { NextPage } from "next";
import { useQuery, useMutation } from "@apollo/client";

import withDefaultLayout from "../../../layouts/DefaultLayout";

import { All_PRODUCTS } from "../../../graphql/queries";
import { ARCHIVE_PRODUCT, RESTORE_PRODUCT } from "../../../graphql/mutations";

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
  InlineNotification,
  OverflowMenu,
  OverflowMenuItem
} from "carbon-components-react";
import Router from "next/router";
import dynamic from "next/dynamic";

const DyanamicInlineLoading = dynamic(
  () => import('../../../components/Loading'),
  { ssr: false }
);

const headerData = [
  {
    header: 'Name',
    key: 'name',
  },
  {
    header: 'Archived',
    key: 'archived',
  },
  {
    header: 'Status',
    key: 'status',
  }
];

const ProductsIndex: NextPage<NextPageProps> = ({ user }) => {
  const { loading, error, data } = useQuery<{ allProducts: ProductType[] }, ProductFilter>(
    All_PRODUCTS,
    { variables: { userId: user.sub }, pollInterval: 5000 }
  );

  const [archiveProduct] = useMutation<{ archiveProduct: ProductType }, { productId: string }>(ARCHIVE_PRODUCT);
  const [restoreProduct] = useMutation<{ restoreProduct: ProductType }, { productId: string }>(RESTORE_PRODUCT);

  const renderArchived = (id: string) => {
    const product = data.allProducts.find(x => x._id === id);

    if (product.archived) {
      return (
        <OverflowMenuItem
          itemText="Restore"
          onClick={() => {
            restoreProduct({
              variables: { productId: id },
              refetchQueries: [
                { query: All_PRODUCTS, variables: { userId: user.sub } }
              ]
            });
          }}
        />
      );
    }

    return (
      <OverflowMenuItem
        itemText="Archive"
        onClick={() => {
          archiveProduct({
            variables: { productId: id },
            refetchQueries: [
              { query: All_PRODUCTS, variables: { userId: user.sub } }
            ]
          });
        }}
      />
    );
  }

  if (loading) {
    return <DyanamicInlineLoading description="Fetching Your Products..." />;
  }

  if (error) {
    return <InlineNotification title={error.message} kind="error" />;
  }

  return (
    <section className="section">
      <DataTable
        rows={(data.allProducts.map(product => ({
          ...product,
          id: product._id,
          archived: String(product.archived).toUpperCase()
        })) as any[])}
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
                            Router.push(`/vendor/products/${row.id}`);
                          }}
                        />
                        <OverflowMenuItem
                          itemText="Edit"
                          onClick={() => {
                            Router.push(`/vendor/products/${row.id}/edit`);
                          }}
                        />
                        {renderArchived(row.id)}
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