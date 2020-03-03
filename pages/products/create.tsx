import { NextPage } from "next";

import { useState, createRef } from "react";
import { useMutation } from "@apollo/client";

import withDefaultLayout from "../../layouts/DefaultLayout";

import { ADD_PRODUCT } from "../../graphql/mutations";

const ProductsCreate: NextPage<{}> = ({}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  let attachments = createRef();

  const [addProduct] = useMutation(ADD_PRODUCT);

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Make A Product Addition Request</h1>

        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label">Product Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Product Name"
                  value={name}
                  onChange={e => {
                    setName(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="column">
            <div className="field">
              <label className="label">Product Description</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Product Description"
                  value={description}
                  onChange={e => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <div className="file is-boxed">
              <label className="file-label">
                <input
                  className="file-input"
                  type="file" name="attachments"
                  multiple
                  ref={(ref: any) => {
                    attachments = ref;
                  }}
                />
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="material-icons">cloud_upload</i>
                  </span>
                  <span className="file-label">
                    Add Attachments...
                  </span>
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <button
              className="button is-success"
              onClick={e => {
                const uploads = (attachments as unknown as HTMLInputElement);
                console.log(uploads.files);
                // uploads.validity.valid && addProduct({ variables: { uploads: uploads.files, name, description } });
              }}
            >Submit</button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default withDefaultLayout(ProductsCreate);