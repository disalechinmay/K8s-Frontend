import React, { Component } from "react";
import { Spinner, Container } from "react-bootstrap";

class SmallLoadingPage extends Component {
	state = {};
	render() {
		if (this.props.customMessage)
			return (
				<React.Fragment>
					<Container>
						<div className="d-flex align-items-center">
							<Spinner animation="grow" variant="dark" />
							&emsp;
							<h3>{this.props.customMessage}</h3>
						</div>
					</Container>
				</React.Fragment>
			);

		return (
			<React.Fragment>
				<Container>
					<div className="d-flex align-items-center">
						<Spinner animation="grow" variant="dark" size="sm" />
						&emsp;
						<h3>Loading...</h3>
					</div>
				</Container>
			</React.Fragment>
		);
	}
}

export default SmallLoadingPage;
