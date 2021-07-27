import React, { useContext, useEffect, useState } from "react";
import { Navbar, Image } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { SearchBar } from "./SearchBar.js";
import { Context } from "../store/appContext.js";

export const Header = () => {
	const { store, actions } = useContext(Context);
	let history = useHistory();
	const value = "";

	const handleResetStore = () => {
		actions.getMovieList(1);
		history.push({ pathname: "/", state: store.movies });
	};

	return (
		<Navbar bg="dark" className="navbar-container justify-content-between">
			<Navbar.Brand
				href="#home"
				className="brand-container"
				onClick={handleResetStore}>
				<Link
					to="/"
					className="d-flex align-items-center text-decoration-none">
					<i className="fas fa-video fa-3x mr-3" />
					<h3>Movie APP</h3>
				</Link>
			</Navbar.Brand>
			<SearchBar value={value} />
			<div className="d-flex flex-row">
				<a
					href="https://www.linkedin.com/in/alvarodevs4you/"
					target="_blank"
					rel="noreferrer">
					<img
						src="https://cdn.iconscout.com/icon/free/png-256/linkedin-2662666-2213265.png"
						alt="Github logo"
					/>
				</a>

				<a
					href="https://github.com/Alvarodevs"
					target="_blank"
					rel="noreferrer">
					<img
						src="https://camo.githubusercontent.com/db92c1b3caecf27c7d9302183eda8cf9a59e890af4a84f5da944a8b4c55f51cd/68747470733a2f2f63646e2e69636f6e73636f75742e636f6d2f69636f6e2f667265652f706e672d3235362f6769746875622d3135332d3637353532332e706e67"
						alt="Github logo"
					/>
				</a>
			</div>
		</Navbar>
	);
};
