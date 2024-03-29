import React, { Component } from "react";
import { SmallLoadingPage, SmallErrorPage } from "../common";
import { getPods, deletePod } from "../../services";
import PodCard from "./PodCard";

/* 
	Compulsory props:
		1. namespace

	Optional props:
		None
*/
class PodsPage extends Component {
	state = {
		pageLoading: true,
		podsListSet: false,
		podsList: [],
		errorSet: false,
		errorDescription: "",
		deletedPods: []
	};
	_isMounted = false;

	// Makes a service call and sets podsList.
	getNewData() {
		// Get list of pods for the selected namespace.
		getPods(this.props.namespace)
			.then(result => {
				let newState = { ...this.state };
				newState.pageLoading = false;
				newState.podsListSet = true;
				newState.podsList = [];

				// If pod is not in deletedPods, include.
				for (let podInfo of result.payLoad)
					if (newState.deletedPods.indexOf(podInfo.podName) <= -1)
						newState.podsList.push(podInfo);

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

	// Makes a service call to delete the pod.
	// Maintains a list of deletedPods, so that deleted pods wont show up in the list while they are being deleted.
	deletePodX(namespace, podName) {
		deletePod(namespace, podName);

		let newState = { ...this.state };
		newState.deletedPods.push(podName);

		if (this._isMounted) this.setState(newState);
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
			this.state.podsListSet &&
			this.state.podsList.length === 0
		)
			return (
				<React.Fragment>
					<div className="add-resource-section">
						<span className="message">
							<span className="logo fa fa-info" />
							Pods allow you to run containerized workloads.
						</span>
						<button
							className="add-resource-button"
							onClick={() => this.props.renderAddPage("POD")}
						>
							+ Create new pod
						</button>
					</div>

					<span className="not-found-card">
						<span className="fa fa-exclamation-triangle" />
						&emsp; No pods present in this namespace.
					</span>
				</React.Fragment>
			);

		return (
			<React.Fragment>
				<div className="add-resource-section">
					<span className="message">
						<span className="logo fa fa-info" />
						Pods allow you to run containerized workloads.
					</span>
					<button
						className="add-resource-button"
						onClick={() => this.props.renderAddPage("POD")}
					>
						+ Create new pod
					</button>
				</div>

				{/* Map podsList if it is set. */}
				{this.state.podsListSet &&
					this.state.podsList.map((podInfo, index) => {
						return (
							<React.Fragment key={index + "_FRAG"}>
								<PodCard
									key={index + "_POD_CARD"}
									index={index}
									podInfo={podInfo}
									namespace={this.props.namespace}
									refreshState={() =>
										this.props.refreshState()
									}
									deletePod={(namespace, podName) =>
										this.deletePodX(namespace, podName)
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

export default PodsPage;
