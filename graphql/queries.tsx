import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query Products {
    products(
      filter: {
        archived: false
      }
    ) {
      _id
      userId
      name
      description
    }
  }
`;