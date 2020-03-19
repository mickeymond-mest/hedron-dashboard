import { gql } from '@apollo/client';

export const ADD_PRODUCT = gql`
  mutation AddProduct(
    $name: String
    $summary: String
    $description: String
    $values: [ValueInput!]
    $features: [SelectableInput!]
    $pricing: [SelectableInput!]
    $devices: [SelectableInput!]
    $categories: [SelectableInput!]
    $plans: [PlanInput!]
    $logo: AttachmentInput
    $featured: AttachmentInput
    $attachments: [AttachmentInput!]
  ) {
    addProduct(
      product: {
        name: $name
        summary: $summary
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

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $status: String
    $productId: String!
  ) {
    updateProduct(
      update: {
        status: $status
      },
      productId: $productId
    ) {
      _id
    }
  }
`;

export const ADD_VENDOR = gql`
  mutation AddVendor(
    $name: String
    $contact: String
    $website: String
    $facebook: String
    $location: String
    $linkedIn: String
    $twitter: String
    $founded: String
  ) {
    addVendor(
      vendor: {
        name: $name
        contact: $contact
        website: $website
        facebook: $facebook
        location: $location
        linkedIn: $linkedIn
        twitter: $twitter
        founded: $founded
      }
    ) {
      _id
      userId
    }
  }
`;