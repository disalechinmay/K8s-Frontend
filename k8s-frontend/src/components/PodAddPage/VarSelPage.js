import React, { Component } from "react";
import { getConfigMaps } from "../../services";

class VarSelPage extends Component {
	state = {
		pageLoading: true,
		configMapsListSet: false,
		configMapsList: [],
		resourceVars: [],
		errorSet: false,
		errorDescription: ""
	};
	_isMounted = false;

	// Makes a service call and sets configMapsList.
	getNewData() {
		// Get list of configMaps for the selected namespace.
		getConfigMaps(this.props.namespace)
			.then(result => {
				if (this._isMounted)
					this.setState({
						...this.state,
						pageLoading: false,
						configMapsListSet: true,
						configMapsList: result.payLoad
					});
			})
			.catch(error => {
				if (this._isMounted)
					this.setState({
						...this.state,
						errorSet: true,
						errorDescription: error
					});
			});
	}

	componentDidMount() {
		this._isMounted = true;
		this.getNewData();
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		return (
			<React.Fragment>
				<span className="message">
					Select the environment variables you wish to attach to this
					pod:
				</span>
				<br />

				{/* Map configMapsList if it is set. */}
				{this.state.configMapsListSet &&
					this.state.configMapsList.map((configMapInfo, index) => {
						return (
							<div className="pairs" key={index + "_FRAG"}>
								{Object.entries(
									configMapInfo.configMapData
								).map(([key, val], index) => {
									return (
										<div
											className="pair select"
											key={index + "_FRAG"}
										>
											<span
												className="key"
												onClick={event => {
													if (
														!event.target.classList.contains(
															"selected"
														)
													) {
														event.target.classList.add(
															"selected"
														);

														if (this._isMounted) {
															let resourceVars = this
																.state
																.resourceVars;
															resourceVars.push({
																configMapName:
																	configMapInfo.configMapName,
																variable: key
															});

															this.setState({
																...this.state,
																resourceVars
															});
														}

														this.props.setResourceVars(
															this.state
																.resourceVars
														);
													}
												}}
											>
												{key}
											</span>
											&emsp;
											<span className="value">{val}</span>
											<br />
										</div>
									);
								})}
							</div>
						);
					})}

				<br />
				<span>
					<span
						className="button-negative"
						onClick={async () => {
							this.props.renderPreviousPage();
						}}
					>
						Back
					</span>
					&emsp;&emsp;
					<span
						className="button-positive"
						onClick={async () => {
							this.props.renderNextPage();
						}}
					>
						Next
					</span>
				</span>
			</React.Fragment>
		);
	}
}

export default VarSelPage;
