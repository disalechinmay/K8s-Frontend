import React, { Component } from "react";
import { getSecrets } from "../../services";
import { SmallLoadingPage, SmallErrorPage } from "../common";
import SecretCard from "./SecretCard";

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
class SecretsPage extends Component {
	state = {
		pageLoading: true,
		secretsListSet: false,
		secretsList: [],
		errorSet: false,
		errorDescription: ""
	};
	_isMounted = false;

	// Makes a service call and sets secretsList.
	getNewData() {
		// Get list of secrets for the selected namespace.
		getSecrets(this.props.namespace)
			.then(result => {
				if (this._isMounted)
					this.setState({
						...this.state,
						pageLoading: false,
						secretsListSet: true,
						secretsList: result.payLoad
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
				secretsListSet: false,
				secretsList: []
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
			this.state.secretsListSet &&
			this.state.secretsList.length === 0
		)
			return (
				<React.Fragment>
					No deployments present in this namespace.
				</React.Fragment>
			);

		return (
			<React.Fragment>
				<div className="add-resource-section">
					<span className="message">
						<span className="logo fa fa-info" />
						Secrets allow you to store sensitive environment
						variables in an encrypted format.
					</span>
					<button
						className="add-resource-button"
						onClick={() => this.props.renderAddPage("SECRET")}
					>
						+ Create new secret
					</button>
				</div>

				{/* Map secretsList if it is set. */}
				{this.state.secretsListSet &&
					this.state.secretsList.map((secretInfo, index) => {
						return (
							<React.Fragment key={index + "_FRAG"}>
								<SecretCard
									key={index + "_SECRET_CARD"}
									index={index}
									namespace={this.props.namespace}
									secretInfo={secretInfo}
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

export default SecretsPage;
