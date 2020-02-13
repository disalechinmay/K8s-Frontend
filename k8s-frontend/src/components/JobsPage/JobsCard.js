import React, { Component } from "react";
import { Card, Badge } from "react-bootstrap";
import CardLabels from "../common/CardLabels";

class JobsCard extends Component {
	state = {};

	render() {
		return (
			<React.Fragment>
				<Card className=" shadow-lg p-0 mb-4 rounded">
					<Card.Header>
						<span className="text-muted">
							Job #{this.props.index + 1}:
						</span>{" "}
						<span className="font-weight-bold">
							{this.props.jobInfo.jobName}
						</span>
					</Card.Header>

					<Card.Body>
						Status:&nbsp;
						<Badge variant="success" className="text-wrap">
							{this.props.jobInfo.jobStatus}
						</Badge>
						<hr />
						Template:&nbsp;
						<Badge variant="dark" className="text-wrap">
							{this.props.jobInfo.jobTemplate}
						</Badge>
						<hr />
						Labels:&nbsp;
						<CardLabels
							labels={this.props.jobInfo.jobLabels}
							refreshState={() => this.props.refreshState()}
						/>
						<hr />
						Annotations:&nbsp;
						<CardLabels
							labels={this.props.jobInfo.jobAnnotations}
							refreshState={() => this.props.refreshState()}
						/>
					</Card.Body>
				</Card>
			</React.Fragment>
		);
	}
}

export default JobsCard;
