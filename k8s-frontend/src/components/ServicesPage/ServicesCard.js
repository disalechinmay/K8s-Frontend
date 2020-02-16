import React, { Component } from "react";
import { CardLabels } from "../common";

class ServiceCard extends Component {
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
				<div className="card flex flex-column">
					<span className="w-100">
						<span className="title">
							<span className="fa fa-lastfm" />
							&emsp;
							{this.props.serviceInfo.serviceName}
						</span>

						<span className="resource-manage-section">
							<span className="resource-delete-button fa fa-trash" />
							<span className="resource-restart-button fa fa-refresh" />
							<span className="resource-terminal-button fa fa-terminal" />
						</span>
					</span>

					<span className="flex flex-row">
						<span className="mt-5">Selectors:</span>
						<span className="flex flex-row mw-100 wrap">
							<CardLabels
								labels={this.props.serviceInfo.serviceSelectors}
								refreshState={() => this.props.refreshState()}
								matchedLabels={this.matchedLabels(
									this.props.serviceInfo.serviceSelectors,
									this.props.serviceInfo.serviceTemplateLabels
								)}
							/>
						</span>
					</span>
					<br />

					<div className="flex flex-row">
						<span>
							<span className="font-weight-bolder big-number">
								{this.props.serviceInfo.serviceType}
							</span>
							<br />
							<span>Service Type</span>
						</span>

						<span className="flex flex-row left-orange-border">
							<span>
								<span className="ml-5pr font-weight-bolder big-number">
									{this.props.serviceInfo.servicePort}
								</span>
								<br />
								<span>Service Port</span>
							</span>
							&emsp;
							<span className="fa fa-arrow-circle-right big-number" />
							&emsp;
							<span>
								<span className="font-weight-bolder big-number">
									{this.props.serviceInfo.serviceTargetPort}
								</span>
								<br />
								<span>Target Port</span>
							</span>
						</span>
					</div>

					<br />

					<span className="flex flex-row">
						<span className="mt-5">Labels:</span>
						<span className="flex flex-row mw-100 wrap">
							<CardLabels
								labels={this.props.serviceInfo.serviceLabels}
								refreshState={() => this.props.refreshState()}
							/>
						</span>
					</span>

					<span className="flex flex-row">
						<span className="mt-5">Annotations:</span>
						<span className="flex flex-row mw-100 wrap">
							<CardLabels
								labels={
									this.props.serviceInfo.serviceAnnotations
								}
								refreshState={() => this.props.refreshState()}
							/>
						</span>
					</span>
				</div>
			</React.Fragment>
		);

		// return (
		// 	<React.Fragment>

		// 			<Card.Body>
		// 				Selectors:&nbsp;
		// 				<CardLabels
		// 					labels={this.props.serviceInfo.serviceSelectors}
		// 					refreshState={() => this.props.refreshState()}
		// 				/>
		// 				<hr />
		// 				<Row>
		// 					<Col className="right-border bottom-border p-2 d-flex align-items-center text-center justify-content-center">
		// 						<span>
		// 							<span className="font-weight-bolder replica-no">
		//
		// 							</span>
		// 							<br />
		// 							<span className="text-muted">
		// 								Service Type
		// 							</span>
		// 						</span>
		// 					</Col>

		// 					<Col className="bottom-border p-2 d-flex align-items-center text-center justify-content-center">
		// 						<span>
		// 							<span className="font-weight-bolder replica-no">
		// 								{this.props.serviceInfo.servicePort}
		// 							</span>
		// 							<br />
		// 							<span className="text-muted">
		// 								Service Port
		// 							</span>
		// 						</span>
		// 					</Col>

		// 					<Col className="bottom-border p-2 d-flex align-items-center text-center justify-content-center">
		// 						<span>
		// 							<span className="fa fa-arrow-circle-right replica-no" />
		// 						</span>
		// 					</Col>

		// 					<Col className="bottom-border p-2 d-flex align-items-center text-center justify-content-center">

		// 						<span>
		// 							<span className="font-weight-bolder replica-no">
		// 								{
		// 									this.props.serviceInfo
		// 										.serviceTargetPort
		// 								}
		// 							</span>
		// 							<br />
		// 							<span className="text-muted">
		// 								Target Port
		// 							</span>
		// 						</span>
		// 					</Col>
		// 				</Row>
		//
		// 			</Card.Body>
		// 		</Card>
		// 	</React.Fragment>
		// );
	}
}

export default ServiceCard;
