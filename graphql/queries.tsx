import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query Products(
    $userId: String
    $status: String
    $archived: Boolean
  ) {
    products(
      filter: {
        userId: $userId
        status: $status
        archived: $archived
      }
    ) {
      _id
      userId
      ibmDiscoveryDocumentId
      status
      archived
      name
      summary
      description
      values {
        _id
        name
        description
      }
      features {
        _id
        label
        value
      }
      pricing {
        _id
        label
        value
      }
      devices {
        _id
        label
        value
      }
      categories {
        _id
        label
        value
      }
      plans {
        _id
        name
        price
      }
      logo {
        _id
        filename
        url
        mimetype
        size
      }
      featured {
        _id
        filename
        url
        mimetype
        size
      }
      attachments {
        _id
        filename
        url
        mimetype
        size
      }
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById(
    $productId: String!
  ) {
    getProductById(
      productId: $productId
    ) {
      _id
      userId
      ibmDiscoveryDocumentId
      status
      archived
      name
      description
      values {
        name
        description
      }
      features {
        label
        value
      }
      pricing {
        label
        value
      }
      devices {
        label
        value
      }
      categories {
        label
        value
      }
      plans {
        name
        price
        features {
          label
          value
        }
      }
      logo {
        url
      }
      featured {
        url
      }
      attachments {
        url
      }
    }
  }
`;

export const GET_LEADS = gql`
  query DemoRequests(
    $receiver: String!
  ) {
    demoRequests(
      filter: {
        receiver: $receiver
      }
    ) {
      _id
      firstName
      lastName
      email
      phoneNumber
    }
  }
`;