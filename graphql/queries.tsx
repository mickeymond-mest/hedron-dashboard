import { gql } from 'apollo-boost';

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
      description
      values {
        _id
        label
        value
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

export const GET_PRODUCT = gql`
  query Product(
    $productId: String!
  ) {
    product(
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
        label
        value
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
        name
        description
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