import React, { Component } from "react";
import { Card, Row, Col } from "react-bootstrap";
import CardLabels from "../common/CardLabels";
import "bootstrap/dist/css/bootstrap.min.css";

class ServiceCard extends Component {
	state = {};

	render() {
		return (
			<React.Fragment>
				<Card className=" shadow-lg p-0 mb-4 rounded">
					<Card.Header>
						<span className="text-muted">
							Service #{this.props.index + 1}:
						</span>{" "}
						<span className="font-weight-bold">
							{this.props.serviceInfo.serviceName}
						</span>
					</Card.Header>

					<Card.Body>
						Selectors:&nbsp;
						<CardLabels
							labels={this.props.serviceInfo.serviceSelectors}
							refreshState={() => this.props.refreshState()}
						/>
						<hr />
						<Row>
							<Col
								className="right-border bottom-border p-3 d-flex align-items-center text-center justify-content-center"
								// md="auto"
							>
								<span>
									<span className="font-weight-bolder replica-no">
										{this.props.serviceInfo.serviceType}
									</span>
									<br />
									<span className="text-muted">
										Service Type
									</span>
								</span>
							</Col>

							<Col className="bottom-border p-2 d-flex align-items-center text-center justify-content-center">
								<span>
									<span className="font-weight-bolder replica-no">
										{this.props.serviceInfo.servicePort}
									</span>
									<br />
									<span className="text-muted">Port</span>
								</span>
							</Col>
							<Col className="bottom-border p-2 d-flex align-items-center text-center justify-content-center">
								<span className="replica-no fa fa-arrow-circle-right" />
								{/* <span className="font-weight-bolder replica-no">
									=>
								</span> */}
							</Col>

							<Col className="right-border bottom-border p-2 d-flex align-items-center text-center justify-content-center">
								<span>
									<span className="font-weight-bolder replica-no">
										{
											this.props.serviceInfo
												.serviceTargetPort
										}
									</span>
									<br />
									<span className="text-muted">
										Target Port
									</span>
								</span>
							</Col>
						</Row>
						<hr />
						Labels:&nbsp;
						<CardLabels
							labels={this.props.serviceInfo.serviceLabels}
							refreshState={() => this.props.refreshState()}
						/>
						<hr />
						Annotations:&nbsp;
						<CardLabels
							labels={this.props.serviceInfo.serviceAnnotations}
							refreshState={() => this.props.refreshState()}
						/>
					</Card.Body>
				</Card>
			</React.Fragment>
		);
	}
}

export default ServiceCard;
