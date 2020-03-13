// Personal Interfaces
export interface UpdateStatusInput {
  status: string;
  productId: string;
}




/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface AttachmentInput {
  filename: string;
  url: string;
  mimetype: string;
  size: number;
}

export interface DemoRequestFilter {
  receiver: string;
}

export interface DemoRequestInput {
  sender: string;
  receiver: string;
  productId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  company: string;
  position: string;
  website: string;
  numberOfEmployees: string;
  message: string;
}

export interface PlanInput {
  name: string;
  price: string;
  features: SelectableInput[];
}

export interface ProductFilter {
  archived?: boolean;
  status?: string;
  userId?: string;
}

export interface ProductInput {
  name: string;
  summary: string;
  description: string;
  values: ValueInput[];
  features: SelectableInput[];
  pricing: SelectableInput[];
  devices: SelectableInput[];
  categories: SelectableInput[];
  plans: PlanInput[];
  logo: AttachmentInput;
  featured: AttachmentInput;
  attachments: AttachmentInput[];
}

export interface SearchQueryInput {
  query?: string;
}

export interface SelectableInput {
  label: string;
  value: string;
}

export interface ValueInput {
  name: string;
  description: string;
}

export interface AttachmentType {
  _id: string;
  filename: string;
  url: string;
  mimetype: string;
  size: number;
}

export interface DemoRequestType {
  _id?: string;
  sender: string;
  receiver: string;
  productId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  company: string;
  position: string;
  website: string;
  numberOfEmployees: string;
  message: string;
}

export interface IMutation {
  addProduct(product: ProductInput): ProductType | Promise<ProductType>;
  archiveProduct(productId: string): ProductType | Promise<ProductType>;
  restoreProduct(productId: string): ProductType | Promise<ProductType>;
  deleteProduct(productId: string): ProductType | Promise<ProductType>;
  updateStatus(status: string, productId: string): ProductType | Promise<ProductType>;
  requestDemo(demo: DemoRequestInput): DemoRequestType | Promise<DemoRequestType>;
}

export interface PlanType {
  _id: string;
  name: string;
  price: string;
  features: SelectableType[];
}

export interface ProductType {
  _id?: string;
  userId?: string;
  ibmDiscoveryDocumentId: string;
  status: string;
  archived: boolean;
  name: string;
  summary: string;
  description: string;
  values: ValueType[];
  features: SelectableType[];
  pricing: SelectableType[];
  devices: SelectableType[];
  categories: SelectableType[];
  plans: PlanType[];
  logo: AttachmentType;
  featured: AttachmentType;
  attachments: AttachmentType[];
}

export interface IQuery {
  searchProducts(searchQueryInput: SearchQueryInput): ProductType[] | Promise<ProductType[]>;
  getProductByName(productName: string): ProductType | Promise<ProductType>;
  products(filter: ProductFilter): ProductType[] | Promise<ProductType[]>;
  getProductById(productId: string): ProductType | Promise<ProductType>;
  demoRequests(filter: DemoRequestFilter): DemoRequestType[] | Promise<DemoRequestType[]>;
}

export interface SelectableType {
  _id: string;
  label: string;
  value: string;
}

export interface ISubscription {
  productUpdated(productId: string): string | Promise<string>;
}

export interface ValueType {
  _id: string;
  name?: string;
  description?: string;
}
