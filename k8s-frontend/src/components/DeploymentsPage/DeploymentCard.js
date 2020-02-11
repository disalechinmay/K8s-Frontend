import React, { Component } from "react";
import { Card, Row, Col } from "react-bootstrap";
import CardLabels from "../common/CardLabels";
import CardContainerList from "../common/CardContainerList";
import "../../assets/styles/common.css";

class DeploymentCard extends Component {
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
				<Card
					key={this.props.index + "_CARD"}
					className=" shadow-lg p-0 mb-4 rounded"
				>
					<Card.Header>
						<span className="text-muted">
							Deployment #{this.props.index + 1}:
						</span>{" "}
						<span className="font-weight-bold dancing-font">
							{this.props.deploymentInfo.deploymentName}
						</span>
					</Card.Header>

					<Card.Body>
						Selectors:&nbsp;
						<CardLabels
							labels={
								this.props.deploymentInfo.deploymentSelectors
							}
							refreshState={() => this.props.refreshState()}
							matchedLabels={this.matchedLabels(
								this.props.deploymentInfo.deploymentSelectors,
								this.props.deploymentInfo
									.deploymentTemplateLabels
							)}
						/>
						<hr />
						<Row>
							<Col className="right-border bottom-border p-2 d-flex align-items-center text-center justify-content-center">
								<span>
									<span className="font-weight-bolder replica-no">
										{this.props.deploymentInfo
											.deploymentReplicas + "x"}
									</span>
									<br />
									<span className="text-muted">
										{(this.props.deploymentInfo
											.deploymentReplicas === 1 &&
											"Replica") ||
											"Replicas"}
									</span>
								</span>
							</Col>
							<Col xs={10}>
								Template:
								<br />
								<CardLabels
									labels={
										this.props.deploymentInfo
											.deploymentTemplateLabels
									}
									refreshState={() =>
										this.props.refreshState()
									}
									matchedLabels={this.matchedLabels(
										this.props.deploymentInfo
											.deploymentSelectors,
										this.props.deploymentInfo
											.deploymentTemplateLabels
									)}
								/>
								<CardContainerList
									list={
										this.props.deploymentInfo
											.deploymentTemplateContainers
									}
									refreshState={() =>
										this.props.refreshState()
									}
								/>
							</Col>
						</Row>
						<hr />
						Labels:&nbsp;
						<CardLabels
							labels={this.props.deploymentInfo.deploymentLabels}
							refreshState={() => this.props.refreshState()}
						/>
						<hr />
						Annotations:&nbsp;
						<CardLabels
							labels={
								this.props.deploymentInfo.deploymentAnnotations
							}
							refreshState={() => this.props.refreshState()}
						/>
					</Card.Body>
				</Card>
			</React.Fragment>
		);
	}
}

export default DeploymentCard;
