export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  overview: string;
}

export interface MovieDetails extends Movie {
  cast: Array<{ id: number; name: string }>;
  director: string;
  runtime: number;
  genres: Array<{ id: number; name: string }>;
  vote_average: number;
  adult: boolean;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
