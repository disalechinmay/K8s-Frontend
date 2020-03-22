import React, { Component } from "react";
import { CardLabels, CardContainerList } from "../common";
import ReactTooltip from "react-tooltip";
import { deleteJob } from "../../services";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import { withSnackbar } from "notistack";
import moment from "moment";

class JobsCard extends Component {
	state = {};

	constructor(props) {
		super(props);

		let date = new Date(this.props.jobInfo.jobStartTime);
		var startDate = moment(date);
		this.timeStart = startDate.format("LTS");
		this.dateStart = startDate.format("MMMM Do YYYY");

		let date1 = new Date(this.props.jobInfo.jobCompletionTime);
		var endDate = moment(date1);
		this.timeEnd = endDate.format("LTS");
		this.dateEnd = endDate.format("MMMM Do YYYY");
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
								<span>{this.props.jobInfo.jobName}</span>
								{this.props.showResourceType && (
									<sup className="resource-type">Job</sup>
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
											deleteJob(
												this.props.namespace,
												this.props.jobInfo.jobName
											)
												.then(() =>
													this.props.enqueueSnackbar(
														"Job '" +
															this.props.jobInfo
																.jobName +
															"' is scheduled to be deleted. Refresh the page to check if deletion has completed.",
														{
															variant: "success"
														}
													)
												)
												.catch(error =>
													this.props.enqueueSnackbar(
														"Something went wrong while deleting job '" +
															this.props.jobInfo
																.jobName +
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
										data-for="editResourceTooltip"
										className="resource-edit-button fa fa-pencil"
										onClick={() =>
											this.props.renderEditPage(
												"JOB",
												this.props.jobInfo.jobName
											)
										}
									/>
								</span>
							</span>
						</span>
					</React.Fragment>
					<span className="hidden">
						{this.props.jobInfo.jobCurrentCompletions === null &&
							(this.props.jobInfo.jobCurrentCompletions = 0)}
					</span>

					{/* Card Body */}
					<div>
						{/* List of Containers */}
						<span className="flex flex-row left-orange-border">
							<CardContainerList
								list={this.props.jobInfo.jobContainers}
							/>
						</span>
						<br />

						<div className="flex flex-row space-around">
							<span>
								<span className="timestamp flex flex-column">
									<span className="time">
										{this.timeStart}
									</span>
									<span className="date">
										{this.dateStart}
									</span>
									START TIME
								</span>
								<br />
							</span>

							<ReactTooltip
								id="progressStatus"
								effect="solid"
								border={true}
							/>
							<span
								className="progress-bar"
								data-tip={
									this.props.jobInfo.jobCurrentCompletions +
									"/" +
									this.props.jobInfo.jobTargetCompletions +
									" completed"
								}
								data-for="progressStatus"
							>
								<Progress
									percent={
										(this.props.jobInfo
											.jobCurrentCompletions /
											this.props.jobInfo
												.jobTargetCompletions) *
										100
									}
									status="success"
								/>
							</span>
							<span>
								{(this.props.jobInfo.jobCompletionTime !==
									null && (
									<span className="timestamp flex flex-column">
										<span className="time">
											{this.timeEnd}
										</span>
										<span className="date">
											{this.dateEnd}
										</span>
										COMPLETION TIME
									</span>
								)) || (
									<span className="timestamp flex flex-column">
										<span className="time">-</span>
										COMPLETION TIME
									</span>
								)}
								<br />
							</span>
						</div>
						<br />
						{/* Labels */}
						<span className="flex flex-row">
							<span className="mt-5">Labels:</span>
							<span className="flex flex-row mw-100 wrap labels">
								<CardLabels
									labels={this.props.jobInfo.jobLabels}
								/>
							</span>
						</span>

						{/* Annotations */}
						<span className="flex flex-row">
							<span className="mt-5">Annotations:</span>
							<span className="flex flex-row mw-100 wrap labels">
								<CardLabels
									labels={this.props.jobInfo.jobAnnotations}
								/>
							</span>
						</span>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default withSnackbar(JobsCard);
