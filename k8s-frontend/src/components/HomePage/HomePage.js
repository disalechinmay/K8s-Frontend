import React, { Component } from "react";
import { getPods, getDeployments, getJobs } from "../../services";
import ReactMinimalPieChart from "react-minimal-pie-chart";
import { SmallLoadingPage, SmallErrorPage } from "../common";

/* 
	Compulsory props:
		1. refreshState (method) [NON-TESTABLE]
			- Used to refresh parent's state.
		2. namespace

	Optional props:
		None
*/
class HomePage extends Component {
	state = {
		pageLoading: true,
		podsListSet: false,
		podsList: [],
		errorSet: false,
		errorDescription: ""
	};
	_isMounted = false;
	PIE_CHART_RADIUS = 25;

	// Makes a service call and sets podsList.
	getNewData() {
		// Get list of pods for the selected namespace.
		getPods(this.props.namespace)
			.then(result => {
				let newState = { ...this.state };
				newState.pageLoading = false;
				newState.podsListSet = true;
				newState.podsList = result.payLoad;

				let runningCounter = 0,
					nonRunningCounter = 0;
				for (let pod of newState.podsList) {
					if (pod.podStatus === "Running") runningCounter++;
					else nonRunningCounter++;
				}

				newState.podsPieChart = [
					{
						color: "#2ecc71",
						title: "Running Pods",
						value: runningCounter
					},
					{
						color: "#dd5135",
						title: "Non-Running Pods",
						value: nonRunningCounter
					}
				];

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

		getDeployments(this.props.namespace)
			.then(result => {
				let newState = { ...this.state };
				newState.pageLoading = false;
				newState.deploymentsListSet = true;
				newState.deploymentList = result.payLoad;

				let runningCounter = 0,
					nonRunningCounter = 0;
				for (let deployment of newState.deploymentList) {
					if (
						deployment.deploymentReadyReplicas !== null &&
						deployment.deploymentReadyReplicas ===
							deployment.deploymentReplicas
					)
						runningCounter++;
					else nonRunningCounter++;
				}

				newState.deploymentsPieChart = [
					{
						color: "#2ecc71",
						title: "Running Deployments",
						value: runningCounter
					},
					{
						color: "#dd5135",
						title: "Non-Running Deployments",
						value: nonRunningCounter
					}
				];

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

		getJobs(this.props.namespace)
			.then(result => {
				let newState = { ...this.state };
				newState.pageLoading = false;
				newState.jobsListSet = true;
				newState.jobList = result.payLoad;

				let runningCounter = 0,
					nonRunningCounter = 0;
				for (let job of newState.jobList) {
					if (
						job.jobCurrentCompletions !== null &&
						job.jobCurrentCompletions === job.jobTargetCompletions
					)
						runningCounter++;
					else nonRunningCounter++;
				}

				newState.jobsPieChart = [
					{
						color: "#2ecc71",
						title: "Running Jobs",
						value: runningCounter
					},
					{
						color: "#dd5135",
						title: "Non-Running Jobs",
						value: nonRunningCounter
					}
				];

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
			if (this._isMounted)
				this.setState({
					...this.state,
					pageLoading: true,
					podsListSet: false,
					podsList: []
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

		return (
			<React.Fragment>
				<div className="pie-chart-flex">
					<span className="pie-chart">
						<ReactMinimalPieChart
							radius={this.PIE_CHART_RADIUS}
							animate={true}
							animationDuration={500}
							animationEasing="ease-out"
							lineWidth={15}
							rounded
							label
							labelStyle={{
								fontFamily: "sans-serif",
								fontSize: "10px"
							}}
							data={this.state.podsPieChart}
						>
							<span className="pie-label">Pods</span>
						</ReactMinimalPieChart>
					</span>

					<span className="pie-chart">
						<ReactMinimalPieChart
							radius={this.PIE_CHART_RADIUS}
							animate={true}
							animationDuration={500}
							animationEasing="ease-out"
							lineWidth={15}
							rounded
							label
							labelStyle={{
								fontFamily: "sans-serif",
								fontSize: "10px"
							}}
							data={this.state.deploymentsPieChart}
						/>

						<span className="pie-label">Deployments</span>
					</span>

					<span className="pie-chart">
						<ReactMinimalPieChart
							radius={this.PIE_CHART_RADIUS}
							animate={true}
							animationDuration={500}
							animationEasing="ease-out"
							lineWidth={15}
							rounded
							label
							labelStyle={{
								fontFamily: "sans-serif",
								fontSize: "10px"
							}}
							data={this.state.jobsPieChart}
						/>

						<span className="pie-label">Jobs</span>
					</span>
				</div>
			</React.Fragment>
		);
	}
}

export default HomePage;
