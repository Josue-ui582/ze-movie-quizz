import { Arg, Mutation, Query, Resolver, Ctx } from "type-graphql";
import { User } from "../entities/User";
import { UserInput } from "../types";
import bcrypt from "bcryptjs";
import { MyContext } from "../types/MyContext";
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

  @Mutation(() => UserResponse)
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return {
        errors: [
          { field: "username", message: "Username does not exist" },
        ],
      };
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return {
        errors: [
          { field: "password", message: "Incorrect password" },
        ],
      };
    }

    req.session.userId = user.id;

    return { user };
  }

  @Query(() => User, { nullable: true })
  async getByUsername(
    @Arg("username") username: string
  ): Promise<User | undefined> {
    return User.findOne({ where: { username } });
  }
}