import React, { Component } from "react";
import { getConfigMaps } from "../../services";
import { SmallLoadingPage, SmallErrorPage } from "../common";
import ConfigMapCard from "./ConfigMapCard";

/* 
	Compulsory props:
		1. refreshState (method) [NON-TESTABLE]
			- Used to refresh parent's state.
		2. namespace
		3. renderEditPage (method)
		4. renderAddPage (method)

	Optional props:
		None
*/
class ConfigMapsPage extends Component {
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

	componentDidUpdate(previousProps) {
		// If namespace is changed, get new data.
		if (previousProps.namespace !== this.props.namespace) {
			this.setState({
				...this.state,
				pageLoading: true,
				configMapsListSet: false,
				configMapsList: []
			});

			this.getNewData();
		}
	}

	render() {
		// If errorSet is set, render SmallErrorPage.
		if (this.state.errorSet)
			return (
				<SmallErrorPage
					errorDescription={this.state.errorDescription}
				/>
			);

		// If pageLoading is set, render SmallLoadingPage.
		if (this.state.pageLoading) return <SmallLoadingPage />;

		if (
			this.state.pageLoading === false &&
			this.state.configMapsListSet &&
			this.state.configMapsList.length === 0
		)
			return (
				<React.Fragment>
					<span className="not-found-card">
						<span className="fa fa-exclamation-triangle" />
						&emsp; No configMaps present in this namespace.
					</span>
				</React.Fragment>
			);

		return (
			<React.Fragment>
				<div className="add-resource-section">
					<span className="message">
						<span className="logo fa fa-info" />
						Config Maps allow you to store non-sensitive environment
						variables.
					</span>
					<button
						className="add-resource-button"
						onClick={() => this.props.renderAddPage("CONFIG_MAP")}
					>
						+ Create new config map
					</button>
				</div>

				{/* Map configMapsList if it is set. */}
				{this.state.configMapsListSet &&
					this.state.configMapsList.map((configMapInfo, index) => {
						return (
							<React.Fragment key={index + "_FRAG"}>
								<ConfigMapCard
									key={index + "_configMaps_CARD"}
									index={index}
									namespace={this.props.namespace}
									configMapInfo={configMapInfo}
									refreshState={() =>
										this.props.refreshState()
									}
									renderEditPage={(
										resourceType,
										resourceName
									) =>
										this.props.renderEditPage(
											resourceType,
											resourceName
										)
									}
								/>
							</React.Fragment>
						);
					})}
			</React.Fragment>
		);
	}
}

export default ConfigMapsPage;
