import React, { Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { MovieDetailComp } from "../movieDetailsComponent";
import ReactStars from 'react-stars';
import { IMovieCard, IMovieDetails } from "../../types/types";
import { LoadingComponent } from "../loadingComponent";
import "./movieCardComp.scss";

export const MovieCardComp = ({ movie }: { movie: IMovieDetails}): JSX.Element => {

	const isPosterFound: boolean = !!movie.poster_path;
	const setBackgroundClassName = (): string => {
		return !isPosterFound ? 'poster poster-not-found' : 'poster';
	}


	const setPoster = (path: string): string => {
		const URL = 'https://image.tmdb.org/t/p/w500';
		let fullURL = ''

		if (path !== null) fullURL = `url(${URL}${path})`

		return fullURL;
	};

	return (
		<Suspense fallback={<LoadingComponent message={'Loading movies'} />}>
			<div>
				{
					// movieDetailsId === undefined ?
					<div className={setBackgroundClassName()} style={{ backgroundImage: setPoster(movie.poster_path) }}>
						<div className="poster-data"
						// onClick={() => { setMovieId(movie.id) }}
						>
							<div className="card-header">
								<div className="rate">{!movie.adult ? `13+` : 'NO RATE'}</div>
								<FontAwesomeIcon
									icon="heart"
									className="fa-heart"
								/>
							</div>

							<div className="card-main">
								{/* <p>{movieDetails && movieDetails.genres ? movieDetails.genres.map((genre) => genre.name) : 'NO DATA'}</p> */}
								{/* <p>{movie && movie.genres ? movie.genres.forEach((genre)=> genre.name): 'NO DATA'}</p> */}
								< ReactStars
									className={'stars-container'}
									count={5 | 0}
									value={movie ? movie.vote_average : 0}
									size={12}
									color2={'#FF3365'}
									half={true}
								/>
								{movie ? `${movie.vote_count} REVIEWS` : 0}
							</div>

							<div className="card-footer">
								<p className="card-footer-title">{movie ? movie.title : 'NO TITlE'}</p>
								<p className="card-footer-duration">{movie ? `${movie.runtime} MIN` : `0 MIN`}</p>
							</div>

						</div>
						<div className="poster-overlay"></div>
					</div>
					// : null
				}
			</div>
			<div>
				{/* {movieId !== undefined ?
					<MovieDetailComp
						movieId={movie && movieId ? movieId : undefined}
					/>
					: undefined
				} */}
			</div>

		</Suspense >


	);
};