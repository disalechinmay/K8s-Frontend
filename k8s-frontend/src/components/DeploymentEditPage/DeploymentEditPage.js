import React, { Component } from "react";
import { getDeployment, patchDeployment } from "../../services";
import { SmallLoadingPage, SmallErrorPage } from "../common";
import { JsonEditor as Editor } from "jsoneditor-react";

/* 
	Compulsory props:
		1. namespace
		2. resourceName

	Optional props:
		None
*/
class DeploymentEditPage extends Component {
	state = {
		deployment: null,
		updatedDeployment: null,
		deploymentSet: false,
		pageLoading: true,
		changesMade: false,
		changesSaved: false
	};
	_isMounted = false;

	// Makes a service call and sets deployment.
	getNewData() {
		// Get list of deployments for the selected namespace.
		getDeployment(this.props.namespace, this.props.resourceName)
			.then(result => {
				if (this._isMounted)
					this.setState({
						...this.state,
						pageLoading: false,
						deploymentSet: true,
						deployment: result.payLoad
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

	onChangeHandler(event) {
		this.setState({
			...this.state,
			changesMade: true,
			changesSaved: false,
			updatedDeployment: event
		});
	}

	saveChanges() {
		this.setState({
			...this.state,
			changesSaved: true,
			deployment: this.state.updatedDeployment
		});
	}

	// Makes a service call to patch the deployment.
	patchChanges() {
		patchDeployment(
			this.props.namespace,
			this.props.resourceName,
			this.state.deployment
		)
			.then(result => {
				console.log(result);
			})
			.catch(error => {
				if (this._isMounted)
					this.setState({
						...this.state,
						errorSet: true,
						errorDescription: error
					});

				console.log(error);
			});
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

		return (
			<React.Fragment>
				<div className="json">
					<span className="flex flex-row space-between w-100 ">
						{/* Title */}
						<span className="flex flex-row title mw-80 flex-start">
							<div className="json-title">
								<span className="fa fa-lastfm"></span> 
								Editing:&nbsp;
								{this.props.resourceName}
							</div>
						</span>

						{/* Save Changes Button */}
						<span className="resource-manage-section">
							{this.state.changesMade === false && (
								<span className="save-changes-button-no-change fa fa-save" />
							)}

							{this.state.changesMade === true &&
								this.state.changesSaved === false && (
									<span
										onClick={() => this.saveChanges()}
										className="save-changes-button-unsaved fa fa-save"
									/>
								)}
							{this.state.changesMade === true &&
								this.state.changesSaved === true && (
									<span
										className="save-changes-button-saved fa fa-upload"
										onClick={() => this.patchChanges()}
									/>
								)}
						</span>
					</span>

					{this.state.deploymentSet && (
						<Editor
							value={this.state.deployment}
							onChange={event => this.onChangeHandler(event)}
						/>
					)}
				</div>
			</React.Fragment>
		);
	}
}

export default DeploymentEditPage;
