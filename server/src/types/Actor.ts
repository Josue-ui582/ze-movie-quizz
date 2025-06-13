import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
export class ActorType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}