import { ObjectType, Field } from "type-graphql";
import { ActorType } from "./Actor";
import { MovieType } from "./Movie";

@ObjectType()
export class QuestionResponse {
  @Field()
  hash: string;

  @Field(() => ActorType)
  actor: ActorType;

  @Field(() => MovieType)
  movie: MovieType;
}