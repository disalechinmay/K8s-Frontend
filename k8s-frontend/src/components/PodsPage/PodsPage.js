import React, { Component } from "react";
import { Card, ListGroup, Button, Badge } from "react-bootstrap";
import SmallLoadingPage from "../SmallLoadingPage";
import { getPods } from "../../services";
import "../../assets/styles/common.css";

class PodsPage extends Component {
	state = { pageLoading: true, podsListSet: false, podsList: [] };

	constructor(props) {
		super(props);

		getPods(this.props.namespace).then(result => {
			let newState = { ...this.state };

			newState.pageLoading = false;
			newState.podsListSet = true;
			newState.podsList = result.payLoad;

			this.setState(newState);
		});
	}

	componentDidUpdate(previousProps) {
		if (previousProps.namespace != this.props.namespace)
			this.setState({
				pageLoading: true,
				podsListSet: false,
				podsList: []
			});

		getPods(this.props.namespace).then(result => {
			let newState = { ...this.state };

			newState.pageLoading = false;
			newState.podsListSet = true;
			newState.podsList = result.payLoad;

			this.setState(newState);
		});
	}

	render() {
		if (this.state.pageLoading) return <SmallLoadingPage />;

		if (
			this.state.pageLoading === false &&
			this.state.podsListSet &&
			this.state.podsList.length === 0
		)
			return (
				<React.Fragment>
					No pods present in this namespace.
				</React.Fragment>
			);

		return (
			<React.Fragment>
				{this.state.podsListSet &&
					this.state.podsList.map((podInfo, index) => {
						return (
							<React.Fragment key={index + "_FRAG"}>
								<Card
									key={index + "_CARD"}
									className=" shadow-lg p-0 mb-4 rounded"
								>
									<Card.Header>
										<span className="text-muted">
											Pod #{index + 1}:
										</span>{" "}
										<span className="font-weight-bold dancing-font">
											{podInfo.podName}
										</span>
									</Card.Header>

									<Card.Body>
										Labels:
										<br />
										{podInfo.podLabels &&
											Object.entries(
												podInfo.podLabels
											).map(([key, val], index) => {
												return (
													<React.Fragment
														key={
															index +
															"_LABEL_FRAG"
														}
													>
														<Button
															variant="secondary"
															size="sm"
															className="mb-1"
															key={
																index +
																"_LABEL_BUTTON"
															}
														>
															{key}{" "}
															<Badge
																variant="light"
																key={
																	index +
																	"_LABEL_BADGE"
																}
															>
																{val}
															</Badge>
														</Button>
														&nbsp;&nbsp;
													</React.Fragment>
												);
											})}
										<hr />
										Annotations:
										<br />
										{podInfo.podAnnotations &&
											Object.entries(
												podInfo.podAnnotations
											).map(([key, val], index) => {
												return (
													<React.Fragment
														key={
															index +
															"_ANNOT_FRAG"
														}
													>
														<Button
															variant="secondary"
															size="sm"
															className="mb-1"
															key={
																index +
																"_ANNOT_BUTTON"
															}
														>
															{key}{" "}
															<Badge
																variant="light"
																key={
																	index +
																	"_ANNOT_BADGE"
																}
															>
																{val}
															</Badge>
														</Button>
														&nbsp;&nbsp;
													</React.Fragment>
												);
											})}
									</Card.Body>
								</Card>
							</React.Fragment>
						);
					})}
			</React.Fragment>
		);
	}
}

export default PodsPage;
