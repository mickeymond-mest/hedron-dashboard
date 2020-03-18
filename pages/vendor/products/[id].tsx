import { NextPage } from "next";

import withDefaultLayout from "../../../layouts/DefaultLayout";
import { useQuery } from "@apollo/client";
import { ProductType } from "../../../utils/interfaces";
import { GET_PRODUCT_BY_ID } from "../../../graphql/queries";
import { NextPageProps } from "../../../utils/PropTypes";
import { withRouter } from "next/router";
import { InlineNotification } from "carbon-components-react";
import dynamic from "next/dynamic";

const DyanamicInlineLoading = dynamic(
  () => import('../../../components/Loading'),
  { ssr: false }
);

const ProdcutDetail: NextPage<NextPageProps> = ({ user, router }) => {
  const { loading, error, data } = useQuery<{ getProductById: ProductType }, { productId: string }>(
    GET_PRODUCT_BY_ID,
    { variables: { productId: (router.query.id as string) } }
  );

  if (loading) {
    return <DyanamicInlineLoading description="Getting Product..." />;
  }

  if (error) {
    return <InlineNotification title={error.message} kind="error" />;
  }

  return (
    <section className="section">
      <section className="section">
        <div className="card">
          <div className="card-content">
            <p className="title">
              {data.getProductById.name}
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}

export default withDefaultLayout(withRouter(ProdcutDetail));