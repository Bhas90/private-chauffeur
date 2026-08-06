export const routePaths = {
  home: "/",
  about: "/about",

  services: "/services",
  serviceDetail: "/services/:slug",

  fleet: "/fleet",
  fleetDetail: "/fleet/:slug",

  serviceAreas: "/service-areas",
  serviceAreaDetail: "/service-areas/:slug",

  blog: "/blog",
  blogDetail: "/blog/:slug",

  contact: "/contact",
  quote: "/get-a-quote",
  thankYou: "/thank-you",

  faq: "/faqs",

  privacy: "/privacy-policy",
  terms: "/terms-and-conditions",
  cancellationPolicy:
    "/cancellation-and-refund-policy",
  cookiePolicy: "/cookie-policy",
  reportProblem: "/report-a-problem",

  notFound: "/404",

  adminLogin: "/admin/login",
  adminDashboard: "/admin",
  adminBlogs: "/admin/blogs",
  adminNewBlog: "/admin/blogs/new",
  adminEditBlog: "/admin/blogs/:id/edit",
  adminEmailSettings: "/admin/email-settings",
} as const;