import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { UserResolver } from "../resolvers/UserResolver";
import { QuestionResolver } from "../resolvers/QuestionResolver";

export const createSchema = (): Promise<GraphQLSchema> =>
  buildSchema({
    resolvers: [UserResolver, QuestionResolver],
    validate: false,
  });
