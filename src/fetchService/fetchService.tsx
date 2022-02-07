import { IRawMovies } from "../App";

/**
 * Get a list of IDs of popular Movies 
 * @param RAPID_API_KEY ApiKey required to validate the request
 * @returns An array of movie IDs
 */
export const getPopularMovies = (RAPID_API_KEY: string): Promise<IRawMovies> => {
    const URL_REQUEST = "https://imdb8.p.rapidapi.com/title/get-most-popular-movies?homeCountry=US&purchaseCountry=US&currentCountry=US";
    debugger
    return fetch(URL_REQUEST, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "imdb8.p.rapidapi.com",
            "x-rapidapi-key": `${RAPID_API_KEY}`
        }
    })
        .then((dbRes: Response) => {
            return dbRes.json()
                .then((moviesData) => moviesData);
        })
        .catch((err: Error) => {
            parsedError(err)
        });
}

/**
 * Get detail information of the title
 * @param RAPID_API_KEY ApiKey required to validate the request
 * @param MOVIE_ID Id of a particular movie
 * @returns A movie object
 */
export const getMovieDetails = (RAPID_API_KEY: string, MOVIE_ID: string): Promise<IRawMovies> => {
    const URL_REQUEST = `https://imdb8.p.rapidapi.com/title/get-details?tconst=${MOVIE_ID}`;

    return fetch(URL_REQUEST, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "imdb8.p.rapidapi.com",
            "x-rapidapi-key": `${RAPID_API_KEY}`
        }
    })
        .then((dbRes: Response) => {
            return dbRes.json()
                .then((i) => i);
        })
        .catch((err: Error) => parsedError(err));
}

/**
 * Find title by whatever you are familiar with, such as : name of title
 * @param RAPID_API_KEY ApiKey required to validate the request
 * @param USER_QUERY The query that the user input to search
 * @returns An array of results objects
 */
export const findMoviesBySearch = (RAPID_API_KEY: string, USER_QUERY: string): Promise<IRawMovies> => {
    const URL_REQUEST = `https://imdb8.p.rapidapi.com/title/find?q=${USER_QUERY}`;

    return fetch(URL_REQUEST, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "imdb8.p.rapidapi.com",
            "x-rapidapi-key": `${RAPID_API_KEY}`
        }
    })
        .then((dbRes: Response) => {
            return dbRes.json()
                .then((resultsData) => resultsData);
        })
        .catch((err: Error) => parsedError(err));
}

const parsedError = (err: Error) => {
    console.log(`ERROR: ${err.message}`);
    return `<div> Something went wrong, ${err.message}. Please try again later...</div>`;
};
