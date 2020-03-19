import { NextPage } from "next";
import { useQuery } from "@apollo/client";
import {
  InlineNotification,
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
  OverflowMenu,
  OverflowMenuItem
} from "carbon-components-react";
import Router from "next/router";

import withDefaultLayout from "../../../layouts/DefaultLayout";
import { GET_LEADS } from "../../../graphql/queries";
import { NextPageProps } from "../../../utils/PropTypes";
import { DemoRequestType, DemoRequestFilter } from '../../../utils/interfaces';
import dynamic from "next/dynamic";

const DyanamicInlineLoading = dynamic(
  () => import('../../../components/Loading'),
  { ssr: false }
);

const headerData = [
  {
    header: 'FirstName',
    key: 'firstName',
  },
  {
    header: 'LastName',
    key: 'lastName',
  },
  {
    header: 'Email',
    key: 'email',
  },
  {
    header: 'Phone Number',
    key: 'phoneNumber',
  },
];

const Dashboard: NextPage<NextPageProps> = ({ user }) => {
  const { loading, error, data } = useQuery<{ demoRequests: DemoRequestType[] }, DemoRequestFilter>(
    GET_LEADS,
    { variables: { receiver: user.sub } }
  );

  if (loading) {
    return <DyanamicInlineLoading description="Fetching Your Leads..." />;
  }

  if (error) {
    return <InlineNotification title={error.message} kind="error" />;
  }

  return (
    <DataTable
        rows={(data.demoRequests.map(lead => ({ ...lead, id: lead._id })) as any[])}
        headers={headerData}
        render={({ rows, headers, getHeaderProps, getSelectionProps, getRowProps }) => (
          <TableContainer title="All Leads">
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
                        <OverflowMenuItem
                          itemText="Edit"
                          onClick={() => {
                            Router.push(`/vendors/products/${row.id}/edit`);
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
  );
}

export default withDefaultLayout(Dashboard);