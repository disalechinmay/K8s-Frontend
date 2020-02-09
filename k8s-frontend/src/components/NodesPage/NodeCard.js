import React, { Component } from "react";
import { Card, ListGroup } from "react-bootstrap";
import CardLabels from "../CardLabels";

class NodeCard extends Component {
	render() {
		return (
			<React.Fragment>
				<Card
					key={this.props.index + "_CARD"}
					className="shadow-lg p-0 mb-4 rounded"
				>
					<Card.Header>
						<span className="text-muted">
							Node #{this.props.index + 1}:
						</span>{" "}
						<span className="font-weight-bold dancing-font">
							{this.props.nodeInfo.nodeName}
						</span>
					</Card.Header>

					<Card.Body>
						<div className="d-flex text-center justify-content-around align-items-center">
							<span className="col-xs-12">
								<span className="text-lg font-weight-bold node-spec-no">
									{this.props.nodeInfo.nodeCapacity.cpu}
								</span>
								<br />
								<span className="text-sm text-muted">CPU</span>
							</span>

							<span>
								<span className="text-lg font-weight-bold node-spec-no">
									{
										this.props.nodeInfo.nodeCapacity[
											"ephemeral-storage"
										]
									}
								</span>
								<br />
								<span className="text-sm text-muted">
									Storage
								</span>
							</span>

							<span>
								<span className="text-lg font-weight-bold node-spec-no">
									{this.props.nodeInfo.nodeCapacity.memory}
								</span>
								<br />
								<span className="text-sm text-muted">
									Memory
								</span>
							</span>

							<span>
								<span className="text-lg font-weight-bold node-spec-no">
									{this.props.nodeInfo.nodeCapacity.pods}
								</span>
								<br />
								<span className="text-sm text-muted">Pods</span>
							</span>
						</div>
						<hr />
						Labels:&nbsp;
						<CardLabels
							labels={this.props.nodeInfo.nodeLabels}
							refreshState={() => this.props.refreshState()}
						/>
						<hr />
						Annotations:&nbsp;
						<CardLabels
							labels={this.props.nodeInfo.nodeAnnotations}
							refreshState={() => this.props.refreshState()}
						/>
					</Card.Body>
				</Card>
			</React.Fragment>
		);
	}
}

export default NodeCard;
