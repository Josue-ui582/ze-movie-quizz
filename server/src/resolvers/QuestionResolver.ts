import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { QuestionResponse } from "../types/QuestionResponse"
import { CheckAnswerResponse } from "../types/CheckAnswerResponse";
import { TMDBService } from "../services/tmdb";

@Resolver()
export class QuestionResolver {
  @Query(() => QuestionResponse)
  async getQuestion() {
    try {
      const question = await TMDBService.generateQuestion();
      console.log("Question générée dans resolver:", question);

      return {
        hash: question.hash,
        actor: {
          name: question.actor.name,
        },
        movie: {
          title: question.movie.title,
          poster: question.movie.poster,
        },
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
    const correct = await TMDBService.checkAnswer(hash, userAnswer);
    if (correct === null) throw new Error("Question introuvable ou expirée");
    return { correct };
  }
}