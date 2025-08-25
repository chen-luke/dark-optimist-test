import { createClient, defineLive } from "next-sanity";

// Basic client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-05-01",
  useCdn: true,
  // A token with read permissions is required for real-time updates
  token: process.env.SANITY_API_READ_TOKEN,
});

// Export the live-enabled fetcher and the Live component
export const { sanityFetch, SanityLive } = defineLive({
  client,
  // The same token can be used for browser and server
  serverToken: process.env.SANITY_API_READ_TOKEN,
  browserToken: process.env.SANITY_API_READ_TOKEN,
});
