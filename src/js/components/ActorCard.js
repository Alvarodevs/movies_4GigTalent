import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import PropTypes from "prop-types";

export const Actor = prop => {
	const { store, actions } = useContext(Context);

	return (
		<div className="actor">
			<img
				src={
					prop.actor.profile_path
						? `${store.IMG_ACTOR}${prop.actor.profile_path}`
						: "https://www.intra-tp.com/wp-content/uploads/2017/02/no-avatar.png"
				}
				alt={prop.name}
			/>
			<div className="d-flex flex-row w-100 justify-content-between">
				<span className="actor-name">{prop.actor.name}</span>
				<span className="m-auto mx-2 align-items-center">as</span>
				<span className="actor-character">
					{prop.actor.character
						? prop.actor.character
						: prop.actor.name}
				</span>
			</div>
		</div>
	);
};

Actor.propTypes = {
	profile_path: PropTypes.string,
	name: PropTypes.string,
	character: PropTypes.string
};
