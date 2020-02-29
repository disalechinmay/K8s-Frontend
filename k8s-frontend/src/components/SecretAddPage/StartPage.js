import React, { Component } from "react";

class StartPage extends Component {
	render() {
		return (
			<React.Fragment>
				<span className="greeting">Let's start!</span>

				<span className="message">
					We need to get some information in order to create the
					resource.
				</span>

				<span
					className="button-positive"
					onClick={() => this.props.renderNextPage()}
				>
					Alright!
				</span>
			</React.Fragment>
		);
	}
}

export default StartPage;
