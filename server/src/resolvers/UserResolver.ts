import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { UserInput } from "../types";
import { UserResponse, FieldError } from "./UserResponse";

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg("input") input: UserInput
  ): Promise<UserResponse> {
    const errors: FieldError[] = [];

    if (input.username.length <= 2) {
      errors.push({
        field: "username",
        message: "Username must be longer than 2 characters",
      });
    }

    if (!input.email.includes("@")) {
      errors.push({
        field: "email",
        message: "Invalid email",
      });
    }

    if (errors.length > 0) {
      return { errors };
    }

    const existingUser = await User.findOne({
      where: { username: input.username },
    });
    if (existingUser) {
      return {
        errors: [
          { field: "username", message: "Username already taken" },
        ],
      };
    }

    try {
      const user = await User.create(input).save();
      return { user };
    } catch (err) {
      return {
        errors: [
          {
            field: "unknown",
            message: "An unexpected error occurred",
          },
        ],
      };
    }
  }

  @Query(() => User, { nullable: true })
  async getByUsername(
    @Arg("username") username: string
  ): Promise<User | undefined> {
    return User.findOne({ where: { username } });
  }
}