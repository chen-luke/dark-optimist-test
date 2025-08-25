// In schemas/podcastEpisode.js

import { defineField, defineType } from "sanity";

export const podcastSchema = defineType({
  name: "podcast",
  title: "Podcast Episodes",
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
      title: "Episode Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "studio",
      title: "Podcast Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    // defineField({
    //   name: "episodeNumber",
    //   title: "Episode Number",
    //   type: "number",
    // }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
    defineField({
      name: "coverArt",
      title: "Cover Art",
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
      name: "summary",
      type: "array",
      of: [{ type: "block" }],
    }),
    // Your improved and combined audio field goes here!
    defineField({
      title: "Podcast Audio",
      name: "podcastAudio",
      type: "file",
      options: {
        accept: "audio/*",
        storeOriginalFilename: true,
      },
      fields: [
        // {
        //   name: "duration",
        //   type: "number",
        //   title: "Duration (in seconds)",
        // },
        {
          name: "transcription",
          type: "text",
          title: "Transcription",
          rows: 15,
        },
      ],
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
