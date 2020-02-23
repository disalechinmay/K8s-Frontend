import React, { Component } from "react";
import { getNodes, getPods, getDeployments, getServices } from "../../services";
import { NodeCard } from "../NodesPage";
import { PodCard } from "../PodsPage";
import { DeploymentCard } from "../DeploymentsPage";
import { ServiceCard } from "../ServicesPage";
import stringSimilarity from "string-similarity";

/* 
	Compulsory props:
		1. searchTokens (list)

	Optional props:
		None
*/
class SearchPage extends Component {
	state = { cards: [] };
	CONFIDENCE_THRESHOLD = 0.1;
	CONFIDENCE_THRESHOLD_NAME = 0.1;

	componentDidUpdate(previousProps) {
		if (previousProps !== this.props) {
			if (this._isMounted) this.setState({ ...this.state, cards: [] });
			for (let token of this.props.searchTokens) this.search(token);
		}
	}

	componentDidMount() {
		this._isMounted = true;
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	// This method is called for each token in searchTokens.
	async search(token) {
		if (this._isMounted) this.setState({ ...this.state, cards: [] });

		await this.checkNodes(token);
		await this.checkPods(token);
		await this.checkDeployments(token);
		await this.checkServices(token);
	}

	// Searches for a matching node, and adds to cards.
	async checkNodes(token) {
		let nodes = await getNodes();
		nodes = nodes.payLoad;

		for (let node of nodes) {
			//Checking if node name is similar
			let confidence = stringSimilarity.compareTwoStrings(
				token,
				node.nodeName
			);
			if (confidence > this.CONFIDENCE_THRESHOLD_NAME) {
				if (this._isMounted) {
					let newState = { ...this.state };
					newState.cards.push(
						<NodeCard nodeInfo={node} showResourceType={true} />
					);
					this.setState(newState);
				}
			}
		}
	}

	// Searches for a matching pod, and adds to cards.
	async checkPods(token) {
		let pods = await getPods(this.props.namespace);
		pods = pods.payLoad;

		for (let pod of pods) {
			//Checking if pod name is similar
			let confidence = stringSimilarity.compareTwoStrings(
				token,
				pod.podName
			);
			if (confidence > this.CONFIDENCE_THRESHOLD_NAME) {
				if (this._isMounted) {
					let newState = { ...this.state };
					newState.cards.push(
						<PodCard podInfo={pod} showResourceType={true} />
					);
					this.setState(newState);
				}
				continue;
			}

			if (pod.podLabels !== null) {
				for (let [key, val] of Object.entries(pod.podLabels)) {
					let newToken = toString(key) + ":" + toString(val);

					let confidence = stringSimilarity.compareTwoStrings(
						token,
						newToken
					);
					if (confidence > this.CONFIDENCE_THRESHOLD) {
						if (this._isMounted) {
							let newState = { ...this.state };
							newState.cards.push(
								<PodCard
									podInfo={pod}
									showResourceType={true}
								/>
							);
							this.setState(newState);
						}
						continue;
					}
				}
			}

			if (pod.podAnnotations !== null) {
				for (let [key, val] of Object.entries(pod.podAnnotations)) {
					let newToken = toString(key) + ":" + toString(val);

					let confidence = stringSimilarity.compareTwoStrings(
						token,
						newToken
					);
					if (confidence > this.CONFIDENCE_THRESHOLD) {
						if (this._isMounted) {
							let newState = { ...this.state };
							newState.cards.push(
								<PodCard
									podInfo={pod}
									showResourceType={true}
								/>
							);
							this.setState(newState);
						}
						continue;
					}
				}
			}
		}
	}

	// Searches for a matching deployment, and adds to cards.
	async checkDeployments(token) {
		let deployments = await getDeployments(this.props.namespace);
		deployments = deployments.payLoad;
		for (let deployment of deployments) {
			//Checking if pod name is similar
			let confidence = stringSimilarity.compareTwoStrings(
				token,
				deployment.deploymentName
			);
			if (confidence > this.CONFIDENCE_THRESHOLD_NAME) {
				if (this._isMounted) {
					let newState = { ...this.state };
					newState.cards.push(
						<DeploymentCard
							deploymentInfo={deployment}
							showResourceType={true}
						/>
					);
					this.setState(newState);
				}
				continue;
			}

			if (deployment.deploymentLabels !== null) {
				for (let [key, val] of Object.entries(
					deployment.deploymentLabels
				)) {
					let newToken = toString(key) + ":" + toString(val);

					let confidence = stringSimilarity.compareTwoStrings(
						token,
						newToken
					);
					if (confidence > this.CONFIDENCE_THRESHOLD) {
						if (this._isMounted) {
							let newState = { ...this.state };
							newState.cards.push(
								<DeploymentCard
									deploymentInfo={deployment}
									showResourceType={true}
								/>
							);
							this.setState(newState);
						}
						continue;
					}
				}
			}

			if (deployment.deploymentAnnotations !== null) {
				for (let [key, val] of Object.entries(
					deployment.deploymentAnnotations
				)) {
					let newToken = toString(key) + ":" + toString(val);

					let confidence = stringSimilarity.compareTwoStrings(
						token,
						newToken
					);
					if (confidence > this.CONFIDENCE_THRESHOLD) {
						if (this._isMounted) {
							let newState = { ...this.state };
							newState.cards.push(
								<DeploymentCard
									deploymentInfo={deployment}
									showResourceType={true}
								/>
							);
							this.setState(newState);
						}
						continue;
					}
				}
			}
		}
	}

	// Searches for a matching service, and adds to cards.
	async checkServices(token) {
		let services = await getServices(this.props.namespace);
		services = services.payLoad;
		for (let service of services) {
			//Checking if service name is similar
			let confidence = stringSimilarity.compareTwoStrings(
				token,
				service.serviceName
			);
			if (confidence > this.CONFIDENCE_THRESHOLD_NAME) {
				if (this._isMounted) {
					let newState = { ...this.state };
					newState.cards.push(
						<ServiceCard
							serviceInfo={service}
							showResourceType={true}
						/>
					);
					this.setState(newState);
				}
				continue;
			}

			if (service.serviceLabels !== null) {
				for (let [key, val] of Object.entries(service.serviceLabels)) {
					let newToken = toString(key) + ":" + toString(val);

					let confidence = stringSimilarity.compareTwoStrings(
						token,
						newToken
					);
					if (confidence > this.CONFIDENCE_THRESHOLD) {
						if (this._isMounted) {
							let newState = { ...this.state };
							newState.cards.push(
								<ServiceCard
									serviceInfo={service}
									showResourceType={true}
								/>
							);
							this.setState(newState);
						}
						continue;
					}
				}
			}

			if (service.serviceAnnotations !== null) {
				for (let [key, val] of Object.entries(
					service.serviceAnnotations
				)) {
					let newToken = toString(key) + ":" + toString(val);

					let confidence = stringSimilarity.compareTwoStrings(
						token,
						newToken
					);
					if (confidence > this.CONFIDENCE_THRESHOLD) {
						if (this._isMounted) {
							let newState = { ...this.state };
							newState.cards.push(
								<ServiceCard
									serviceInfo={service}
									showResourceType={true}
								/>
							);
							this.setState(newState);
						}
						continue;
					}
				}
			}
		}
	}

	render() {
		return (
			<React.Fragment>
				{this.state.cards.length === 0 && (
					<span className="not-found">No results Found</span>
				)}
				{this.state.cards.length !== 0 &&
					this.state.cards.map((card, index) => {
						return (
							<React.Fragment key={index + "cardInfo"}>
								{card}
							</React.Fragment>
						);
					})}
			</React.Fragment>
		);
	}
}

export default SearchPage;
