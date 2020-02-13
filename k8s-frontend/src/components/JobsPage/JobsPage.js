import React, { Component } from "react";
import SmallLoadingPage from "../common/SmallLoadingPage";
import { getJobs } from "../../services/jobs";
import "../../assets/styles/common.css";
import JobsCard from "./JobsCard";

class JobsPage extends Component {
	state = { pageLoading: true, jobsListSet: false, jobsList: [] };
	constructor(props) {
		super(props);

		getJobs(this.props.namespace).then(result => {
			let newState = { ...this.state };

			newState.pageLoading = false;
			newState.jobsListSet = true;
			newState.jobsList = result.payLoad;

			this.setState(newState);
		});
	}

	componentDidUpdate(previousProps) {
		// If namespace is changed, get new data.
		if (previousProps.namespace !== this.props.namespace) {
			this.setState({
				pageLoading: true,
				jobsListSet: false,
				jobsList: []
			});

			getJobs(this.props.namespace).then(result => {
				let newState = { ...this.state };

				newState.pageLoading = false;
				newState.jobsListSet = true;
				newState.jobsList = result.payLoad;

				this.setState(newState);
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
					No jobs present in this namespace.
				</React.Fragment>
			);

		return (
			<React.Fragment>
				{this.state.jobsListSet &&
					this.state.jobsList.map((jobInfo, index) => {
						return (
							<React.Fragment key={index + "_FRAG"}>
								<JobsCard
									key={index + "_JOBS_CARD"}
									index={index}
									jobInfo={jobInfo}
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

export default JobsPage;
