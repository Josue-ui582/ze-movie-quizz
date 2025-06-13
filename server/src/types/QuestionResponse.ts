import { ObjectType, Field } from "type-graphql";
import { Actor } from "../entities/QuestionResponse";
import { Movie } from "../entities/QuestionResponse";

@ObjectType()
export class QuestionResponse {
  @Field()
  hash: string;

  @Field(() => Actor)
  actor: Actor;

  @Field(() => Movie)
  movie: Movie;
}