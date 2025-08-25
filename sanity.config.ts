"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { darkOptimistUiStructure } from "./sanityStudioUI";

// Singleton Sections
// A singleton content section does not allow the user to add multiple versions
// of the content. There is ONLY one copy.
const singletonTypes = ["mission", "biography", "book"];

export default defineConfig({
  basePath: "/admin",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure: darkOptimistUiStructure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  document: {
    actions: (prev, { schemaType }) => {
      const isSingleton = singletonTypes.includes(schemaType);
      if (isSingleton) {
        return prev.filter(
          (action) =>
            (action as any).action !== "delete" &&
            (action as any).action !== "duplicate"
        );
      }

      return prev;
    },
  },
});
