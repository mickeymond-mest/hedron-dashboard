import { NextPage } from "next";

import withDefaultLayout from "../../../layouts/DefaultLayout";
import { useQuery } from "@apollo/client";
import { ProductType } from "../../../utils/interfaces";
import { PRODUCT_BY_ID } from "../../../graphql/queries";
import { NextPageProps } from "../../../utils/PropTypes";
import { withRouter } from "next/router";
import { InlineNotification, Tile, StructuredListWrapper, StructuredListHead, StructuredListRow, StructuredListCell, StructuredListBody } from "carbon-components-react";
import dynamic from "next/dynamic";
import { DiscussionEmbed } from 'disqus-react';

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
        <div className="bx--row">
          <div className="bx--col">
            <p><strong>Name</strong>: {data.productById.name}</p><br/>
            <p><strong>Summary</strong>: {data.productById.summary}</p><br/>
          </div>
          <div className="bx--col">
            <Tile>
              <h3>Product Reviews:</h3>
              <StructuredListWrapper ariaLabel="Structured list">
                <StructuredListHead>
                  <StructuredListRow
                    head
                    tabIndex={0}
                  >
                    <StructuredListCell head>Reviewer</StructuredListCell>
                    <StructuredListCell head>Rating</StructuredListCell>
                    <StructuredListCell head>Review</StructuredListCell>
                  </StructuredListRow>
                </StructuredListHead>
                <StructuredListBody>
                  {data.productById.reviews.map(({ name, rating, review }) => (
                    <StructuredListRow tabIndex={0}>
                      <StructuredListCell>{name}</StructuredListCell>
                      <StructuredListCell>{rating}</StructuredListCell>
                      <StructuredListCell>{review}</StructuredListCell>
                    </StructuredListRow>
                  ))}
                </StructuredListBody>
              </StructuredListWrapper>
            </Tile>
          </div>
        </div><br/><br/>
        <div className="bx--row">
          <Tile>
            <h3>Description:</h3><br/>
            <div dangerouslySetInnerHTML={{
              __html: data.productById.description
            }}></div>
          </Tile>
        </div><br/><br/>
        <div className="bx--row">
          <Tile style={{ width: '100%' }}>
            <h3>Product Discussion:</h3><br/>
            <DiscussionEmbed
              shortname="hedron"
              config={{
                identifier: data.productById._id,
                title: data.productById.name,
                url: window.location.href
              }}
            />
          </Tile>
        </div>
      </div>
    </section>
  );
}

export default withDefaultLayout(withRouter(ProductDetail));