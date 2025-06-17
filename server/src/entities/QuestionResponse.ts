import { ObjectType, Field} from "type-graphql";
import { ActorType } from "../types/Actor";
import { MovieType } from "../types/Movie";

@ObjectType()
export class QuestionResponse {
  @Field()
  hash: string;

  @Field(() => ActorType)
  actor: ActorType;

  @Field(() => MovieType)
  movie: MovieType;
}

@ObjectType()
export class CheckAnswerResponse {
  @Field()
  correct: boolean;
}