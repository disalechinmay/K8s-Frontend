import React, { Component } from "react";
import { CardLabels, CardContainerList } from "../common";
import ReactTooltip from "react-tooltip";

/* 
	Compulsory props:
		1. deploymentInfo (object)
			- Information about the deployment to be displayed.
		2. refreshState (method) [NON-TESTABLE]
			- Used to refresh parent's state.
		3. namespace (string)
		4. renderEditPage (method)

	Optional props:
		1. showResourceType (boolean)
			- If set, displays a resource type tag in the card header.
			- Used by SearchPage.
*/
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
				<ReactTooltip
					id="deleteResourceTooltip"
					effect="solid"
					border={true}
				/>
				<ReactTooltip
					id="editResourceTooltip"
					effect="solid"
					border={true}
				/>

				<div className="card flex flex-column">
					{/* Card Header */}
					<React.Fragment>
						<span className="flex flex-row space-between w-100 ">
							{/* Card Title + Live Status */}
							<span className="flex flex-row title mw-80 flex-start">
								<span className="fa fa-lastfm" />
								&emsp;
								{this.props.deploymentInfo.deploymentName}
								{this.props.showResourceType && (
									<sup className="resource-type">
										Deployment
									</sup>
								)}
							</span>

							{/* Card Resource Manip Button */}
							<span className="resource-manage-section">
								<span className="fa fa-bars floaty-button" />
								<span className="buttons">
									<span
										data-tip="Delete resource"
										data-for="deleteResourceTooltip"
										className="resource-delete-button fa fa-trash"
									/>
									<span
										data-tip="Edit resource"
										data-for="editResourceTooltip"
										className="resource-edit-button fa fa-pencil"
										onClick={() =>
											this.props.renderEditPage(
												"DEPLOYMENT",
												this.props.deploymentInfo
													.deploymentName
											)
										}
									/>
								</span>
							</span>
						</span>
					</React.Fragment>

					{/* Card Body */}
					<React.Fragment>
						{/* Selectors */}
						<span className="flex flex-row">
							<span className="mt-5">Selectors:</span>
							<span className="flex flex-row mw-100 wrap">
								<CardLabels
									labels={
										this.props.deploymentInfo
											.deploymentSelectors
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
						<br />

						{/* Replicas & Containers */}
						<span className="flex flex-row">
							<span>
								<span className="font-weight-bolder huge-number">
									{this.props.deploymentInfo
										.deploymentReplicas + "x"}
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

						{/* Labels */}
						<span className="flex flex-row">
							<span className="mt-5">Labels:</span>
							<span className="flex flex-row mw-100 wrap labels">
								<CardLabels
									labels={
										this.props.deploymentInfo
											.deploymentLabels
									}
									refreshState={() =>
										this.props.refreshState()
									}
								/>
							</span>
						</span>

						{/* Annotations */}
						<span className="flex flex-row">
							<span className="mt-5">Annotations:</span>
							<span className="flex flex-row mw-100 wrap labels">
								<CardLabels
									labels={
										this.props.deploymentInfo
											.deploymentAnnotations
									}
									refreshState={() =>
										this.props.refreshState()
									}
								/>
							</span>
						</span>
					</React.Fragment>
				</div>
			</React.Fragment>
		);
	}
}

export default DeploymentCard;
