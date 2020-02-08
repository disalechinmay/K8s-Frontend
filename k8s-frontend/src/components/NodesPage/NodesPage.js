import React, { Component } from "react";
import { Card, ListGroup, Button, Badge } from "react-bootstrap";
import SmallLoadingPage from "../SmallLoadingPage";
import { getNodes } from "../../services";
import "../../assets/styles/common.css";

class NodesPage extends Component {
	state = { pageLoading: true, nodesListSet: false, nodesList: [] };

	constructor(props) {
		super(props);

		getNodes().then(result => {
			let newState = { ...this.state };

			newState.pageLoading = false;
			newState.nodesListSet = true;
			newState.nodesList = result.payLoad;

			this.setState(newState);
		});
	}

	render() {
		if (this.state.pageLoading) return <SmallLoadingPage />;

		return (
			<React.Fragment>
				{this.state.nodesListSet &&
					this.state.nodesList.map((nodeInfo, index) => {
						return (
							<React.Fragment key={index + "_FRAG"}>
								<Card
									key={index + "_CARD"}
									className=" shadow-lg p-0 mb-4 rounded"
								>
									<Card.Header>
										<span className="text-muted">
											Node #{index + 1}:
										</span>{" "}
										<span className="font-weight-bold dancing-font">
											{nodeInfo.nodeName}
										</span>
									</Card.Header>

									<Card.Body>
										<ListGroup
											horizontal
											className="col-lg-12 text-center"
											size="lg"
										>
											<ListGroup.Item>
												<span className="text-lg font-weight-bold">
													{nodeInfo.nodeCapacity.cpu}
												</span>
												<br />
												<span className="text-sm text-muted">
													CPU
												</span>
											</ListGroup.Item>
											<ListGroup.Item>
												<span className="text-lg font-weight-bold">
													{
														nodeInfo.nodeCapacity[
															"ephemeral-storage"
														]
													}
												</span>
												<br />
												<span className="text-sm text-muted">
													Storage
												</span>
											</ListGroup.Item>
											<ListGroup.Item>
												<span className="text-lg font-weight-bold">
													{
														nodeInfo.nodeCapacity
															.memory
													}
												</span>
												<br />
												<span className="text-sm text-muted">
													Memory
												</span>
											</ListGroup.Item>
											<ListGroup.Item>
												<span className="text-lg font-weight-bold">
													{nodeInfo.nodeCapacity.pods}
												</span>
												<br />
												<span className="text-sm text-muted">
													Pods
												</span>
											</ListGroup.Item>
										</ListGroup>
										<hr />
										Labels:
										<br />
										{nodeInfo.nodeLabels &&
											Object.entries(
												nodeInfo.nodeLabels
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
										{nodeInfo.nodeAnnotations &&
											Object.entries(
												nodeInfo.nodeAnnotations
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

export default NodesPage;
