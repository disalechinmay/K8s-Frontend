import React, { Component } from "react";
import { Card, Button, Glyphicon } from "react-bootstrap";
import CardLabels from "../common/CardLabels";
import CardContainerList from "../common/CardContainerList";

class PodCard extends Component {
	state = {};

	deleteResource(resourceType, resourceName) {
		console.log(resourceType);
		console.log(resourceName);

		if (resourceType == "RESOURCE_POD") {
			fetch("http://localhost:5000/deletePod", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ resourceName })
			});
		}
	}

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
						<span className="float-right">
							<Button
								variant="outline-danger"
								onClick={() =>
									this.deleteResource(
										"RESOURCE_POD",
										this.props.podInfo.podName
									)
								}
							>
								<span className="fa fa-trash"></span>
							</Button>
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
