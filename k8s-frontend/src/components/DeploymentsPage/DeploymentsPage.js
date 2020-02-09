import React, { Component } from "react";
import { getDeployments } from "../../services";
import SmallLoadingPage from "../SmallLoadingPage";
import DeploymentCard from "./DeploymentCard";

class DeploymentsPage extends Component {
	state = {
		pageLoading: true,
		deploymentsListSet: false,
		deploymentsList: []
	};

	constructor(props) {
		super(props);

		// Get list of deployments for the selected namespace.
		getDeployments(this.props.namespace).then(result => {
			let newState = { ...this.state };

			newState.pageLoading = false;
			newState.deploymentsListSet = true;
			newState.deploymentsList = result.payLoad;

			this.setState(newState);
		});
	}

	componentDidUpdate(previousProps) {
		// If namespace is changed, get new data.
		if (previousProps.namespace !== this.props.namespace) {
			this.setState({
				pageLoading: true,
				deploymentsListSet: false,
				deploymentsList: []
			});

			getDeployments(this.props.namespace).then(result => {
				let newState = { ...this.state };

				newState.pageLoading = false;
				newState.deploymentsListSet = true;
				newState.deploymentsList = result.payLoad;

				this.setState(newState);
			});
		}
	}

	render() {
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
