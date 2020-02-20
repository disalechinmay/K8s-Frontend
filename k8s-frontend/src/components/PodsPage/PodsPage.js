import React, { Component } from "react";
import { SmallLoadingPage, SmallErrorPage } from "../common";
import { getPods } from "../../services";
import PodCard from "./PodCard";

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
	refreshDataInterval = null;

	getNewData() {
		// Get list of pods for the selected namespace.
		getPods(this.props.namespace)
			.then(result => {
				let newState = { ...this.state };

				newState.pageLoading = false;
				newState.podsListSet = true;
				newState.podsList = result.payLoad;

				let newPodsList = [];
				for (let pod of newState.podsList)
					if (!(pod.podName in newState.deletedPods))
						newPodsList.push();

				if (this._isMounted) this.setState(newState);
			})
			.catch(err => {
				this.setState({
					...this.state,
					errorSet: true,
					errorDescription: err
				});
			});
	}

	componentDidMount() {
		this._isMounted = true;

		this.getNewData();
		this.refreshDataInterval = setInterval(() => this.getNewData(), 3000);
	}

	componentWillUnmount() {
		this._isMounted = false;
		clearInterval(this.refreshDataInterval);
	}

	componentDidUpdate(previousProps) {
		// If namespace is changed, get new data.
		if (previousProps.namespace !== this.props.namespace) {
			this.setState({
				...this.state,
				pageLoading: true,
				podsListSet: false,
				podsList: []
			});

			getPods(this.props.namespace)
				.then(result => {
					let newState = { ...this.state };

					newState.pageLoading = false;
					newState.podsListSet = true;
					newState.podsList = result.payLoad;

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

	deleteCard(podName) {
		let newState = { ...this.state };

		let newPodsList = [];

		for (let pod of newState.podsList)
			if (pod.podName !== podName) newPodsList.push(pod);

		newState.deletedPods.push(podName);

		this.setState({ ...this.state, podsList: newPodsList });
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
			this.state.podsListSet &&
			this.state.podsList.length === 0
		)
			return (
				<React.Fragment>
					No pods present in this namespace.
				</React.Fragment>
			);

		return (
			<React.Fragment>
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
									deleteCard={podName =>
										this.deleteCard(podName)
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
