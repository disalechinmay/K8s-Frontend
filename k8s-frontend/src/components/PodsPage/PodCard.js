import React, { Component } from "react";
import { Card } from "react-bootstrap";
import CardLabels from "../common/CardLabels";
import CardContainerList from "../common/CardContainerList";

class PodCard extends Component {
	state = {};

	render() {
		return (
			<React.Fragment>
				<Card className=" shadow-lg p-0 mb-4 rounded">
					<Card.Header>
						<span className="text-muted">
							Pod #{this.props.index + 1}:
						</span>{" "}
						<span className="font-weight-bold dancing-font">
							{this.props.podInfo.podName}
						</span>
					</Card.Header>

					<Card.Body>
						<CardContainerList
							list={this.props.podInfo.podContainers}
							refreshState={() => this.props.refreshState()}
						/>
						<br />
						Labels:&nbsp;
						<CardLabels
							labels={this.props.podInfo.podLabels}
							refreshState={() => this.props.refreshState()}
						/>
						<hr />
						Annotations:&nbsp;
						<CardLabels
							labels={this.props.podInfo.podAnnotations}
							refreshState={() => this.props.refreshState()}
						/>
					</Card.Body>
				</Card>
			</React.Fragment>
		);
	}
}

export default PodCard;
