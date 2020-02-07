import React, { Component } from "react";
import { Form, Container, Navbar, Row, Col } from "react-bootstrap";
import "../assets/styles/common.css";
import { NodesPage } from "./NodesPage";
import LoadingPage from "./LoadingPage";
import { getNamespaces } from "../services";

class Skeleton extends Component {
	state = {
		sidebarOptionSelected: 0,
		pageLoading: true,
		namespacesListSet: false,
		namespacesList: [],
		namespaceSelected: "default"
	};

	constructor(props) {
		super(props);

		this.optionRefs = [];
		for (let iter = 0; iter < 8; iter++)
			this.optionRefs[iter] = React.createRef();

		getNamespaces().then(result => {
			let newState = { ...this.state };

			newState.pageLoading = false;
			newState.namespacesListSet = true;
			newState.namespacesList = result.payLoad;

			this.setState(newState);
		});
	}

	// Updates the state when sidebar options are selected.
	handleClick(event, clickedOptionIndex) {
		let newState = { ...this.state };

		for (let iter = 0; iter < 8; iter++)
			if (this.optionRefs[iter].current.classList.contains("active"))
				this.optionRefs[iter].current.classList.remove("active");

		newState.sidebarOptionSelected = clickedOptionIndex;

		if (clickedOptionIndex !== 0) event.target.classList.add("active");

		this.setState(newState);
	}

	// Updates the state when namespace selector changes.
	handleNamespaceChange(event) {
		this.setState({ ...this.state, namespaceSelected: event.target.value });
	}

	render() {
		if (this.state.pageLoading) return <LoadingPage />;

		return (
			<React.Fragment>
				<Container className="margin-top-10">
					<Container>
						<Navbar>
							<Navbar.Brand
								href="#home"
								className="navbar-title"
								onClick={event => this.handleClick(event, 0)}
							>
								Symphonize
							</Navbar.Brand>
							<Navbar.Toggle />
							<Navbar.Collapse className="justify-content-end">
								<Navbar.Text>
									<Form.Group
										as={Row}
										controlId="exampleForm.ControlSelect1"
									>
										<Form.Label column sm="4">
											Namespace
										</Form.Label>
										<Col sm="8">
											<Form.Control
												as="select"
												defaultValue="default"
												onChange={event =>
													this.handleNamespaceChange(
														event
													)
												}
											>
												{/* Populates options of namespaces */}
												{this.state.namespacesListSet &&
													this.state.namespacesList.map(
														namespace => {
															return (
																<option
																	value={
																		namespace
																	}
																	key={
																		namespace +
																		"_NAMESPACE"
																	}
																>
																	{namespace}
																</option>
															);
														}
													)}
											</Form.Control>
										</Col>
									</Form.Group>
								</Navbar.Text>
							</Navbar.Collapse>
						</Navbar>

						<hr />
						<Row>
							<Col className="right-border bottom-border">
								<div className="sidebar">
									<a
										id="nodes_sidebarOption"
										className="rounded-corners margin-top-10"
										href="#nodes"
										onClick={event =>
											this.handleClick(event, 1)
										}
										ref={this.optionRefs[0]}
									>
										Nodes
									</a>
									<a
										id="pods_sidebarOption"
										className="rounded-corners  margin-top-10"
										href="#pods"
										onClick={event =>
											this.handleClick(event, 2)
										}
										ref={this.optionRefs[1]}
									>
										Pods
									</a>
									<a
										id="deployments_sidebarOption"
										className="rounded-corners  margin-top-10"
										href="#deployments"
										onClick={event =>
											this.handleClick(event, 3)
										}
										ref={this.optionRefs[2]}
									>
										Deployments
									</a>
									<a
										id="services_sidebarOption"
										className="rounded-corners  margin-top-10"
										href="#services"
										onClick={event =>
											this.handleClick(event, 4)
										}
										ref={this.optionRefs[3]}
									>
										Services
									</a>
									<a
										id="jobs_sidebarOption"
										className="rounded-corners  margin-top-10"
										href="#jobs"
										onClick={event =>
											this.handleClick(event, 5)
										}
										ref={this.optionRefs[4]}
									>
										Jobs
									</a>
									<a
										id="cronJobs_sidebarOption"
										className="rounded-corners margin-top-10"
										href="#cronjobs"
										onClick={event =>
											this.handleClick(event, 6)
										}
										ref={this.optionRefs[5]}
									>
										Cron Jobs
									</a>
									<a
										id="configMaps_sidebarOption"
										className="rounded-corners margin-top-10"
										href="#configmaps"
										onClick={event =>
											this.handleClick(event, 7)
										}
										ref={this.optionRefs[6]}
									>
										Config Maps
									</a>
									<a
										id="secrets_sidebarOption"
										className="rounded-corners margin-top-10"
										href="#secrets"
										onClick={event =>
											this.handleClick(event, 8)
										}
										ref={this.optionRefs[7]}
									>
										Secrets
									</a>
								</div>
							</Col>
							<Col xs={9} className="margin-top-10">
								{this.state.sidebarOptionSelected === 1 && (
									<NodesPage />
								)}
							</Col>
						</Row>
					</Container>
				</Container>
			</React.Fragment>
		);
	}
}

export default Skeleton;
