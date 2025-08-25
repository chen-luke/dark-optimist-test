import { client } from "@/sanity/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import { SanityDocument } from "next-sanity";

const BIO_QUERY = `*[_id == "id_bio"][0]`;
const MISSION_QUERY = `*[_id == "id_mission"][0]`;
const BOOK_QUERY = `*[_id == 'id_book'][0]{
  ...,
  "audioUrl": audioFile.asset->url
}`;

const PODCAST_QUERY = `*[_type == "podcast"] | order(orderRank) {
  ...,
  "audioUrl": podcastAudio.asset->url
}`;

const VIDEO_QUERY = `*[_type == "video"] | order(orderRank)`;

const contentFetcher = {
  urlFor: (source: SanityImageSource) => {
    const { projectId, dataset } = client.config();
    return projectId && dataset
      ? imageUrlBuilder({ projectId, dataset }).image(source)
      : null;
  },

  getBioContent: async (): Promise<SanityDocument | null> => {
    const bio = await client.fetch<SanityDocument>(BIO_QUERY);
    return bio;
  },

  getMissionContent: async (): Promise<SanityDocument | null> => {
    const mission = await client.fetch<SanityDocument>(MISSION_QUERY);
    return mission;
  },

  getBookContent: async (): Promise<SanityDocument | null> => {
    const book = await client.fetch<SanityDocument>(BOOK_QUERY);
    return book;
  },

  getPodcastsContent: async () => {
    return await client.fetch<SanityDocument>(PODCAST_QUERY);
  },

  getVideoContent: async () => {
    return await client.fetch<SanityDocument>(VIDEO_QUERY);
  },
};

export default contentFetcher;
