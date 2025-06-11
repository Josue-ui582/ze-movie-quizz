import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { UserResolver } from "../resolvers/UserResolver";

export const createSchema = (): Promise<GraphQLSchema> =>
  buildSchema({
    resolvers: [URIErrorserResolver],
    validate: false,
  });
