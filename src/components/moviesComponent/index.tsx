import React, { useState, Suspense } from "react";
import { MovieCardComp } from "../movieCardComponent";
import { LoadingComponent } from "../loadingComponent";
import { SearchComp } from "../searchComponent";
import { IMovieCard } from "../../types/types";
import "./moviesComp.scss";

export const MoviesComp = ({ movieResults }: { movieResults: IMovieCard[] }): JSX.Element => {
	const [searchResponseState, setSearchResponseState] = useState<IMovieCard[]>([]);

	let filteredList: IMovieCard[];

	filteredList = movieResults && movieResults.filter((movie: IMovieCard) => {
		if (movieResults.indexOf(movie) < 10) {
			return movie;
		}

		return filteredList;
	});

	return <Suspense fallback={<LoadingComponent message={'Loading movies'} />}>

		<>
			<div className="movies-comp">
				<div className="search-container">
					<SearchComp
						setSearchResponseState={setSearchResponseState}
					/>
				</div>
				{/* Popular movie list */}

				<Suspense fallback={<LoadingComponent message={'Loading Popular movies'} />}>
					<div className='card-container'>
						{
							!searchResponseState.length &&
								filteredList !== undefined ?
								filteredList.map((singleMovie: IMovieCard, key: React.Key | null | undefined) => {

									if (singleMovie) {
										return < MovieCardComp
											movie={singleMovie}
											key={key}
										/>
									}

									return null;
								})
								: null
						}
					</div>
				</Suspense>

				{/* Search result movie list */}
				<Suspense fallback={<LoadingComponent message={'searching movie'} />}>
					<div className='card-container'>
						{
							searchResponseState.length > 0 ?
								searchResponseState.map((movie: IMovieCard, key: React.Key | null | undefined) => {
									return <MovieCardComp movie={movie} key={key} />
								})
								: null
						}
					</div>
				</Suspense>
			</div >
		</>
	</Suspense>

};