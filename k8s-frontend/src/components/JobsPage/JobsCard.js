import React, { Component } from "react";
// import CardLabels from "../common/CardLabels";

class JobsCard extends Component {
	state = {};

	render() {
		return (
			<React.Fragment>
				<div className="card flex flex-column">
					<span className="w-100">
						<span className="title">
							<span className="fa fa-lastfm" />
							&emsp;
							{this.props.jobInfo.jobName}
							{this.props.showResourceType && (
								<sup className="resource-type">Job</sup>
							)}
						</span>

						<span className="resource-manage-section">
							<span className="resource-delete-button fa fa-trash" />
							<span className="resource-restart-button fa fa-refresh" />
							<span className="resource-terminal-button fa fa-terminal" />
						</span>
					</span>
				</div>
			</React.Fragment>
		);

		// return (
		// 	<React.Fragment>
		// 		<Card className=" shadow-lg p-0 mb-4 rounded">
		// 			<Card.Header>
		// 				<span className="text-muted">
		// 					Job #{this.props.index + 1}:
		// 				</span>{" "}
		// 				<span className="font-weight-bold">
		// 					{this.props.jobInfo.jobName}
		// 				</span>
		// 			</Card.Header>

		// 			<Card.Body>
		// 				Status:&nbsp;
		// 				<Badge variant="success" className="text-wrap">
		// 					{this.props.jobInfo.jobStatus}
		// 				</Badge>
		// 				<hr />
		// 				Template:&nbsp;
		// 				<Badge variant="dark" className="text-wrap">
		// 					{this.props.jobInfo.jobTemplate}
		// 				</Badge>
		// 				<hr />
		// 				Labels:&nbsp;
		// 				<CardLabels
		// 					labels={this.props.jobInfo.jobLabels}
		// 					refreshState={() => this.props.refreshState()}
		// 				/>
		// 				<hr />
		// 				Annotations:&nbsp;
		// 				<CardLabels
		// 					labels={this.props.jobInfo.jobAnnotations}
		// 					refreshState={() => this.props.refreshState()}
		// 				/>
		// 			</Card.Body>
		// 		</Card>
		// 	</React.Fragment>
		// );
	}
}

export default JobsCard;
