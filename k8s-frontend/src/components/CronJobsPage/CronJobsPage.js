import React, { Component } from "react";
import SmallLoadingPage from "../common/SmallLoadingPage";
import { getCronJobs } from "../../services";
import CronJobCard from "./CronJobCard";

class CronJobsPage extends Component {
	state = {
		pageLoading: true,
		jobsListSet: false,
		jobsList: [],
		errorSet: false,
		errorDescription: ""
	};
	_isMounted = false;

	componentDidMount() {
		this._isMounted = true;

		// Get list of pods for the selected namespace.
		getCronJobs(this.props.namespace)
			.then(result => {
				let newState = { ...this.state };

				newState.pageLoading = false;
				newState.jobsListSet = true;
				newState.jobsList = result.payLoad;

				if (this._isMounted) this.setState(newState);
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

	componentWillUnmount() {
		this._isMounted = false;
	}

	componentDidUpdate(previousProps) {
		// If namespace is changed, get new data.
		if (previousProps.namespace !== this.props.namespace) {
			if (this._isMounted)
				this.setState({
					...this.state,
					pageLoading: true,
					jobsListSet: false,
					jobsList: []
				});

			// Get list of pods for the selected namespace.
			getCronJobs(this.props.namespace)
				.then(result => {
					let newState = { ...this.state };

					newState.pageLoading = false;
					newState.jobsListSet = true;
					newState.jobsList = result.payLoad;

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
	}

	render() {
		if (this.state.pageLoading) return <SmallLoadingPage />;

		if (
			this.state.pageLoading === false &&
			this.state.jobsListSet &&
			this.state.jobsList.length === 0
		)
			return (
				<React.Fragment>
					<span className="not-found-card">
						<span className="fa fa-exclamation-triangle" />
						&emsp; No cron jobs present in this namespace.
					</span>
				</React.Fragment>
			);

		return (
			<React.Fragment>
				<div className="add-resource-section">
					<span className="message">
						<span className="logo fa fa-info" />
						Cron Jobs are used to run Jobs on a time-based schedule.
					</span>
					<button
						className="add-resource-button"
						onClick={() => this.props.renderAddPage("CRON_JOB")}
					>
						+ Create new cron job
					</button>
				</div>
				{this.state.jobsListSet &&
					this.state.jobsList.map((jobInfo, index) => {
						return (
							<React.Fragment key={index + "_FRAG"}>
								<CronJobCard
									key={index + "_CRON_JOB_CARD"}
									index={index}
									namespace={this.props.namespace}
									jobInfo={jobInfo}
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

export default CronJobsPage;
