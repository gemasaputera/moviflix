import { MovieDetails, MoviesResponse } from '@/types/movie';
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: 'Bearer ' + API_KEY
  }
});

export async function fetchMovies(
  page: number = 1,
  category: string = 'popular'
): Promise<MoviesResponse> {
  const response = await api.get<MoviesResponse>(`/movie/${category}`, {
    params: { page }
  });
  return response.data;
}

export async function searchMovies(
  query: string,
  page: number = 1
): Promise<MoviesResponse> {
  const response = await api.get<MoviesResponse>('/search/movie', {
    params: { query, page }
  });
  return response.data;
}

interface CastMember {
  id: number;
  name: string;
  known_for_department: string;
}

export async function fetchMovieDetails(id: string): Promise<MovieDetails> {
  const [movieResponse, creditsResponse] = await Promise.all([
    api.get<MovieDetails>(`/movie/${id}`),
    api.get<{ cast: CastMember[] }>(`/movie/${id}/credits`)
  ]);

  const director = creditsResponse.data.cast.find(
    (person) => person.known_for_department === 'Directing'
  );

  return {
    ...movieResponse.data,
    cast: creditsResponse.data.cast,
    director: director?.name || 'Unknown'
  };
}
