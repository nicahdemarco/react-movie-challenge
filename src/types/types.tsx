
export interface IMovieCard {
	id: number;
	title: string;
	plot: string;
	genres: string[];
	poster_path: string;
	imdb_rating: string;
	release_date?: string;
	rated: string;
	stars: string[];
	runningTimeInMinutes: number
}
