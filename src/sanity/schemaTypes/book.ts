import { defineField, defineType } from "sanity";

export const bookSchema = defineType({
  name: "book",
  title: "Book Content",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt Text",
          description:
            "Giving credit to source. Important for SEO and accessibility.",
        },
      ],
      options: { hotspot: true },
    }),
    defineField({
      name: "articleTitle",
      type: "string",
    }),
    defineField({
      name: "body",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      title: "Audio File",
      name: "audioFile",
      type: "file",
      options: {
        accept: "audio/*",
        storeOriginalFilename: false,
      },
      fields: [
        {
          name: "description",
          type: "string",
          title: "Description",
        },
      ],
    }),
  ],
});
