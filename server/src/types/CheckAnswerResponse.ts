import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class CheckAnswerResponse {
  @Field()
  correct: boolean;

  @Field({ nullable: true })
  message?: string;
}