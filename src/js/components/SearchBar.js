import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import FontAwesome from "react-fontawesome";
import { Form, Badge } from "react-bootstrap";
import Proptypes from "prop-types";
import { useHistory, Link } from "react-router-dom";

export const SearchBar = prop => {
	const { store, actions } = useContext(Context);
	const [input, setInput] = useState("");
	const [watchListNumber, setWatchListNumber] = useState("");
	let history = useHistory();

	const handleInput = e => {
		setInput(e.target.value);
		actions.addQuery(e.target.value);
		{
			e.target.value !== ""
				? actions.getMovieFromQuery(e.target.value)
				: actions.addPagination("") & actions.getMovieList(1);
		}
	};

	// useEffect(() => {
	// 	setWatchListNumber(store.watchListMovies.length);
	// }, [!store.watchListMovies]);

	return (
		<div className="searchbar">
			<div className="searchbar-content">
				<FontAwesome className="fa-search" name="search" size="2x" />
				<Form>
					<input
						type="text"
						className="searchbar-input"
						placeholder="Search"
						value={input}
						onChange={handleInput}
					/>
				</Form>
			</div>
			<div className="watchlist-container">
				<Link to="/watch_list">
					<span className="watchlist-header">Watch List</span>
					<FontAwesome className="fa-heart" name="heart" size="2x" />
					<Badge pill bg="primary" className="badge-heart">
						{store.watchListMovies.length > 0
							? store.watchListMovies.length
							: ""}
					</Badge>
				</Link>
			</div>
		</div>
	);
};

SearchBar.Proptypes = {
	value: Proptypes.string
};
