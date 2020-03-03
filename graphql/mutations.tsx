import { gql } from '@apollo/client';

export const ADD_PRODUCT = gql`
  mutation AddProduct(
    $uploads: [Upload!]!
    $name: String!
    $description: String!
  ) {
    addProduct(
      uploads: $uploads
      product: {
        name: $name
        description: $description
      }
    ) {
      _id
      userId
      name
      description
    }
  }
`;