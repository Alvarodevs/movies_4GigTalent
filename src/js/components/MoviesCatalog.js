import React, { useEffect, useState, useContext, useRef } from "react";
import { Context } from "../store/appContext.js";
import { Button } from "react-bootstrap";
import MovieCard from "./MovieCard.js";

export const MoviesCatalog = () => {
	const { store, actions } = useContext(Context);
	const myRef = useRef(null);

	//EFFECT WHAT TO RENDER IN HOME PAGE
	useEffect(() => {
		actions.getMovieList(1);
		{
			store.q !== "" ? actions.getMovieFromQuery() : "";
		}
	}, [store.page >= 0]);

	//SCROLL BACK TO TOP OF MOVIES
	const scrollToTop = () => myRef.current.scrollIntoView();

	//PAGINATION
	const paginationForward = () => {
		actions.addPagination(++store.page);
		actions.getMovieFromQuery();
		scrollToTop();
	};

	const paginationBackward = () => {
		actions.addPagination(--store.page);
		actions.getMovieFromQuery();
		scrollToTop();
	};

	//MOVIES CARDS ARRAYS (NOT QUERY & QUERY)
	let movies =
		store.movies.length > 0 &&
		store.movies.map((movie, index) => (
			<MovieCard key={index} {...movie} />
		));

	let moviesFromQuery = store.moviesFromQuery.map(moviesArray =>
		moviesArray.map((item, index) => <MovieCard key={index} {...item} />)
	);

	return (
		<>
			<div className="movies-container" ref={myRef}>
				{store.q === "" ? movies : moviesFromQuery}
			</div>
			<div className="d-flex flex-row justify-content-center">
				<div>
					{store.page <= 1 ? (
						""
					) : (
						<Button
							className="page-navigation-btn"
							onClick={() => paginationBackward()}>
							Previous page
						</Button>
					)}
				</div>
				<Button
					className="page-navigation-btn"
					onClick={() => paginationForward()}>
					Next page
				</Button>
			</div>
		</>
	);
};
