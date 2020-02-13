import React, { Component } from "react";
import { getDeployments } from "../../services";
import { SmallLoadingPage, SmallErrorPage } from "../common";
import DeploymentCard from "./DeploymentCard";

class DeploymentsPage extends Component {
	state = {
		pageLoading: true,
		deploymentsListSet: false,
		deploymentsList: [],
		errorSet: false,
		errorDescription: ""
	};
	_isMounted = false;

	componentDidMount() {
		this._isMounted = true;

		// Get list of deployments for the selected namespace.
		getDeployments(this.props.namespace)
			.then(result => {
				let newState = { ...this.state };

				newState.pageLoading = false;
				newState.deploymentsListSet = true;
				newState.deploymentsList = result.payLoad;

				if (this._isMounted) this.setState(newState);
			})
			.catch(err => {
				if (this._isMounted)
					this.setState({
						...this.state,
						errorSet: true,
						errorDescription: err
					});
			});
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

			getDeployments(this.props.namespace)
				.then(result => {
					let newState = { ...this.state };

					newState.pageLoading = false;
					newState.deploymentsListSet = true;
					newState.deploymentsList = result.payLoad;

					this.setState(newState);
				})
				.catch(err => {
					this.setState({
						...this.state,
						errorSet: true,
						errorDescription: err
					});
				});
		}
	}

	render() {
		if (this.state.errorSet)
			return (
				<SmallErrorPage
					errorDescription={this.state.errorDescription}
				/>
			);

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
								/>
							</React.Fragment>
						);
					})}
			</React.Fragment>
		);
	}
}

export default DeploymentsPage;
