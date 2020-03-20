import { NextPage } from "next";

import withDefaultLayout from "../../../layouts/DefaultLayout";
import { useQuery } from "@apollo/client";
import { ProductType } from "../../../utils/interfaces";
import { PRODUCT_BY_ID } from "../../../graphql/queries";
import { NextPageProps } from "../../../utils/PropTypes";
import { withRouter } from "next/router";
import { InlineNotification } from "carbon-components-react";
import dynamic from "next/dynamic";

const DyanamicInlineLoading = dynamic(
  () => import('../../../components/Loading'),
  { ssr: false }
);

const ProductDetail: NextPage<NextPageProps> = ({ user, router }) => {
  const { loading, error, data } = useQuery<{ productById: ProductType }, { productId: string }>(
    PRODUCT_BY_ID,
    { variables: { productId: (router.query.id as string) } }
  );

  if (loading) {
    return <DyanamicInlineLoading description="Getting Product..." />;
  }

  if (error) {
    return <InlineNotification title={error.message} kind="error" />;
  }

  return (
    <section>
      <div className="bx--grid">
        <div className="bx--row">
          <h2>Product Detail | {data.productById.name}</h2>
        </div>
        <br />
      </div>
    </section>
  );
}

export default withDefaultLayout(withRouter(ProductDetail));