import React, { Component } from "react";
import { getPodExposure, deletePod } from "../../services";
import { CardLabels, CardContainerList } from "../common";
import { BounceLoader } from "react-spinners";
import ReactTooltip from "react-tooltip";
import { withSnackbar } from "notistack";

/* 
	Compulsory props:
		1. podInfo (object)
			- Information about the pod to be displayed.
		2. refreshState (method) [NON-TESTABLE]
			- Used to refresh parent's state.
		3. namespace (string)
		4. deletePod(namespace, podName) (method)
			- Deletes the pod with given podName.

	Optional props:
		1. showResourceType (boolean)
			- If set, displays a resource type tag in the card header.
			- Used by SearchPage.
*/
class PodCard extends Component {
	state = { exposures: [] };
	_isMounted = false;

	componentDidMount() {
		this._isMounted = true;

		// Makes a service call to get exposure.
		getPodExposure(this.props.namespace, this.props.podInfo.podName)
			.then(result => {
				if (this._isMounted)
					this.setState({
						...this.state,
						exposures: result.payLoad
					});
			})
			.catch(error => {
				if (this._isMounted)
					this.setState({ ...this.state, exposures: [] });
			});
	}

	componentWillUnmount() {
		this._isMounted = false;
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
				<ReactTooltip
					id="notRunningPodTooltip"
					effect="solid"
					border={true}
				/>
				<React.Fragment>
					<div className="card flex flex-column">
						{/* {this.props.podInfo.podStatus
						"Running" && (
							<div className="lines" >
						)} */}
						{/* Card Header */}
						<React.Fragment>
							<span className="flex flex-row space-between w-100 ">
								{/* Card Title + Live Status */}
								<span className="flex flex-row title mw-80 flex-start">
									<span className="fa fa-lastfm" />
									&emsp;
									{(this.props.podInfo.podStatus !==
										"Running" && (
										<div
											data-tip="Not running"
											data-for="notRunningPodTooltip"
										>
											<span className="not-running">
												{this.props.podInfo.podName}
											</span>
											<span className="fa fa-exclamation-triangle fa-xs" />
										</div>
									)) || (
										<span>
											{this.props.podInfo.podName}
										</span>
									)}
									{this.state.exposures &&
										this.state.exposures.length !== 0 && (
											<span className="live-icon">
												<a
													href="#deletePod"
													data-tip
													data-for={
														"reacttip" +
														this.props.index
													}
												>
													<BounceLoader
														id="live"
														size={"0.50em"}
														color={"red"}
													/>
												</a>

												<ReactTooltip
													id={
														"reacttip" +
														this.props.index
													}
													type="dark"
													place="bottom"
													effect="float"
												>
													<span>
														{this.state.exposures &&
															this.state.exposures.map(
																(
																	object,
																	index
																) => {
																	return (
																		<React.Fragment
																			key={
																				index +
																				"_FRAG"
																			}
																		>
																			<span className="tooltip-highlight">
																				Exposed
																				as:
																			</span>
																			<br />
																			{
																				object.serviceName
																			}
																			{
																				":"
																			}
																			&nbsp;
																			{
																				object.port
																			}{" "}
																			&nbsp;
																			<span className="fa fa-arrow-circle-right" />
																			&nbsp;{" "}
																			{
																				object.targetPort
																			}{" "}
																			over{" "}
																			<span className="tooltip-highlight">
																				{
																					object.serviceType
																				}
																			</span>
																			<hr />{" "}
																		</React.Fragment>
																	);
																}
															)}
													</span>
												</ReactTooltip>
											</span>
										)}
									{this.props.showResourceType && (
										<sup className="resource-type">Pod</sup>
									)}
								</span>

								{/* Card Resource Manip Button */}
								<span className="resource-manage-section">
									<span className="fa fa-bars floaty-button" />
									<span className="buttons">
										{this.props.podInfo.podStatus ===
											"Running" && (
											<span
												data-tip="Delete resource"
												data-for="deleteResourceTooltip"
												className="resource-delete-button fa fa-trash"
												onClick={() =>
													deletePod(
														this.props.namespace,
														this.props.podInfo
															.podName
													)
														.then(() =>
															this.props.enqueueSnackbar(
																"Pod '" +
																	this.props
																		.podInfo
																		.podName +
																	"' is scheduled to be deleted. Refresh the page to check if deletion has completed.",
																{
																	variant:
																		"success"
																}
															)
														)
														.catch(error =>
															this.props.enqueueSnackbar(
																"Something went wrong while deleting pod '" +
																	this.props
																		.podInfo
																		.podName +
																	"'.",
																{
																	variant:
																		"error"
																}
															)
														)
												}
											/>
										)}

										<span
											data-tip="Edit resource"
											data-for="editResourceTooltip"
											className="resource-edit-button fa fa-pencil"
											onClick={() =>
												this.props.renderEditPage(
													"POD",
													this.props.podInfo.podName
												)
											}
										/>
									</span>
								</span>
							</span>
						</React.Fragment>

						{/* Card Body */}
						<React.Fragment>
							{/* List of Containers */}
							<span className="left-orange-border">
								<CardContainerList
									list={this.props.podInfo.podContainers}
									refreshState={() =>
										this.props.refreshState()
									}
								/>
							</span>
							<br />

							{/* Labels */}
							<span className="flex flex-row">
								<span className="mt-5">Labels:</span>
								<span className="flex flex-row mw-100 wrap labels">
									<CardLabels
										labels={this.props.podInfo.podLabels}
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
											this.props.podInfo.podAnnotations
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
			</React.Fragment>
		);
	}
}

export default withSnackbar(PodCard);
