import React, { Component } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { CardLabels } from "../common";

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
								className="right-border bottom-border p-2 d-flex align-items-center text-center justify-content-center"
								md="auto"
							>
								{/* <Col> */}
								Service Type:&nbsp;&nbsp;<br></br>
								<span className="align-items-center font-weight-bold">
									{this.props.serviceInfo.serviceType}
								</span>
							</Col>

							<Col>
								Port &nbsp;&nbsp;
								<span className="font-weight-bolder replica-no text-center justify-content-center">
									{this.props.serviceInfo.servicePort}
									=>
									{this.props.serviceInfo.serviceTargetPort}
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
						<br />
					</Card.Body>
				</Card>
			</React.Fragment>
		);
	}
}

export default ServiceCard;
