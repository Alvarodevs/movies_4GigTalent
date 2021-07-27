import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Actor } from "./ActorCard";
import { Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

export const MovieSingle = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();

	const idParam = (location.pathname + location.search).substr(7);

	useEffect(() => {
		actions.getMovieDetail(idParam);
		actions.getCredits(idParam);
	}, []);

	//SEARCHING FROM MOVIESINGLE NOT WORKING ALREADY
	// useEffect(() => {
	// 	{
	// 		!store.moviesFromQuery ? history.push("/") : "";
	// 	}
	// }, [idParam]);

	let cast = store.movieCredits.map((actor, index) => {
		return <Actor key={index} actor={actor} />;
	});

	return (
		<>
			<Button className="button-exit-watchlist">
				<Link to="/">Back Homepage</Link>
			</Button>
			<div className="movie-detail">
				<img
					src={
						store.singleMovieDetails.poster_path
							? store.IMG_API +
							  store.singleMovieDetails.poster_path
							: "https://images.unsplash.com/photo-1512149177596-f817c7ef5d4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=345&q=80"
					}
					alt={store.singleMovieDetails.title}
				/>
				<div className="movie-detail-info">
					<p>{store.singleMovieDetails.title} </p>
					<div className="production-info">
						<p>{store.singleMovieDetails.runtime} min.</p>
						<p>
							{store.singleMovieDetails.budget
								? "$ " + store.singleMovieDetails.budget
								: " "}
						</p>
						<p>Rate: {store.singleMovieDetails.vote_average}</p>
					</div>
					<div>{cast}</div>
				</div>
			</div>
		</>
	);
};
