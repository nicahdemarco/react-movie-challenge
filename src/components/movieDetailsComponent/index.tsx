import React, { Suspense, useEffect, useState } from "react";
import { LoadingComponent } from "../loadingComponent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IMovieDetails } from "../../types/types";
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import "./movieDetailsComp.scss";
import { getMovieDetails, API_KEY, parsedError } from "../../fetchService/fetchService";
import ReactStars from "react-stars";

export const MovieDetailComp = ({ movieId }: { movieId: number | undefined }): JSX.Element => {
	const [movieDetails, setMovieDetails] = useState<IMovieDetails>();
	const isPosterFound: boolean = !!movieDetails?.poster_path;


	useEffect(() => {
		!movieId && getMovieDetails(API_KEY, movieId!)
			.then((data) => setMovieDetails(data))
			.catch((err) => parsedError(err))
	}, [movieId]);

	const getPoster = (path: string | undefined): string  => {
		const URL = 'https://image.tmdb.org/t/p/w500';
		let fullURL = ''

		if (path !== null) fullURL = `url(${URL}${path})`

		return fullURL;
	};


	const setBackgroundClassName = (): string => {
		return !isPosterFound ? 'card__background poster-not-found' : 'card__background';
	}


	return <Suspense fallback={<LoadingComponent message={'Loading movies details'} />}>

		<>
			<div className={setBackgroundClassName()} style={{ backgroundImage: getPoster(movieDetails?.poster_path) }}>
				<div className="poster-data" >
					<div className="card-header">
						<FontAwesomeIcon
							icon="arrow-left"
							className="fa-chevron-left back-btn" />
						<FontAwesomeIcon
							icon="heart"
							className="fa-heart"
						/>
						<div className="rate">{!movieDetails?.adult ? `13+` : 'NO RATE'}</div>
					</div>

					<div className="card-main">
						<p>{movieDetails?.genre_ids}</p>
						< ReactStars
							className={'stars-container'}
							count={5 | 0}
							value={movieDetails ? movieDetails.vote_average : 0}
							size={12}
							color2={'#FF3365'}
							half={true}
						/>
						{movieDetails ? `${movieDetails.vote_count} REVIEWS` : 0}
					</div>

					<div className="card-footer">
						<p className="card-footer-title">{movieDetails ? movieDetails.title : 'NO TITlE'}</p>
						<p className="card-footer-duration">{movieDetails ? `${movieDetails.vote_average} MIN` : `0 MIN`}</p>
					</div>

				</div>
				<div className="poster-overlay"></div>
			</div>
		</>
	</Suspense >
};

