import React, { useState, useEffect } from "react";
import "./App.scss";
import { MoviesComp } from "./components/moviesComponent";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faArrowLeft, faHeart, faSearch, faStar, faTimes } from '@fortawesome/free-solid-svg-icons';
import { getPopularMovies } from './fetchService/fetchService';
import { API_KEY, parsedError } from './fetchService/fetchService';
import { IRawData } from "./types/types";

library.add(fab, faArrowLeft, faHeart, faSearch, faStar, faTimes)

function App() {
	const [appState, setAppState] = useState<IRawData>();

	useEffect(() => {
		!appState && getPopularMovies(API_KEY)
			.then((data) => setAppState(data))
			.catch((err) => parsedError(err))
	}, [appState]);

	return (
		<div className="app-container">
			{appState ?
				<MoviesComp
					movieResults={appState.results}
				/> : null
			}
		</div>
	);
}


export default App;
