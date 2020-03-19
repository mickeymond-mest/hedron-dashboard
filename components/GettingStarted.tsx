import { Fragment, useState } from "react";
import { TextInput, Button } from 'carbon-components-react';

const GettingStarted = () => {
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');
  const [twitter, setTwitter] = useState('');
  const [contact, setContact] = useState('');
  const [facebook, setFacebook] = useState('');
  const [linkedin, setLinkedIn] = useState('');
  const [founded, setFounded] = useState('');

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
              disabled={!name || !website || !location || !twitter || !contact || !facebook || !linkedin || !founded}
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