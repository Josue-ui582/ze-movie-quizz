import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { QuestionResponse, CheckAnswerResponse } from "../types/QuestionResponse"
import { TMDBService } from "../services/tmdb";

@Resolver()
export class QuestionResolver {
  @Query(() => QuestionResponse)
  async getQuestion() {
    try {
      const question = await TMDBService.generateQuestion();
      return {
        hash: question.hash,
        actor: question.actor,
        movie: question.movie,
      };
    } catch (error) {
      throw new Error("Impossible de générer la question");
    }
  }

  @Mutation(() => CheckAnswerResponse)
  async checkAnswer(
    @Arg("hash") hash: string,
    @Arg("userAnswer") userAnswer: boolean
  ) {
    const correct = TMDBService.checkAnswer(hash, userAnswer);
    if (correct === null) throw new Error("Question introuvable ou expirée");
    return { correct };
  }
}