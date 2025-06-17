import fetch from "node-fetch";
import crypto from "crypto";
import { Question } from "../entities/Question";

const TMDB_API_KEY = "9453026242a9d0fe895b9688ecbb7432";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export class TMDBService {
  private static questionsCache = new Map<string, boolean>();

  private static buildUrl(endpoint: string): string {
    const separator = endpoint.includes("?") ? "&" : "?";
    return `${TMDB_BASE_URL}${endpoint}${separator}api_key=${TMDB_API_KEY}`;
  }

  static async fetchFromTMDB(endpoint: string) {
    const url = this.buildUrl(endpoint);

    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.error(`❌ TMDB API error [${res.status}] for: ${url}`);
        throw new Error(`TMDB API error (${res.status})`);
      }

      return await res.json();
    } catch (error) {
      console.error("❌ Fetch failed:", error);
      throw error;
    }
  }

  static async generateQuestion() {
    try {
      const page = Math.floor(Math.random() * 10) + 1;
      const popularActors = await this.fetchFromTMDB(`/person/popular?language=fr-FR&page=${page}`);

      if (!popularActors.results || popularActors.results.length === 0) {
        throw new Error("Aucun acteur populaire trouvé");
      }

      const actor = popularActors.results[Math.floor(Math.random() * popularActors.results.length)];
      const credits = await this.fetchFromTMDB(`/person/${actor.id}/movie_credits?language=fr-FR`);

      console.log("Actor raw data from TMDB:", actor);


      if (!credits.cast || credits.cast.length === 0) {
        throw new Error("Aucun crédit de film trouvé pour cet acteur");
      }

      const movie = credits.cast[Math.floor(Math.random() * credits.cast.length)];
      const correctAnswer = Math.random() > 0.5;

      let questionMovie = movie;

      if (!correctAnswer) {
        const moviePage = Math.floor(Math.random() * 10) + 1;
        const popularMovies = await this.fetchFromTMDB(`/movie/popular?language=fr-FR&page=${moviePage}`);

        if (!popularMovies.results || popularMovies.results.length === 0) {
          throw new Error("Aucun film populaire trouvé");
        }

        questionMovie = popularMovies.results[Math.floor(Math.random() * popularMovies.results.length)];
      }

      const hash = crypto
        .createHash("sha256")
        .update(`${actor.id}-${questionMovie.id}-${Date.now()}`)
        .digest("hex");

      this.questionsCache.set(hash, correctAnswer);

      await Question.create({
        hash,
        actorName: actor.name,
        actorId: actor.id,
        movieTitle: questionMovie.title,
        movieId: questionMovie.id,
        moviePoster: `https://image.tmdb.org/t/p/w500${questionMovie.poster_path}`,
        correctAnswer,
      }).save();

      return {
        hash,
        actor: {
          id: actor.id,
          name: actor.name,
          avatar: actor.profile_path
            ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
            : null,
        },
        movie: {
          id: questionMovie.id,
          title: questionMovie.title,
          poster: `https://image.tmdb.org/t/p/w500${questionMovie.poster_path}`,
        },
      };

    } catch (err) {
      console.error("❌ Échec de génération de question :", err);
      throw err;
    }
  }


  static async checkAnswer(hash: string, userAnswer: boolean): Promise<boolean | null> {
    const question = await Question.findOne({ where: { hash } });
    if (!question) return null;

    await Question.delete({ hash });

    return question.correctAnswer === userAnswer;
  }
}