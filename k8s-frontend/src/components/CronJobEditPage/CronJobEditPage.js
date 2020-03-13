import React, { Component } from "react";
import { getCronJob, patchCronJob } from "../../services";
import { SmallLoadingPage } from "../common";
import { JSONEditorX } from "../common";
import ReactTooltip from "react-tooltip";
/* 
	Compulsory props:
		1. namespace
		2. resourceName

	Optional props:
		None
*/
class CronJobEditPage extends Component {
	state = {
		cronJob: null,
		cronJobSet: false,
		pageLoading: true,
		changesMade: false,
		informationPane: "",
		errorSet: false,
		successSet: false
	};
	_isMounted = false;

	// Makes a service call and sets cronJob.
	getNewData() {
		// Get list of cronJobs for the selected namespace.
		getCronJob(this.props.namespace, this.props.resourceName)
			.then(result => {
				if (this._isMounted)
					this.setState({
						...this.state,
						pageLoading: false,
						cronJobSet: true,
						cronJob: result.payLoad
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
	// Puts the new cronJob in updatedcronJob
	onChangeHandler(event) {
		console.log("CHANGE");
		this.setState({
			...this.state,
			changesMade: true,
			changesSaved: false,
			cronJob: event
		});
	}

	// Makes a service call to patch the cronJob.
	patchChanges() {
		if (this._isMounted)
			this.setState({
				...this.state,
				pageLoading: true,
				errorSet: false,
				successSet: false
			});

		patchCronJob(
			this.props.namespace,
			this.props.resourceName,
			this.state.cronJob
		)
			.then(result => {
				if (this._isMounted)
					this.setState({
						...this.state,
						pageLoading: false,
						informationPane: result,
						successSet: true
					});
			})
			.catch(error => {
				if (this._isMounted) {
					this.setState({
						...this.state,
						pageLoading: false,
						informationPane: error,
						errorSet: true
					});
				}
			});
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
				&nbsp; cronJob edited successfully.
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

						<span className="json-title">
							<span className="fa fa-lastfm"></span>
							Editing:&nbsp;
							{this.props.resourceName}
						</span>

						{/* Save Changes Buttons */}
						<span className="save-changes-buttons">
							{this.state.changesMade === false && (
								<React.Fragment>
									<ReactTooltip
										id="patchResourceDisabledTooltip"
										effect="solid"
										border={true}
										place="bottom"
									/>
									<span
										data-tip="Patches the existing resource. Can only modify data section."
										data-for="patchResourceDisabledTooltip"
										className="patch-button-disabled"
									>
										<span className="fa fa-level-up" />
										&nbsp; Patch
									</span>
								</React.Fragment>
							)}

							{this.state.changesMade === true && (
								<React.Fragment>
									<ReactTooltip
										id="patchResourceTooltip"
										effect="solid"
										border={true}
										place="bottom"
									/>
									<span
										data-tip="Patches the existing resource. Can only modify data section."
										data-for="patchResourceTooltip"
										className="patch-button"
										onClick={() => this.patchChanges()}
									>
										<span className="fa fa-level-up" />
										&nbsp; Patch
									</span>
								</React.Fragment>
							)}
						</span>
					</span>

					<div className="information-pane">
						{this.state.errorSet &&
							this.printError(this.state.informationPane)}

						{this.state.successSet &&
							this.printSuccess(this.state.informationPane)}
					</div>

					{this.state.cronJobSet && (
						<JSONEditorX
							json={this.state.cronJob}
							onChangeJSON={event => this.onChangeHandler(event)}
						/>
					)}
				</div>
			</React.Fragment>
		);
	}
}

export default CronJobEditPage;
