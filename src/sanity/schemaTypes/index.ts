import { type SchemaTypeDefinition } from "sanity";
import { missionStatement } from "./mission-statement";
import { bioSchema } from "./biography";
import { bookSchema } from "./book";
import { podcastSchema } from "./podcast";
import { videoSchema } from "./video";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [missionStatement, bioSchema, bookSchema, podcastSchema, videoSchema],
};
