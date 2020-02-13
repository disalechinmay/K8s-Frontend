import React, { Component } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { CardLabels } from "../common";

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
						{/* <div className="d-flex text-center justify-content-around align-items-center"> */}
						<Row className="text-center align-tems-center">
							<Col
								xs={12}
								sm={12}
								md={12}
								lg={3}
								className=" mb-2"
							>
								<span className="col-xs-12">
									<span className="text-lg font-weight-bold node-spec-no">
										{this.props.nodeInfo.nodeCapacity.cpu}
									</span>
									<br />
									<span className="text-sm text-muted">
										CPU
									</span>
								</span>
							</Col>

							<Col
								xs={12}
								sm={12}
								md={12}
								lg={3}
								className=" mb-2"
							>
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
							</Col>

							<Col
								xs={12}
								sm={12}
								md={12}
								lg={3}
								className=" mb-2"
							>
								<span>
									<span className="text-lg font-weight-bold node-spec-no">
										{
											this.props.nodeInfo.nodeCapacity
												.memory
										}
									</span>
									<br />
									<span className="text-sm text-muted">
										Memory
									</span>
								</span>
							</Col>

							<Col
								xs={12}
								sm={12}
								md={12}
								lg={3}
								className=" mb-2"
							>
								<span>
									<span className="text-lg font-weight-bold node-spec-no">
										{this.props.nodeInfo.nodeCapacity.pods}
									</span>
									<br />
									<span className="text-sm text-muted">
										Pods
									</span>
								</span>
							</Col>
							{/* </div> */}
						</Row>
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
