import { IRawData } from "../types/types";
export const API_KEY = "66e6c4190fa8095b70e61bda4702a19f";

/**
 * Get a list of the current popular Movies 
 * @param API_KEY ApiKey required to validate the request
 * @returns An object with an array of movies
 */
export const getPopularMovies = (API_KEY: string): Promise<IRawData> => {
    const URL_REQUEST = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1`;
    return fetch(URL_REQUEST)
        .then((dbRes: Response) => dbRes.json())
        .catch((err: Error) => parsedError(err));
}

/**
 * Get detailed information on a particular title
 * @param API_KEY ApiKey required to validate the request
 * @param MOVIE_ID Id of a particular movie
 * @returns A detailed movie object
 */
export const getMovieDetails = (API_KEY: string, MOVIE_ID: string): Promise<IRawData> => {
    const URL_REQUEST = `https://api.themoviedb.org/3/movie/${MOVIE_ID}?api_key=${API_KEY}&language=en-US`;
    return fetch(URL_REQUEST)
        .then((dbRes: Response) => dbRes.json())
        .catch((err: Error) => parsedError(err));
}

/**
 * Find title by whatever you are familiar with, such as : name of title
 * @param API_KEY ApiKey required to validate the request
 * @param USER_QUERY The query that the user input to search
 * @returns An array of results objects
 */
export const findMoviesBySearch = (API_KEY: string, USER_QUERY: string): Promise<IRawData> => {
    const URL_REQUEST = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${USER_QUERY}&language=en-US&page=1&include_adult=false`;

    return fetch(URL_REQUEST)
        .then((dbRes: Response) => dbRes.json())
        .catch((err: Error) => parsedError(err));
}

export const parsedError = (err: Error) => {
    console.log(`ERROR: ${err.message}`);
    return `<div> Something went wrong, ${err.message}. Please try again later...</div>`;
};
