import { ObjectType, Field} from "type-graphql";

@ObjectType()
export class Actor {
  @Field()
  id: number;

  @Field()
  name: string;
}

@ObjectType()
export class Movie {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  poster: string;
}

@ObjectType()
export class QuestionResponse {
  @Field()
  hash: string;

  @Field(() => Actor)
  actor: Actor;

  @Field(() => Movie)
  movie: Movie;
}

@ObjectType()
export class CheckAnswerResponse {
  @Field()
  correct: boolean;
}