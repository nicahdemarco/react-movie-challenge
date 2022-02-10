import React from "react";
import "./loadingComp.scss";

export const LoadingComponent = ({ message }: any): JSX.Element => {

	return (
		<>
			<div className="loading-container">
				<span className="loading-text"> {message} </span>
				<span className="loading-logo"> </span>
			</div>
		</>
	);

};
