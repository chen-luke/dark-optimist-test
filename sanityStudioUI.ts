// ./sanityStudioUI.ts

import type { StructureBuilder, ListBuilder } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

/**
 * The structure resolver.
 *
 * @param S - The structure builder.
 * @returns The list builder.
 * @see https://www.sanity.io/docs/structure-builder
 */
export const darkOptimistUiStructure = (
  S: StructureBuilder,
  context: any
): ListBuilder =>
  S.list()
    .title("Dark Optimist Content")
    .items([
      // Create a singleton item for the "Mission" document

      // List the rest of the document types, but filter out the singleton

      // Add a visual separator
      S.divider(),

      S.listItem()
        .title("Biography Statement")
        .id("id_bio")
        .child(S.document().schemaType("biography").documentId("id_bio")),

      S.divider(),

      S.listItem()
        .title("Mission Statement")
        .id("id_mission") // Use the schema name as the ID
        .child(
          S.document().schemaType("mission").documentId("id_mission") // Assign a fixed document ID
        ),

      S.divider(),

      S.listItem()
        .title("Book Section Content")
        .id("id_book")
        .child(S.document().schemaType("book").documentId("id_book")),

      S.divider(),

      orderableDocumentListDeskItem({
        type: "podcast",
        title: "Podcasts by Order",
        S,
        context,
      }),

      S.divider(),

      orderableDocumentListDeskItem({
        type: "video",
        title: "Videos by Order",
        S,
        context,
      }),
      S.divider(),

      ...S.documentTypeListItems().filter((listItem) => {
        const id = listItem.getId();
        return (
          typeof id == "string" &&
          !["mission", "biography", "book", "video", "podcast"].includes(id)
        );
      }),
    ]);
