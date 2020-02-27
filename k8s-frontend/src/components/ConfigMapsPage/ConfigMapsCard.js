import React, { Component } from "react";
import { CardLabels, CardContainerList } from "../common";

/* 
	Compulsory props:
		1. configmapsInfo (object)
			- Information about the configmaps to be displayed.
		2. refreshState (method) [NON-TESTABLE]
			- Used to refresh parent's state.
		3. namespace (string)
		4. renderEditPage (method)

	Optional props:
		1. showResourceType (boolean)
			- If set, displays a resource type tag in the card header.
			- Used by SearchPage.
*/
class ConfigMapCard extends Component {
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
								{this.props.configMapsInfo.configMapName}
								{this.props.showResourceType && (
									<sup className="resource-type">
										ConfigMap
									</sup>
								)}
							</span>

							{/* Card Resource Manip Button */}
							<span className="resource-manage-section">
								<span className="fa fa-bars floaty-button" />
								<span className="buttons">
									<span className="resource-delete-button fa fa-trash" />
									<span className="resource-restart-button fa fa-refresh" />
									<span
										className="resource-edit-button fa fa-pencil"
										onClick={() =>
											this.props.renderEditPage(
												"configMaps",
												this.props.configMapsInfo
													.configMapName
											)
										}
									/>
								</span>
							</span>
						</span>
					</React.Fragment>

					{/* Card Body */}
					<React.Fragment>
						{/* data */}

						<span className="flex flex-row">
							<span className="mt-5">Data</span>
							<span className="flex flex-row mw-100 wrap">
								{JSON.stringify(
									this.props.configMapsInfo.configMapData
								)}{" "}
							</span>
						</span>
						{/* Labels */}
						<span className="flex flex-row">
							<span className="mt-5">Labels:</span>
							<span className="flex flex-row mw-100 wrap">
								<CardLabels
									labels={
										this.props.configMapsInfo
											.configMapLabels
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
							<span className="flex flex-row mw-100 wrap">
								<CardLabels
									labels={
										this.props.configMapsInfo
											.configMapAnnotations
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

export default ConfigMapCard;
