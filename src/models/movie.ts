import {Genre} from "./genre";

export type Movie = {
  id: string;
  title: string;
  posterUrl: string;
  summary: string;
  duration: string;
  directors: string[];
  mainActors: string[];
  genres: Genre[];
  datePublished: string;
  rating: string;
  ratingValue: number;
  bestRating: number;
  worstRating: number;
  writers: string[];
};
