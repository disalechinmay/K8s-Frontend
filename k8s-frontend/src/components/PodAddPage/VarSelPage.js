import React, { Component } from "react";
import { getConfigMaps } from "../../services";

class VarSelPage extends Component {
	state = {
		pageLoading: true,
		configMapsListSet: false,
		configMapsList: [],
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
					Select the env vars you wish to attach to this pod:
				</span>
				<br />

				{/* Map configMapsList if it is set. */}
				{this.state.configMapsListSet &&
					this.state.configMapsList.map((configMapInfo, index) => {
						return (
							<div className="pairs">
								<React.Fragment key={index + "_FRAG"}>
									{Object.entries(
										configMapInfo.configMapData
									).map(([key, val], index) => {
										return (
											<div
												className="pair select"
												key={index + "_FRAG"}
											>
												<span className="key">
													{key}
												</span>
												&emsp;
												<span className="value">
													{val}
												</span>
												<br />
											</div>
										);
									})}
								</React.Fragment>
							</div>
						);
					})}
			</React.Fragment>
		);
	}
}

export default VarSelPage;
