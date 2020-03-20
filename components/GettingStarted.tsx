import { Fragment, useState } from "react";
import { TextInput, Button, InlineNotification, ButtonSkeleton } from 'carbon-components-react';
import { useMutation, useQuery } from "@apollo/client";
import toastr from 'toastr';
import dynamic from "next/dynamic";

import { ADD_VENDOR, DELETE_VENDOR, UPDATE_VENDOR } from "../graphql/mutations";
import { VendorType, VendorInput } from "../utils/interfaces";
import { VENDOR } from "../graphql/queries";

const DyanamicInlineLoading = dynamic(
  () => import('./Loading'),
  { ssr: false }
);

const GettingStarted = () => {
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');
  const [twitter, setTwitter] = useState('');
  const [contact, setContact] = useState('');
  const [facebook, setFacebook] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [founded, setFounded] = useState('');

  const [busy, setBusy] = useState(false);

  const [addVendor] = useMutation<{ addVendor: VendorType }, VendorInput>(ADD_VENDOR);
  const [updateVendor] = useMutation<{ updateVendor: VendorType }, { vendorId: string, update: VendorInput }>(UPDATE_VENDOR);
  const [deleteVendor] = useMutation<{ deleteVendor: VendorType }, { vendorId: string }>(DELETE_VENDOR);
  const { loading, error, data } = useQuery<{ vendor: VendorType }>(VENDOR);

  if (loading) {
    return <DyanamicInlineLoading description="Checking Your Profile..." />;
  }

  if (error) {
    return <InlineNotification title={error.message} kind="error" />;
  }

  return (
    <Fragment>
      <div className="bx--grid">
        <div className="row">
          <h2>
            {
            data.vendor ?
            'Vendor Profile Submitted and Waiting for Approval' :
            'You start by completing your company profile' 
            }
          </h2>
          <br/><br/>
        </div>
        <div className="bx--row">
          <div className="bx--col">
            <TextInput
              id="name"
              defaultValue={data.vendor && data.vendor.name}
              labelText="Company Name"
              onChange={e => {
                setName(e.target.value);
              }}
            />
            <br /><br/>

            <TextInput
              id="website"
              defaultValue={data.vendor && data.vendor.website}
              labelText="Company Website"
              onChange={e => {
                setWebsite(e.target.value);
              }}
            />
            <br /><br/>

            <TextInput
              id="location"
              defaultValue={data.vendor && data.vendor.location}
              labelText="Company Location"
              onChange={e => {
                setLocation(e.target.value);
              }}
            />
            <br /><br/>
            <TextInput
              id="twitter"
              defaultValue={data.vendor && data.vendor.twitter}
              labelText="Twitter Page"
              onChange={e => {
                setTwitter(e.target.value);
              }}
            />
            <br /><br/>
          </div>

          <div className="bx--col">
            <TextInput
              id="contact"
              defaultValue={data.vendor && data.vendor.contact}
              labelText="Contact Number"
              onChange={e => {
                setContact(e.target.value);
              }}
            />
            <br /><br/>

            <TextInput
              id="facebook"
              defaultValue={data.vendor && data.vendor.facebook}
              labelText="Facebook Page"
              onChange={e => {
                setFacebook(e.target.value);
              }}
            />
            <br /><br/>

            <TextInput
              id="linkedin"
              defaultValue={data.vendor && data.vendor.linkedIn}
              labelText="LinkedIn Page"
              onChange={e => {
                setLinkedIn(e.target.value);
              }}
            />
            <br /><br/>

            <TextInput
              id="founded"
              defaultValue={data.vendor && data.vendor.founded}
              labelText="Year Founded"
              onChange={e => {
                setFounded(e.target.value);
              }}
            />
            <br /><br/>
          </div>
        </div>
        <br/><br/>
        <div className="bx--row">
          <div className="bx--col">
            { data.vendor ?
              <Fragment>
                {!busy ?
                  <Fragment>
                    <Button
                      disabled={!name || !website || !location || !twitter || !contact || !facebook || !linkedIn || !founded}
                      onClick={() => {
                        setBusy(true);
                        updateVendor({
                          variables: {
                            vendorId: data.vendor._id,
                            update: { name, contact, website, facebook, location, linkedIn, twitter, founded }
                          }
                        })
                          .then(() => {
                            window.location.reload();
                          })
                          .catch(() => {
                            toastr.error('Failed To Update Vendor Profile', 'Vendor Update Error');
                          })
                      }}
                    >Update Profile</Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button
                      kind="danger"
                      onClick={() => {
                        setBusy(true);
                        deleteVendor({ variables: { vendorId: data.vendor._id } })
                          .then(() => {
                            window.location.reload();
                          })
                          .catch(() => {
                            toastr.error('Failed To Delete Vendor Profile', 'Vendor Deletion Error');
                          })
                      }}>Delete Profile</Button>
                  </Fragment> :
                  <ButtonSkeleton />}
              </Fragment> :
              <Fragment>
                {!busy ?
                  <Fragment>
                    <Button
                      disabled={!name || !website || !location || !twitter || !contact || !facebook || !linkedIn || !founded}
                      onClick={() => {
                        setBusy(true);
                        addVendor({
                          variables: { name, contact, website, facebook, location, linkedIn, twitter, founded }
                        })
                          .then(() => {
                            window.location.reload();
                          })
                          .catch(() => {
                            toastr.error('Failed To Add Vendor Profile', 'Vendor Addition Error');
                          })
                      }}
                    >Complete Registration</Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="https://hedron.now.sh">
                      <Button kind="danger">Cancel Registration</Button>
                    </a>
                  </Fragment> :
                  <ButtonSkeleton />
                }
              </Fragment>}
          </div>
          <div className="bx--col">
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default GettingStarted;