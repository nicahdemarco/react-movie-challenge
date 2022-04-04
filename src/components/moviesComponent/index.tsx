import React, { useState, Suspense, useEffect } from "react";
import { MovieCardComp } from "../movieCardComponent";
import { LoadingComponent } from "../loadingComponent";
import { SearchComp } from "../searchComponent";
import { IMovieCard, IMovieDetails } from "../../types/types";
import { getMovieDetails, API_KEY, parsedError } from "../../fetchService/fetchService";
import "./moviesComp.scss";

export const MoviesComp = ({ movieResults }: { movieResults: IMovieCard[] }): JSX.Element => {
	const [searchResponseState, setSearchResponseState] = useState<IMovieCard[]>([]);
	const [complementaryMovieData, setComplementaryMovieData] = useState<IMovieDetails[]>();

	let filteredList: IMovieCard[];

	filteredList = movieResults && movieResults.filter((movie: IMovieCard) => {
		if (movieResults.indexOf(movie) < 10) {
			return movie;
		}

		return filteredList;
	});
	console.log(filteredList); //Esto tiene data correcta 

	useEffect(() => {
		const detailedMovies: IMovieDetails[] = [];
		if (!movieResults) return;

		movieResults &&
			filteredList.map((filteredMovie) => {
				return getMovieDetails(API_KEY, filteredMovie.id)
					.then((data) => {
						debugger
						data && detailedMovies.push(data)
						console.log(detailedMovies);

					})
					.catch((err) => parsedError(err))
					.finally( () => setComplementaryMovieData(detailedMovies));
				// return detailedMovies;
			});

	}, [movieResults, filteredList])



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
								complementaryMovieData !== undefined ?
								complementaryMovieData.map((singleMovie: IMovieDetails, key: React.Key | null | undefined) => {

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
				{/* <Suspense fallback={<LoadingComponent message={'searching movie'} />}>
					<div className='card-container'>
						{
							searchResponseState.length > 0 ?
								searchResponseState.map((movie: IMovieDetails, key: React.Key | null | undefined) => {
									return <MovieCardComp movie={movie} key={key} />
								})
								: null
						}
					</div>
				</Suspense> */}
			</div >
		</>
	</Suspense>


};