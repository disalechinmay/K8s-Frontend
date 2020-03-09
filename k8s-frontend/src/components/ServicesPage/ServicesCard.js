import React, { Component } from "react";
import { CardLabels } from "../common";

/* 
	Compulsory props:
		1. serviceInfo (object)
			- Information about the service to be displayed.
		2. refreshState (method) [NON-TESTABLE]
			- Used to refresh parent's state.
		3. namespace (string)

	Optional props:
		1. showResourceType (boolean)
			- If set, displays a resource type tag in the card header.
			- Used by SearchPage.
*/
class ServiceCard extends Component {
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
					{/* Card Header */}
					<React.Fragment>
						<span className="flex flex-row space-between w-100 ">
							{/* Card Title + Live Status */}
							<span className="flex flex-row title mw-80 flex-start">
								<span className="fa fa-lastfm" />
								&emsp;
								{this.props.serviceInfo.serviceName}
								{this.props.showResourceType && (
									<sup className="resource-type">Service</sup>
								)}
							</span>

							{/* Card Resource Manip Button */}
							<span className="resource-manage-section">
								<span className="resource-delete-button fa fa-trash" />
								<span className="resource-restart-button fa fa-refresh" />
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
										this.props.serviceInfo.serviceSelectors
									}
									refreshState={() =>
										this.props.refreshState()
									}
									matchedLabels={this.matchedLabels(
										this.props.serviceInfo.serviceSelectors,
										this.props.serviceInfo
											.serviceTemplateLabels
									)}
								/>
							</span>
						</span>
						<br />

						{/* Replicas & Containers */}
						<div className="flex flex-row">
							<span>
								<span className="font-weight-bolder big-number">
									{this.props.serviceInfo.serviceType}
								</span>
								<br />
								<span>Service Type</span>
							</span>

							<span className="flex flex-column left-orange-border">
								{this.props.serviceInfo.servicePort.map(
									(port, index) => {
										return (
											<div
												className="flex flex-row w-100 mt-5pr"
												key={index + "PORT FRAG"}
											>
												<span>
													<span className="ml-5pr font-weight-bolder big-number">
														{
															this.props
																.serviceInfo
																.servicePort[
																index
															]
														}
													</span>
													<br />
													<span>Service Port</span>
												</span>
												&emsp;
												<span className="fa fa-arrow-circle-right big-number" />
												&emsp;
												<span>
													<span className="font-weight-bolder big-number">
														{
															this.props
																.serviceInfo
																.serviceTargetPort[
																index
															]
														}
													</span>
													<br />
													<span>Target Port</span>
												</span>
												<br />
												<br />
											</div>
										);
									}
								)}
							</span>
						</div>

						<br />
						{/* Labels */}
						<span className="flex flex-row">
							<span className="mt-5">Labels:</span>
							<span className="flex flex-row mw-100 wrap labels">
								<CardLabels
									labels={
										this.props.serviceInfo.serviceLabels
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
										this.props.serviceInfo
											.serviceAnnotations
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

export default ServiceCard;
