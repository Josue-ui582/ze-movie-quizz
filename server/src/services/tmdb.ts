
import fetch from "node-fetch";
import crypto from "crypto";

const TMDB_API_KEY = "a2f7de1a4da4393a6721d045a1ff9e63";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export class TMDBService {
  private static questionsCache = new Map<string, boolean>();

  static async fetchFromTMDB(endpoint: string) {
    const url = `${TMDB_BASE_URL}${endpoint}&api_key=${TMDB_API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("TMDB API error");
    return res.json();
  }

  static async generateQuestion() {
    const actorId = Math.floor(Math.random() * 5000) + 1;

    const personData = await this.fetchFromTMDB(`/person/${actorId}?language=fr-FR&`);
    const credits = await this.fetchFromTMDB(`/person/${actorId}/movie_credits?language=fr-FR&`);

    if (!credits.cast || credits.cast.length === 0) {
      throw new Error("Aucun film pour cet acteur");
    }

    const movie = credits.cast[Math.floor(Math.random() * credits.cast.length)];

    const correctAnswer = Math.random() > 0.5;

    let questionMovie = movie;
    if (!correctAnswer) {
      const page = Math.floor(Math.random() * 10) + 1;
      const popularMovies = await this.fetchFromTMDB(`/movie/popular?language=fr-FR&page=${page}&`);
      questionMovie = popularMovies.results[Math.floor(Math.random() * popularMovies.results.length)];
    }

    const hash = crypto
      .createHash("sha256")
      .update(`${actorId}-${questionMovie.id}-${Date.now()}`)
      .digest("hex");

    this.questionsCache.set(hash, correctAnswer);

    return {
      hash,
      actor: { id: actorId, name: personData.name },
      movie: { id: questionMovie.id, title: questionMovie.title, poster: `https://image.tmdb.org/t/p/w500${questionMovie.poster_path}` },
    };
  }

  static checkAnswer(hash: string, userAnswer: boolean): boolean | null {
    const correctAnswer = this.questionsCache.get(hash);
    if (correctAnswer === undefined) return null;
    this.questionsCache.delete(hash); // éviter reuse
    return correctAnswer === userAnswer;
  }
}