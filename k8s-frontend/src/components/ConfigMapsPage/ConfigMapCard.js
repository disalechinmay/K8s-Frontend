import React, { Component } from "react";
import { CardLabels } from "../common";
import { deleteConfigMap } from "../../services";
import { withSnackbar } from "notistack";
import ReactTooltip from "react-tooltip";

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
								{this.props.configMapInfo.configMapName}
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
									<span
										data-tip="Delete resource"
										data-for="deleteResourceTooltip"
										className="resource-delete-button fa fa-trash"
										onClick={() =>
											deleteConfigMap(
												this.props.namespace,
												this.props.configMapInfo
													.configMapName
											)
												.then(() =>
													this.props.enqueueSnackbar(
														"ConfigMap '" +
															this.props
																.configMapInfo
																.configMapName +
															"' is scheduled to be deleted.Refresh the page to check if deletion has completed.",
														{
															variant: "success"
														}
													)
												)
												.catch(() =>
													this.props.enqueueSnackbar(
														"Something went wrong while deleting '" +
															this.props
																.configMapInfo
																.configMapName +
															"'.",
														{
															variant: "error"
														}
													)
												)
										}
									/>
									<span
										data-tip="Edit resource"
										data-for="deleteResourceTooltip"
										className="resource-edit-button fa fa-pencil"
										onClick={() =>
											this.props.renderEditPage(
												"CONFIG_MAP",
												this.props.configMapInfo
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
						{/* Data */}
						<div className="flex flex-column mw-100">
							{this.props.configMapInfo.configMapData &&
								Object.entries(
									this.props.configMapInfo.configMapData
								).map(([key, val], index) => {
									return (
										<div
											className="secret-data"
											key={index + "_FRAG"}
										>
											<span className="key">{key}</span>
											&emsp;
											<span className="value">{val}</span>
											<br />
										</div>
									);
								})}
						</div>
						<br />
						{/* Labels */}
						<span className="flex flex-row">
							<span className="mt-5">Labels:</span>
							<span className="flex flex-row mw-100 wrap labels">
								<CardLabels
									labels={
										this.props.configMapInfo.configMapLabels
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
										this.props.configMapInfo
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

export default withSnackbar(ConfigMapCard);
