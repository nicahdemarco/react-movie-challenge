import React, { Suspense, useState } from "react";
import "./searchComp.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { findMoviesBySearch, API_KEY, parsedError } from '../../fetchService/fetchService';
import { IMovieCard } from "../../types/types";
import { LoadingComponent } from "../loadingComponent";

type SearchCompType = { setSearchResponseState: (param: IMovieCard[]) => void };

export const SearchComp = ({ setSearchResponseState }: SearchCompType): JSX.Element => {
	const [inputValue, setInputValue] = useState<string>('');

	let handleInputChange = (): void => {
		findMoviesBySearch(API_KEY, inputValue)
			.then((response) => setSearchResponseState(response.results))
			.catch((err) => parsedError(err));
	};

	return <Suspense fallback={<LoadingComponent message={'Loading movies'} />}>
		<>
			<div className="search-comp">
				<input
					name='searchValue'
					type="text"
					placeholder="Find a movie..."
					value={inputValue}
					onKeyPress={(e) => e.key === 'Enter' && handleInputChange()}
					onChange={(e) => setInputValue(e.target.value)}
				/>
				{
					inputValue ?
						<FontAwesomeIcon
							className="icon clear-icon"
							color="#717187"
							fontSize={"8px"}
							icon="times"
							cursor='pointer'
							onClick={() => { setInputValue(''); setSearchResponseState([]) }}
						/>
						: <FontAwesomeIcon
							className="icon search-icon"
							color="#717187"
							fontSize={8}
							icon="search"
						/>
				}
			</div >
		</>
	</Suspense>
};