export interface IRawData {
	results: IMovieCard[];
}
export interface IMovieCard {

	id: number;
	title: string;
	popularity: number;
	poster_path: string;
	vote_average: number;
	overview: string;
	release_date: string;
	adult: boolean,
	backdrop_path: string;
	genre_ids: string[]
	original_language: string;
	original_title: string;
	video: false;
	vote_count: number;
}
export interface IMovieDetails extends IMovieCard {
	budget: number
	genres: [
		{
			id: number,
			name: string,
		}
	]
	homepage: string;
	imdb_id?: string;
	runtime: number;
	tagline?: string;

}