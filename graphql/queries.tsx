import { gql } from '@apollo/client';

export const GET_PRODUCTS_BY_USER_ID = gql`
  query Products(
    $userId: String!
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