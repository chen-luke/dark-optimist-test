import { defineField, defineType } from "sanity";

export const videoSchema = defineType({
  name: "video",
  title: "Video Interviews",
  type: "document",
  fields: [
    defineField({
      name: "orderRank",
      title: "Order",
      type: "string",
      hidden: true,
    }),
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
      name: "body",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "url",
      type: "url",
      title: "Video URL",
    }),
    // defineField({
    //   name: "likeCounter",
    //   title: "Likes",
    //   type: "number",
    //   initialValue: 0,
    //   readOnly: true,
    // }),
  ],
});
