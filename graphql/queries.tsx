import { gql } from '@apollo/client';

export const VENDOR = gql`
  query Vendor {
    vendor {
      _id
      userId
      name
      contact
      website
      facebook
      location
      linkedIn
      twitter
      founded
    }
  }
`;

export const All_PRODUCTS = gql`
  query AllProducts(
    $userId: String
    $status: String
    $archived: Boolean
  ) {
    allProducts(
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

export const PRODUCT_BY_ID = gql`
  query ProductById(
    $productId: String!
  ) {
    productById(
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

export const All_DEMO_REQUESTS = gql`
  query AllDemoRequests(
    $receiver: String!
  ) {
    allDemoRequests(
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