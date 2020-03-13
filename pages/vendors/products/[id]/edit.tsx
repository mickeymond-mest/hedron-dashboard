import { NextPage } from "next";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { withRouter } from "next/router";

import { useState, createRef } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { ADD_PRODUCT } from "../../../../graphql/mutations";

import withDefaultLayout from "../../../../layouts/DefaultLayout";
import ProductPlan from "../../../../components/ProductPlan";

import { NextPageProps } from '../../../../utils/PropTypes';
import * as data from '../../../../utils/data';
import axios from 'axios';
import { ProductInput, ProductType } from "../../../../utils/interfaces";
import { GET_PRODUCTS, GET_PRODUCT_BY_ID } from "../../../../graphql/queries";
import ValueProp from "../../../../components/ValueProp";
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
  () => import('../../../../components/RichText'),
  { ssr: false }
)

const ProductsEdit: NextPage<NextPageProps> = ({ user, router }) => {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [logoLabel, setLogoLabel] = useState('');
  const [featuredLabel, setFeaturedLabel] = useState('');
  const [hasAttachments, setHasAttachments] = useState(false);

  const [values, setValues] = useState([]);
  const [features, setFeatures] = useState([]);
  const [pricing, setPricing] = useState([]);
  const [devices, setDevices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [plans, setPlans] = useState([]);

  let logo = createRef();
  let featured = createRef();
  let attachments = createRef();

  const { loading: fetching, error, data: response } = useQuery<{ getProductById: ProductType }, { productId: string }>(
    GET_PRODUCT_BY_ID,
    { variables: { productId: (router.query.id as string) } }
  );

  const [addProduct] = useMutation<{ addProduct: ProductType }, ProductInput>(ADD_PRODUCT);

  if (fetching) {
    return (
      <div className="pageloader is-active is-bottom-to-top">
        <span className="title">Retrieving The Product...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pageloader has-background-danger is-active is-bottom-to-top">
        <span className="title">{error.message}</span>
      </div>
    );
  }

  return (
    <section className="section">
        <h2>Edit A Product</h2>

      <section className="section">
        
      <div className="columns">
          <div className="column is-one-third">
            <div className="field">
              <label className="label">Product Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Product Name"
                  disabled={loading}
                  defaultValue={response.getProductById.name}
                  onChange={e => {
                    setName(e.target.value);
                  }}
                />
              </div>
            </div><br />

            <div className="field">
              <label className="label">Features</label>
              <div className="control">
                <CreatableSelect
                  instanceId="features"
                  isMulti
                  options={[]}
                  defaultValue={(response.getProductById.features as any[])}
                  isDisabled={loading}
                  onChange={(value) => {
                    setFeatures(value);
                  }}
                />
              </div>
            </div><br />

            <div className="field">
              <label className="label">Pricing</label>
              <div className="control">
                <Select
                  instanceId="pricing"
                  isMulti
                  options={data.pricing}
                  defaultValue={response.getProductById.pricing}
                  isDisabled={loading}
                  onChange={(value: any[]) => {
                    setPricing(value);
                  }}
                />
              </div>
            </div><br />

            <div className="field">
              <label className="label">Devices</label>
              <div className="control">
                <Select
                  instanceId="devices"
                  isMulti
                  options={data.devices}
                  isDisabled={loading}
                  onChange={(value: any[]) => {
                    setDevices(value);
                  }}
                />
              </div>
            </div><br />

            <div className="field">
              <label className="label">Categories</label>
              <div className="control">
                <Select
                  instanceId="categories"
                  isMulti
                  options={data.categories}
                  isDisabled={loading}
                  onChange={(value: any[]) => {
                    setCategories(value);
                  }}
                />
              </div>
            </div><br/>

            <div className="field">
              <label className="label">Product Logo</label>
              <div className="control">
                <div className="file is-fullwidth has-name">
                  <label className="file-label">
                    <input
                      className="file-input"
                      type="file"
                      ref={(ref: any) => {
                        logo = ref;
                      }}
                      disabled={loading}
                      onChange={e => {
                        if (e.target.files[0]) {
                          setLogoLabel(e.target.files[0].name);
                        } else {
                          setLogoLabel('');
                        }
                      }}
                    />
                    <span className="file-cta">
                      <span className="file-icon">
                        <i className="fas fa-upload"></i>
                      </span>
                      <span className="file-label">Choose a file…</span>
                    </span>
                    <span className="file-name">{logoLabel}</span>
                  </label>
                </div>
              </div>
            </div><br />

            <div className="field">
              <label className="label">Product Featured Image</label>
              <div className="control">
                <div className="file is-fullwidth has-name">
                  <label className="file-label">
                    <input
                      className="file-input"
                      type="file"
                      ref={(ref: any) => {
                        featured = ref;
                      }}
                      disabled={loading}
                      onChange={e => {
                        if (e.target.files[0]) {
                          setFeaturedLabel(e.target.files[0].name);
                        } else {
                          setFeaturedLabel('');
                        }
                      }}
                    />
                    <span className="file-cta">
                      <span className="file-icon">
                        <i className="fas fa-upload"></i>
                      </span>
                      <span className="file-label">Choose a file…</span>
                    </span>
                    <span className="file-name">{featuredLabel}</span>
                  </label>
                </div>
              </div>
            </div><br />

            <div className="field">
              <label className="label">Attachments</label>
              <div className="control">
                <div className="file is-centered is-boxed">
                  <label className="file-label">
                    <input
                      className="file-input"
                      type="file" name="attachments"
                      multiple
                      ref={(ref: any) => {
                        attachments = ref;
                      }}
                      disabled={loading}
                      onChange={e => {
                        if (e.target.files.length > 0) {
                          setHasAttachments(true);
                        } else {
                          setHasAttachments(false);
                        }
                      }}
                    />
                    <span className="file-cta">
                      <span className="file-icon">
                        <i className="material-icons">cloud_upload</i>
                      </span>
                      <span className="file-label">Add Attachments...</span>
                    </span>
                  </label>
                </div>
              </div>
            </div>

          </div>

          <div className="column">
            <div className="field">
              <label className="label">Product Description</label>
              <div className="control">
                <DynamicComponentWithNoSSR
                  onContentChange={(value) => {
                    setDescription(value);
                  }}
                />
              </div>
            </div><br />

            <ValueProp
              isDisabled={loading}
              onChange={(value: any[]) => {
                setValues(value);
              }}
            /><br />

            <ProductPlan
              isDisabled={loading}
              onChange={(value: any[]) => {
                setPlans(value);
              }}
            />

          </div>
        </div>

        <button
          className={loading ? "button is-success is-pulled-right is-loading": "button is-success is-pulled-right"}
          disabled={
            !name || !description || !logoLabel || !featuredLabel || values.length < 1 ||
            features.length < 1 || pricing.length < 1 || devices.length < 1 || categories.length < 1 ||
            plans.length < 1 || !hasAttachments || loading
          }
          onClick={e => {
            setLoading(true);

            const refLogo = (logo as unknown as HTMLInputElement);
            const refFeatured = (featured as unknown as HTMLInputElement);
            const refAttachments = (attachments as unknown as HTMLInputElement);

            const formData = new FormData();
            formData.append('logo', refLogo.files.item(0));
            formData.append('featured', refFeatured.files.item(0));
            for (let i = 0; i < refAttachments.files.length; i++) {
              formData.append('attachments', refAttachments.files.item(i));
            }

            axios.post(`${process.env.REST_ENDPOINT}/products/uploads`, formData)
              .then(({ data }) => {
                addProduct({
                  variables: {
                    name,
                    description,
                    values: values.map(({ label, value }) => ({ label, value })),
                    features: features.map(({ label, value }) => ({ label, value })),
                    pricing,
                    devices,
                    categories,
                    plans,
                    logo: data.logo,
                    featured: data.featured,
                    attachments: data.attachments,
                  },
                  refetchQueries: [
                    { query: GET_PRODUCTS, variables: { userId: user.sub } }
                  ]
                })
                  .then(res => {
                    router.replace('/vendors/products');
                  })
                  .catch(console.log);
              })
              .catch(error => console.log(error));
          }}
        >Update Product</button>
      </section>
    </section>
  );
}

export default withDefaultLayout(withRouter(ProductsEdit));