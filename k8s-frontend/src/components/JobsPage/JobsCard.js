import React, { Component } from "react";
import { CardLabels, CardContainerList } from "../common";
import ReactTooltip from "react-tooltip";
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
										data-tip="Edit resource"
										data-for="editResourceTooltip"
										className="resource-edit-button fa fa-pencil"
									/>
								</span>
							</span>
						</span>
					</React.Fragment>

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

							<span>
								<span className="timestamp flex flex-column">
									<span className="time">{this.timeEnd}</span>
									<span className="date">{this.dateEnd}</span>
									COMPLETION TIME
								</span>
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

export default JobsCard;
