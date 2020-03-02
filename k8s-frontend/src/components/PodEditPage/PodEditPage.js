import React, { Component } from "react";
import { getPod } from "../../services";
import { SmallLoadingPage } from "../common";
import { JSONEditorX } from "../common";
/* 
	Compulsory props:
		1. namespace
		2. resourceName

	Optional props:
		None
*/
class PodEditPage extends Component {
	state = {
		deployment: null,
		updatedPod: null,
		deploymentSet: false,
		pageLoading: true,
		changesMade: false,
		changesSaved: false,
		informationPane: "",
		errorSet: false,
		successSet: false
	};
	_isMounted = false;

	// Makes a service call and sets deployment.
	getNewData() {
		// Get list of deployments for the selected namespace.
		getPod(this.props.namespace, this.props.resourceName)
			.then(result => {
				if (this._isMounted)
					this.setState({
						...this.state,
						pageLoading: false,
						deploymentSet: true,
						deployment: result.payLoad,
						updatedPod: result.payLoad
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

	// If JSON is changed, sets changesMade as true & changesSaved as false
	// Puts the new deployment in updatedPod
	onChangeHandler(event) {
		console.log("CHANGE");
		this.setState({
			...this.state,
			changesMade: true,
			changesSaved: false,
			updatedPod: event
		});
	}

	// Sets changesSaved as true
	// Updates deployment to updatedPod
	saveChanges() {
		console.log("SAVE");
		this.setState({
			...this.state,
			changesSaved: true,
			deployment: this.state.updatedPod
		});
	}

	// Makes a service call to patch the deployment.
	patchChanges() {
		if (this._isMounted)
			this.setState({
				...this.state,
				pageLoading: true,
				errorSet: false,
				successSet: false
			});

		// patchPod(
		// 	this.props.namespace,
		// 	this.props.resourceName,
		// 	this.state.deployment
		// )
		// 	.then(result => {
		// 		if (this._isMounted)
		// 			this.setState({
		// 				...this.state,
		// 				pageLoading: false,
		// 				informationPane: result,
		// 				successSet: true
		// 			});
		// 	})
		// 	.catch(error => {
		// 		if (this._isMounted) {
		// 			this.setState({
		// 				...this.state,
		// 				pageLoading: false,
		// 				informationPane: error,
		// 				errorSet: true
		// 			});
		// 		}
		// 	});
	}

	printError(error) {
		return (
			<div className="error">
				<span className="fa fa-times red-cross" />
				&nbsp;
				{error.rawError.status} Code: {error.rawError.code} (API
				Version: {error.rawError.apiVersion})
				<br />
				<br />
				Message:
				<br />
				{error.rawError.message}
				<br />
				<br />
				{error.rawError.details &&
					error.rawError.details.causes.map((cause, index) => {
						return (
							<React.Fragment key={index + "_CAUSE_FRAG"}>
								Field:&nbsp;
								{cause.field}
								<br />
								Message:&nbsp;
								{cause.message}
								<br />
								Reason:&nbsp;
								{cause.reason}
								<br />
								<br />
							</React.Fragment>
						);
					})}
			</div>
		);
	}

	printSuccess(success) {
		return (
			<div className="success">
				<span className="fa fa-check green-check" />
				&nbsp; Pod edited successfully.
			</div>
		);
	}

	render() {
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

					<div className="information-pane">
						{this.state.errorSet &&
							this.printError(this.state.informationPane)}

						{this.state.successSet &&
							this.printSuccess(this.state.informationPane)}
					</div>

					{this.state.deploymentSet && (
						<JSONEditorX
							json={this.state.updatedPod}
							onChangeJSON={event => this.onChangeHandler(event)}
						/>
					)}
				</div>
			</React.Fragment>
		);
	}
}

export default PodEditPage;
