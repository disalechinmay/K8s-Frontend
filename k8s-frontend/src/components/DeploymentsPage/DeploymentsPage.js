import React, { Component } from "react";
import { getDeployments } from "../../services";
import { SmallLoadingPage, SmallErrorPage } from "../common";
import DeploymentCard from "./DeploymentCard";

/* 
	Compulsory props:
		1. refreshState (method) [NON-TESTABLE]
			- Used to refresh parent's state.
		2. namespace
		3. renderEditPage (method)

	Optional props:
		None
*/
class DeploymentsPage extends Component {
	state = {
		pageLoading: true,
		deploymentsListSet: false,
		deploymentsList: [],
		errorSet: false,
		errorDescription: ""
	};
	_isMounted = false;

	// Makes a service call and sets deploymentsList.
	getNewData() {
		// Get list of deployments for the selected namespace.
		getDeployments(this.props.namespace)
			.then(result => {
				if (this._isMounted)
					this.setState({
						...this.state,
						pageLoading: false,
						deploymentsListSet: true,
						deploymentsList: result.payLoad
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
				deploymentsListSet: false,
				deploymentsList: []
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
			this.state.deploymentsListSet &&
			this.state.deploymentsList.length === 0
		)
			return (
				<React.Fragment>
					No deployments present in this namespace.
				</React.Fragment>
			);

		return (
			<React.Fragment>
				{/* Map deploymentsList if it is set. */}
				{this.state.deploymentsListSet &&
					this.state.deploymentsList.map((deploymentInfo, index) => {
						return (
							<React.Fragment key={index + "_FRAG"}>
								<DeploymentCard
									key={index + "_DEPLOYMENT_CARD"}
									index={index}
									deploymentInfo={deploymentInfo}
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

export default DeploymentsPage;
