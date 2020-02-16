import React, { Component } from "react";
import { CardLabels, CardContainerList } from "../common";

class DeploymentCard extends Component {
	// Returns an obj which contains key-val pairs of matched labels.
	matchedLabels(selectorLabels, templateLabels) {
		let finalResult = {};

		if (!selectorLabels || !templateLabels) return finalResult;

		Object.entries(selectorLabels).forEach(([key, val], index) => {
			if (
				templateLabels.hasOwnProperty(key) &&
				templateLabels[key] === val
			)
				finalResult[key] = val;

			return;
		});

		return finalResult;
	}

	render() {
		return (
			<React.Fragment>
				<div className="card flex flex-column">
					<span className="w-100">
						<span className="title">
							<span className="fa fa-lastfm" />
							&emsp;
							{this.props.deploymentInfo.deploymentName}
						</span>
						<span className="resource-manage-section">
							<span className="resource-delete-button fa fa-trash" />
							<span className="resource-restart-button fa fa-refresh" />
							<span className="resource-terminal-button fa fa-terminal" />
						</span>
					</span>

					<span className="flex flex-row">
						<span className="mt-5">Selectors:</span>
						<span className="flex flex-row mw-100 wrap">
							<CardLabels
								labels={
									this.props.deploymentInfo
										.deploymentSelectors
								}
								refreshState={() => this.props.refreshState()}
								matchedLabels={this.matchedLabels(
									this.props.deploymentInfo
										.deploymentSelectors,
									this.props.deploymentInfo
										.deploymentTemplateLabels
								)}
							/>
						</span>
					</span>
					<br />

					<span className="flex flex-row">
						<span>
							<span className="font-weight-bolder huge-number">
								{this.props.deploymentInfo.deploymentReplicas +
									"x"}
							</span>
							<br />
							<span>
								{(this.props.deploymentInfo
									.deploymentReplicas === 1 &&
									"Replica") ||
									"Replicas"}
							</span>
						</span>

						<span className="flex flex-column left-orange-border">
							<span className="flex flex-row">
								<span className="flex flex-row mw-100 wrap">
									<CardLabels
										labels={
											this.props.deploymentInfo
												.deploymentTemplateLabels
										}
										refreshState={() =>
											this.props.refreshState()
										}
										matchedLabels={this.matchedLabels(
											this.props.deploymentInfo
												.deploymentSelectors,
											this.props.deploymentInfo
												.deploymentTemplateLabels
										)}
									/>
								</span>
							</span>
							<span>
								<CardContainerList
									list={
										this.props.deploymentInfo
											.deploymentTemplateContainers
									}
									refreshState={() =>
										this.props.refreshState()
									}
								/>
							</span>
						</span>
					</span>

					<br />

					<span className="flex flex-row">
						<span className="mt-5">Labels:</span>
						<span className="flex flex-row mw-100 wrap">
							<CardLabels
								labels={
									this.props.deploymentInfo.deploymentLabels
								}
								refreshState={() => this.props.refreshState()}
							/>
						</span>
					</span>

					<span className="flex flex-row">
						<span className="mt-5">Annotations:</span>
						<span className="flex flex-row mw-100 wrap">
							<CardLabels
								labels={
									this.props.deploymentInfo
										.deploymentAnnotations
								}
								refreshState={() => this.props.refreshState()}
							/>
						</span>
					</span>
				</div>
			</React.Fragment>
		);
	}
}

export default DeploymentCard;
