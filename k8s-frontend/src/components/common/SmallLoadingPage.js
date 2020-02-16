import React, { Component } from "react";
import { CircleLoader } from "react-spinners";

class SmallLoadingPage extends Component {
	state = {};
	render() {
		return (
			<React.Fragment>
				<div className="small-loading-page">
					<div className="loading-page-content">
						<span className="loader">
							<CircleLoader size={"5em"} color={"#ecf0f1"} />
						</span>

						<span className="message">
							{this.props.customMessage || "Loading"}
						</span>

						<span className="logo">Symphonize</span>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default SmallLoadingPage;
