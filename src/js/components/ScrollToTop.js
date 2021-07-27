import React from "react";
import PropTypes from "prop-types";

class ScrollToTop extends React.Component {
	componentDidUpdate(prevProps) {
		this.props.location ? window.scrollTo(0, 0) : null;
	}

	render() {
		return this.props.children;
	}
}

export default ScrollToTop;
ScrollToTop.propTypes = {
	location: PropTypes.object,
	children: PropTypes.any
};
