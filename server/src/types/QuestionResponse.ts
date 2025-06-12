import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class QuestionResponse {
  @Field()
  hash: string;

  @Field()
  actor: string;

  @Field()
  movie: string;
}

@ObjectType()
export class CheckAnswerResponse {
  @Field()
  correct: boolean;

  @Field({ nullable: true })
  message?: string;
}