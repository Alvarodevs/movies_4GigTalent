import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext.js";
import FontAwesome from "react-fontawesome";

const MovieCard = props => {
	const { store, actions } = useContext(Context);
	const [idMovie, setIdMovie] = useState("");
	let history = useHistory();

	const handleId = e => {
		setIdMovie(props.id);
	};

	const handleAddToWatchList = e => {
		actions.addMovieToWatchList(idMovie);
	};

	const handleDeleteMovie = e => {
		actions.removeMovieFromWatchList(idMovie);
		history.push("/watch_list");
	};

	return (
		<div className="movie" onMouseOver={handleId} value={idMovie}>
			<Link to={"/movie/" + idMovie}>
				<div>
					<img
						src={
							props.poster_path
								? store.IMG_API + props.poster_path
								: "https://images.unsplash.com/photo-1512149177596-f817c7ef5d4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=345&q=80"
						}
					/>
				</div>
				<div className="movie-info">
					<p>{props.title}</p>
					<span>{props.vote_average}</span>
				</div>
				<div className="overview">
					<div className="d-flex flex-row">
						{location.pathname === "/watch_list" ? (
							<Link to={"/watch_list"}>
								<FontAwesome
									className="fa-heart"
									name="trash-alt"
									size="2x"
									onClick={handleDeleteMovie}></FontAwesome>
							</Link>
						) : (
							<FontAwesome
								className="fa-heart"
								name="heart"
								size="2x"
								onClick={handleAddToWatchList}></FontAwesome>
						)}
						<h3>Overview:</h3>
					</div>
					{props.overview ? (
						<p>{props.overview}</p>
					) : (
						"No overview available"
					)}
				</div>
			</Link>
		</div>
	);
};

MovieCard.propTypes = {
	title: PropTypes.string,
	overview: PropTypes.string,
	vote_average: PropTypes.number,
	poster_path: PropTypes.string,
	id: PropTypes.number
};

export default MovieCard;
