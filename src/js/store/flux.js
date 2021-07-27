const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			API_KEY: "d84daf9ffd56d83fb8b21434d969c1f6",
			q: "",
			page: 1,
			movies: [],
			singleMovieDetails: [],
			IMG_API: "https://image.tmdb.org/t/p/w1280/",
			IMG_ACTOR: "https://image.tmdb.org/t/p/w200/",
			movieCredits: [],
			moviesFromQuery: [],
			watchListMovies: []
		},

		//close store

		actions: {
			//MOVIE LIST HOME PAGE SORT BY POPULARITY
			getMovieList: pageNumber => {
				let store = getStore();

				let url = `https://api.themoviedb.org/3/discover/movie?api_key=${
					store.API_KEY
				}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${
					pageNumber ? pageNumber : store.page
				}`;

				fetch(url)
					.then(resp => resp.json())
					.then(data => setStore({ movies: data.results }));
				setStore({ q: "" });
			},

			addQuery: userQuery => {
				let store = getStore();
				let query = store.q;
				query = userQuery;
				setStore({ q: [query] });
			},
			addPagination: pageInput => {
				let store = getStore();
				let page = store.page;
				page = pageInput;
				setStore({ page: [pageInput] });
				{
					page == [""] ? setStore({ page: page + 1 }) : "";
				}
			},
			getMovieFromQuery: () => {
				let store = getStore();
				let query = store.q;
				let page = store.page;
				const urlWithQuery = `https://api.themoviedb.org/3/search/movie?api_key=${store.API_KEY}&page=${page}&query=${query}`;

				query !== ""
					? fetch(urlWithQuery)
							.then(resp => resp.json())
							.then(data =>
								setStore({ moviesFromQuery: [data.results] })
							)
					: "";
			},
			addMovieToWatchList: movieId => {
				let store = getStore();
				let watchListMovies = store.watchListMovies;
				const urlMovieToWatchList = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${store.API_KEY}`;

				fetch(urlMovieToWatchList)
					.then(resp => resp.json())
					.then(data => watchListMovies.push(data));
			},

			removeMovieFromWatchList: movieId => {
				let store = getStore();
				let watchListMovies = store.watchListMovies;
				let newWatchList = watchListMovies.filter(
					movie => movie.id != movieId
				);
				setStore({ watchListMovies: newWatchList });
			},

			getMovieDetail: props => {
				let store = getStore();
				const urlSingleMovieDetails = `https://api.themoviedb.org/3/movie/${props}?api_key=${store.API_KEY}`;

				fetch(urlSingleMovieDetails)
					.then(resp => resp.json())
					.then(data => setStore({ singleMovieDetails: data }));
			},
			getCredits: movieId => {
				let store = getStore();
				const urlFetchForCredits = `https://api.themoviedb.org/3//movie/${movieId}/credits?api_key=${store.API_KEY}`;

				fetch(urlFetchForCredits)
					.then(resp => resp.json())
					.then(data => setStore({ movieCredits: data.cast }));
			}
		}
	};
};

export default getState;
