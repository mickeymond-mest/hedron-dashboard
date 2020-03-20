import { NextPage } from "next";
import { withRouter } from "next/router";
import { InlineNotification, Button } from "carbon-components-react";
import dynamic from "next/dynamic";

import withDefaultLayout from "../../../layouts/DefaultLayout";
import { useQuery, useMutation } from "@apollo/client";
import { VendorType, VendorInput } from "../../../utils/interfaces";
import { VENDOR_BY_ID } from "../../../graphql/queries";
import { NextPageProps } from "../../../utils/PropTypes";
import { Fragment } from "react";
import { APPROVE_VENDOR } from "../../../graphql/mutations";

const DyanamicInlineLoading = dynamic(
  () => import('../../../components/Loading'),
  { ssr: false }
);

const VendorDetail: NextPage<NextPageProps> = ({ user, router }) => {
  const { loading, error, data } = useQuery<{ vendorById: VendorType }, { vendorId: string }>(
    VENDOR_BY_ID,
    { variables: { vendorId: (router.query.id as string) } }
  );

  const [approveVendor] = useMutation<{ approveVendor: VendorType }, { vendorId: string, update: VendorInput }>(APPROVE_VENDOR);

  const renderActions = (vendor: VendorType) => {
    switch (vendor.status) {
      case 'approved':
        return (
          <Fragment>
            <Button
              kind="tertiary"
              onClick={() => {
                approveVendor({
                  variables: { vendorId: (router.query.id as string), update: { status: 'pending' } },
                  refetchQueries: [{ query: VENDOR_BY_ID, variables: { vendorId: (router.query.id as string) } }]
                });
              }}>Revoke Approval</Button>
          </Fragment>
        );
      case 'denied':
        return (
          <Fragment>
            <Button
              kind="tertiary"
              onClick={() => {
                approveVendor({
                  variables: { vendorId: (router.query.id as string), update: { status: 'pending' } },
                  refetchQueries: [{ query: VENDOR_BY_ID, variables: { vendorId: (router.query.id as string) } }]
                });
              }}>Revoke Denial</Button>
          </Fragment>
        );
      default:
        return (
          <Fragment>
            <Button
              kind="primary"
              onClick={() => {
                approveVendor({
                  variables: { vendorId: (router.query.id as string), update: { status: 'approved' } },
                  refetchQueries: [{ query: VENDOR_BY_ID, variables: { vendorId: (router.query.id as string) } }]
                });
              }}>Approve</Button>&nbsp;&nbsp;&nbsp;&nbsp;
            <Button
              kind="danger"
              onClick={() => {
                approveVendor({
                  variables: { vendorId: (router.query.id as string), update: { status: 'denied' } },
                  refetchQueries: [{ query: VENDOR_BY_ID, variables: { vendorId: (router.query.id as string) } }]
                });
              }}>Deny</Button>
          </Fragment>
        );
    }
  }

  if (loading) {
    return <DyanamicInlineLoading description="Getting Vendor..." />;
  }

  if (error) {
    return <InlineNotification title={error.message} kind="error" />;
  }

  return (
    <section>
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col">
            <h2>Vendor Detail | {data.vendorById.name}</h2>
          </div>
          <div className="bx--col">
            {renderActions(data.vendorById)}
          </div>
        </div>
        <br />
      </div>
    </section>
  );
}

export default withDefaultLayout(withRouter(VendorDetail));