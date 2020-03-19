import { Fragment, useState } from "react";
import { TextInput, Button } from 'carbon-components-react';
import { useMutation } from "@apollo/client";
import toastr from 'toastr';

import { ADD_VENDOR } from "../graphql/mutations";
import { VendorType, VendorInput } from "../utils/interfaces";

const GettingStarted = () => {
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');
  const [twitter, setTwitter] = useState('');
  const [contact, setContact] = useState('');
  const [facebook, setFacebook] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [founded, setFounded] = useState('');

  const [addVendor] = useMutation<{ addVendor: VendorType }, VendorInput>(ADD_VENDOR);

  return (
    <Fragment>
      <div className="bx--grid">
        <div className="row">
          <h2>You start by completing your company profile</h2>
          <br/><br/>
        </div>
        <div className="bx--row">
          <div className="bx--col">
            <TextInput
              id="name"
              labelText="Company Name"
              onChange={e => {
                setName(e.target.value);
              }}
            />
            <br /><br/>

            <TextInput
              id="website"
              labelText="Company Website"
              onChange={e => {
                setWebsite(e.target.value);
              }}
            />
            <br /><br/>

            <TextInput
              id="location"
              labelText="Company Location"
              onChange={e => {
                setLocation(e.target.value);
              }}
            />
            <br /><br/>
            <TextInput
              id="twitter"
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
              labelText="Contact Number"
              onChange={e => {
                setContact(e.target.value);
              }}
            />
            <br /><br/>

            <TextInput
              id="facebook"
              labelText="Facebook Page"
              onChange={e => {
                setFacebook(e.target.value);
              }}
            />
            <br /><br/>

            <TextInput
              id="linkedin"
              labelText="LinkedIn Page"
              onChange={e => {
                setLinkedIn(e.target.value);
              }}
            />
            <br /><br/>

            <TextInput
              id="founded"
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
            <Button
              disabled={!name || !website || !location || !twitter || !contact || !facebook || !linkedIn || !founded}
              onClick={() => {
                addVendor({
                  variables: { name, contact, website, facebook, location, linkedIn, twitter, founded }
                })
                .then(result => {
                  toastr.success('Vendor Successfully Added', 'Vendor Addtion Success');
                  console.log(result.errors);
                })
                .catch(error => {
                  console.log(JSON.stringify(error, null, 2));
                  toastr.error(error.message, 'Vendor Addition Error');
                })
              }}
            >Complete Registration</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="https://hedron.now.sh">
              <Button kind="danger">Cancel Registration</Button>
            </a>
          </div>
          <div className="bx--col">
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default GettingStarted;