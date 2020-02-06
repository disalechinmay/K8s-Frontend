import React, { Component } from "react";

function sum(n1, n2) {
	return n1 + n2;
}

class HomePage extends Component {
	state = {};

	render() {
		return (
			<React.Fragment>
				<h1>Home Page</h1>
			</React.Fragment>
		);
	}
}

// export default HomePage;

export { sum, HomePage };
