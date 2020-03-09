import { gql } from 'apollo-boost';

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
    }
  }
`;

export const ARCHIVE_PRODUCT = gql`
  mutation ArchiveProduct(
    $productId: String!
  ) {
    archiveProduct(productId: $productId) {
      _id
    }
  }
`;

export const RESTORE_PRODUCT = gql`
  mutation RestoreProduct(
    $productId: String!
  ) {
    restoreProduct(productId: $productId) {
      _id
    }
  }
`;

export const UPDATE_STATUS = gql`
  mutation UpdateStatus(
    $status: String!
    $productId: String!
  ) {
    updateStatus(
      status: $status,
      productId: $productId
    ) {
      _id
    }
  }
`;