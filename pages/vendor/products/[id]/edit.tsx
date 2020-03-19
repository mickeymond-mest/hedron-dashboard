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
import { PRODUCT_BY_ID } from "../../../../graphql/queries";
import ValueProp from "../../../../components/ValueProp";
import dynamic from "next/dynamic";
import {
  TextInput,
  FileUploaderButton,
  Button,
  ButtonSkeleton,
  InlineNotification
} from "carbon-components-react";

const DyanamicRichText = dynamic(
  () => import('../../../../components/RichText'),
  { ssr: false }
);

const DyanamicInlineLoading = dynamic(
  () => import('../../../../components/Loading'),
  { ssr: false }
);

const ProductsEdit: NextPage<NextPageProps> = ({ user, router }) => {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');

  const [hasLogo, setHasLogo] = useState(false);
  const [hasFeatured, setHasFeatured] = useState(false);
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

  const { loading: fetching, error, data: response } = useQuery<{ productById: ProductType }, { productId: string }>(
    PRODUCT_BY_ID,
    { variables: { productId: (router.query.id as string) } }
  );

  // const [addProduct] = useMutation<{ addProduct: ProductType }, ProductInput>(ADD_PRODUCT);

  if (fetching) {
    return <DyanamicInlineLoading description="Get the Product..." />;
  }

  if (error) {
    return <InlineNotification title={error.message} kind="error" />;
  }

  return (
    <section>
      <h2>Product Addition Form</h2>
      <br />

      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col">
            <br />
            <TextInput
              id="name"
              labelText="Product Name"
              defaultValue={response.productById.name}
              onChange={e => {
                setName(e.target.value);
              }}
            />
            <br />

            <TextInput
              id="summary"
              labelText="Product Summary"
              defaultValue={response.productById.summary}
              onChange={e => {
                setSummary(e.target.value);
              }}
            />
            <br />

            <div>
              <label className="hedron-label">Features</label>
              <CreatableSelect
                instanceId="features"
                isMulti
                options={[]}
                value={(response.productById.features as any[])}
                isDisabled={loading}
                onChange={(value) => {
                  setFeatures(value);
                }}
              />
            </div>
            <br />

            <div>
              <label className="hedron-label">Pricing</label>
              <Select
                instanceId="pricing"
                isMulti
                options={data.pricing}
                isDisabled={loading}
                onChange={(value: any[]) => {
                  setPricing(value);
                }}
              />
            </div>
            <br />

            <div>
              <label className="hedron-label">Devices</label>
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
            <br />

            <div>
              <label className="hedron-label">Categories</label>
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
            <br />

            <div>
              <label className="hedron-label">Product Logo</label>
              <FileUploaderButton
                ref={(ref: any) => logo = ref}
                onChange={e => {
                  if (e.target.files[0]) {
                    setHasLogo(true);
                  } else {
                    setHasLogo(false);
                  }
                }}
              />
            </div>
            <br />

            <div>
              <label className="hedron-label">Product Featured Image</label>
              <FileUploaderButton
                ref={(ref: any) => featured = ref}
                onChange={e => {
                  if (e.target.files[0]) {
                    setHasFeatured(true);
                  } else {
                    setHasFeatured(false);
                  }
                }}
              />
            </div>
            <br />

            <div>
              <label className="hedron-label">Attachments</label>
              <FileUploaderButton
                multiple
                labelText="Add files"
                ref={(ref: any) => attachments = ref}
                onChange={e => {
                  if (e.target.files[0]) {
                    setHasAttachments(true);
                  } else {
                    setHasAttachments(false);
                  }
                }}
              />
            </div>
            <br />
          </div>

          <div className="bx--col">
            <ValueProp
              isDisabled={loading}
              onChange={(value: any[]) => {
                setValues(value);
              }}
            /><br />

            <ProductPlan
              isDisabled={loading}
              onChange={(value: any[]) => {
                console.log(value);
                setPlans(value);
              }}
            />

          </div>
        </div>
        <br/><br/>

        <div className="bx--row">
          <DyanamicRichText
            onContentChange={(value) => {
              console.log(value);
              setDescription(value);
            }}
          />
        </div>

        <br/><br/>

        {!loading ? <Button
          disabled={
            !name || !summary || !description || !hasLogo || !hasFeatured || values.length < 1 ||
            features.length < 1 || pricing.length < 1 || devices.length < 1 || categories.length < 1 ||
            plans.length < 1 || !hasAttachments
          }
          onClick={e => {
            setLoading(true);

            const refLogo = (logo as any).input;
            const refFeatured = (featured as any).input;
            const refAttachments = (attachments as any).input;

            const formData = new FormData();
            formData.append('logo', refLogo.files.item(0));
            formData.append('featured', refFeatured.files.item(0));
            for (let i = 0; i < refAttachments.files.length; i++) {
              formData.append('attachments', refAttachments.files.item(i));
            }

            // axios.post(`${process.env.REST_ENDPOINT}/products/uploads`, formData)
            //   .then(({ data }) => {
            //     addProduct({
            //       variables: {
            //         name,
            //         summary,
            //         description,
            //         values,
            //         features: features.map(({ label, value }) => ({ label, value })),
            //         pricing,
            //         devices,
            //         categories,
            //         plans,
            //         logo: data.logo,
            //         featured: data.featured,
            //         attachments: data.attachments,
            //       },
            //       refetchQueries: [
            //         { query: GET_PRODUCTS, variables: { userId: user.sub } }
            //       ]
            //     })
            //       .then(res => {
            //         toastr.success(
            //           `Product with name ${name} has be added and pending Admin approval`,
            //           'Product Addition'
            //         )
            //         router.push('/vendor/products');
            //       })
            //       .catch(error => {
            //         toastr.error(
            //           error.message,
            //           'Product Addition'
            //         )
            //       });
            //   })
            //   .catch(error => console.log(error));
          }}
        >Update Product</Button> : <ButtonSkeleton />}
      </div>
    </section>
  );
}

export default withDefaultLayout(withRouter(ProductsEdit));