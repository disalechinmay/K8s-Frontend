import React, { Component } from "react";
import { Spinner, Container } from "react-bootstrap";

class LoadingPage extends Component {
	state = {};
	render() {
		if (this.props.customMessage)
			return (
				<React.Fragment>
					<Container>
						<div className="d-flex align-items-center min-vh-100">
							<Spinner animation="grow" variant="dark" />
							&emsp;
							<h1>{this.props.customMessage}</h1>
						</div>
					</Container>
				</React.Fragment>
			);

		return (
			<React.Fragment>
				<Container>
					<div className="d-flex align-items-center min-vh-100">
						<Spinner animation="grow" variant="dark" />
						&emsp;
						<h1>Loading...</h1>
					</div>
				</Container>
			</React.Fragment>
		);
	}
}

export default LoadingPage;
