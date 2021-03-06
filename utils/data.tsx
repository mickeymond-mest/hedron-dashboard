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
      link: "/vendor/dashboard",
      as: "/vendor/dashboard",
      subs: []
    },
    {
      label: "Products",
      icon: "verified_user",
      link: "/vendor/products",
      as: "/vendor/products",
      subs: [
        {
          label: "All Products",
          icon: "verified_user",
          link: "/vendor/products",
          as: "/vendor/products"
        },
        {
          label: "Add Product",
          icon: "add",
          link: "/vendor/products/create",
          as: "/vendor/products/create"
        },
      ]
    },
    {
      label: "My Leads",
      icon: "perm_identity",
      link: "/vendor/leads",
      as: "/vendor/leads",
      subs: [
        {
          label: "All Leads",
          icon: "add",
          link: "/vendor/leads",
          as: "/vendor/leads"
        },
      ]
    },
    {
      label: "Help Center",
      icon: "help",
      link: "/vendor/help",
      as: "/vendor/help",
      subs: []
    },
    {
      label: "Settings",
      icon: "settings",
      link: "/vendor/settings",
      as: "/vendor/settings",
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
      subs: [
        {
          label: "All Vendors",
          icon: "verified_user",
          link: "/admin/vendors",
          as: "/admin/vendors"
        },
      ]
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