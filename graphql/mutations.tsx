import { gql } from '@apollo/client';

export const ADD_PRODUCT = gql`
  mutation AddProduct(
    $name: String!
    $description: String!
    $values: [SelectableInput!]!
    $features: [SelectableInput!]!
    $pricing: [SelectableInput!]!
    $devices: [SelectableInput!]!
    $categories: [SelectableInput!]!
    $plans: [PlanInput!]!
    $logo: AttachmentInput!
    $featured: AttachmentInput!
    $attachments: [AttachmentInput!]!
  ) {
    addProduct(
      product: {
        name: $name
        description: $description
        values: $values
        features: $features
        pricing: $pricing
        devices: $devices
        categories: $categories
        plans: $plans
        logo: $logo
        featured: $featured
        attachments: $attachments
      }
    ) {
      _id
      userId
    }
  }
`;