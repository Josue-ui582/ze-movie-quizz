import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
export class MovieType {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  poster: string;
}