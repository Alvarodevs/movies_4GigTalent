import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header } from "./components/Header";
import { MoviesCatalog } from "./components/MoviesCatalog";
import { MovieSingle } from "./components/MovieSingle";
import { WatchList } from "./components/WatchList";
import injectContext from "./store/appContext";

const Layout = () => {
	return (
		<>
			<div className="main-container text-center">
				<div className="app-container">
					<BrowserRouter>
						<Header />
						<Switch>
							<Route exact path="/">
								<MoviesCatalog />
							</Route>
							<Route
								exact
								path="/movie/:id"
								component={MovieSingle}></Route>
							<Route
								exact
								path="/watch_list"
								component={WatchList}></Route>
						</Switch>
					</BrowserRouter>
				</div>
			</div>
		</>
	);
};
export default injectContext(Layout);
