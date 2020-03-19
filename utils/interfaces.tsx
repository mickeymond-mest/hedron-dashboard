
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface AttachmentInput {
  filename?: string;
  url?: string;
  mimetype?: string;
  size?: number;
}

export interface ChatInput {
  message: string;
  sessionId?: string;
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
  name?: string;
  price?: string;
  features?: SelectableInput[];
}

export interface ProductFilter {
  archived?: boolean;
  status?: string;
  userId?: string;
}

export interface ProductInput {
  status?: string;
  name?: string;
  summary?: string;
  description?: string;
  values?: ValueInput[];
  features?: SelectableInput[];
  pricing?: SelectableInput[];
  devices?: SelectableInput[];
  categories?: SelectableInput[];
  plans?: PlanInput[];
  logo?: AttachmentInput;
  featured?: AttachmentInput;
  attachments?: AttachmentInput[];
}

export interface SearchQueryInput {
  query?: string;
}

export interface SelectableInput {
  label?: string;
  value?: string;
}

export interface ValueInput {
  name?: string;
  description?: string;
}

export interface VendorInput {
  name?: string;
  contact?: string;
  website?: string;
  facebook?: string;
  location?: string;
  linkedIn?: string;
  twitter?: string;
  founded?: string;
}

export interface AttachmentType {
  _id: string;
  filename: string;
  url: string;
  mimetype: string;
  size: number;
}

export interface ChatType {
  sessionId: string;
  output: OutputType;
}

export interface DemoRequestType {
  _id: string;
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

export interface EntityType {
  productId: string;
}

export interface GenericType {
  response_type: string;
  text: string;
}

export interface IntentType {
  intent: string;
  confidence: number;
}

export interface IMutation {
  addProduct(product: ProductInput): ProductType | Promise<ProductType>;
  archiveProduct(productId: string): ProductType | Promise<ProductType>;
  restoreProduct(productId: string): ProductType | Promise<ProductType>;
  deleteProduct(productId: string): ProductType | Promise<ProductType>;
  updateProduct(update: ProductInput, productId: string): ProductType | Promise<ProductType>;
  addDemoRequest(demo: DemoRequestInput): DemoRequestType | Promise<DemoRequestType>;
  askQuestion(chat: ChatInput): ChatType | Promise<ChatType>;
  addVendor(vendor: VendorInput): VendorType | Promise<VendorType>;
  updateVendor(update: VendorInput, vendorId: string): VendorType | Promise<VendorType>;
  deleteVendor(vendorId: string): VendorType | Promise<VendorType>;
}

export interface OutputType {
  generic: GenericType[];
  intents: IntentType[];
  entities: EntityType[];
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
  slug: string;
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
  productByName(productName: string): ProductType | Promise<ProductType>;
  allProducts(filter: ProductFilter): ProductType[] | Promise<ProductType[]>;
  productById(productId: string): ProductType | Promise<ProductType>;
  allDemoRequests(filter: DemoRequestFilter): DemoRequestType[] | Promise<DemoRequestType[]>;
  allVendors(): VendorType[] | Promise<VendorType[]>;
}

export interface SelectableType {
  _id: string;
  label: string;
  value: string;
}

export interface ValueType {
  _id: string;
  name?: string;
  description?: string;
}

export interface VendorType {
  _id: string;
  userId: string;
  name: string;
  contact: string;
  website: string;
  facebook: string;
  location: string;
  linkedIn: string;
  twitter: string;
  founded: string;
}
