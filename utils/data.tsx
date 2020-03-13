// Pricing Data
export const pricing = [
  { "value": "free", "label": "Free" },
  { "value": "free-trial", "label": "Free Trial" },
  { "value": "open-source", "label": "Open Source" },
  { "value": "subscription", "label": "Subscription" },
  { "value": "other", "label": "Other" }
];

// Device Data
export const devices = [
  { "value": "desktop", "label": "Desktop" },
  { "value": "mobile", "label": "Mobile" },
  { "value": "laptop", "label": "Laptop" },
  { "value": "tablet", "label": "Tablet" },
  { "value": "other", "label": "Other" }
];

// Categories Data
export const categories = [
  { "value": "financial", "label": "Financial" },
  { "value": "accounting", "label": "Accounting" },
  { "value": "word-processor", "label": "Word Processor" },
  { "value": "crm", "label": "CRM" },
  { "value": "other", "label": "Other" }
]

export const links = {
  vendor: [
    {
      label: "Dashboard",
      icon: "dashboard",
      link: "/vendors/dashboard",
      as: "/vendors/dashboard",
      subs: []
    },
    {
      label: "Inbox",
      icon: "inbox",
      link: "/vendors/inbox",
      as: "/vendors/inbox",
      subs: []
    },
    {
      label: "Products",
      icon: "verified_user",
      link: "/vendors/products",
      as: "/vendors/products",
      subs: [
        {
          label: "All Products",
          icon: "verified_user",
          link: "/vendors/products",
          as: "/vendors/products"
        },
        {
          label: "Add Product",
          icon: "add",
          link: "/vendors/products/create",
          as: "/vendors/products/create"
        },
      ]
    },
    {
      label: "My Leads",
      icon: "perm_identity",
      link: "/vendors/leads",
      as: "/vendors/leads",
      subs: []
    },
    {
      label: "Chat Room",
      icon: "chat",
      link: "/vendors/chat",
      as: "/vendors/chat",
      subs: []
    },
    {
      label: "Help Center",
      icon: "help",
      link: "/vendors/help",
      as: "/vendors/help",
      subs: []
    },
    {
      label: "Settings",
      icon: "settings",
      link: "/vendors/settings",
      as: "/vendors/settings",
      subs: []
    },
  ],
  admin: [
    {
      label: "Dashboard",
      icon: "dashboard",
      link: "/admin/dashboard",
      as: "/admin/dashboard",
      subs: []
    },
    {
      label: "Products",
      icon: "verified_user",
      link: "/admin/products",
      as: "/admin/products",
      subs: [
        {
          label: "All Products",
          icon: "verified_user",
          link: "/admin/products",
          as: "/admin/products"
        },
      ]
    },
    {
      label: "Vendors",
      icon: "perm_identity",
      link: "/admin/vendors",
      as: "/admin/vendors",
      subs: []
    },
    {
      label: "Settings",
      icon: "settings",
      link: "/admin/settings",
      as: "/admin/settings",
      subs: []
    },
  ],
}