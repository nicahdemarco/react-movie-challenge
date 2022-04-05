import React, { useState, useEffect } from "react";
import "./App.scss";
import { MoviesComp } from "./components/moviesComponent";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faArrowLeft, faHeart, faSearch, faStar, faTimes } from '@fortawesome/free-solid-svg-icons';
import { getPopularMovies } from './fetchService/fetchService';
import { API_KEY, parsedError } from './fetchService/fetchService';
import { IMovieCard } from "./types/types";

library.add(fab, faArrowLeft, faHeart, faSearch, faStar, faTimes)

function App() {
	const [fetchResult, setFetchResult] = useState<IMovieCard[]>();

	useEffect(() => {
		const filteredMovieList: IMovieCard[] = [];

		!fetchResult &&
			getPopularMovies(API_KEY)
				.then((data) => {
					data &&
						data.results.filter((movie: IMovieCard) => {
							if (data.results.indexOf(movie) < 10) return movie;

							return filteredMovieList.push(movie);
						});

					return setFetchResult(filteredMovieList);
				})
				.catch((err) => parsedError(err))

	}, [fetchResult]);

	return (
		<div className="app-container">
			{fetchResult &&
				<MoviesComp
					movieResults={fetchResult}
				/>
			}
		</div>
	);
}

export default App;
