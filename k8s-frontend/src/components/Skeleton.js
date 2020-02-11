import React, { Component } from "react";
import { Form, Container, Navbar, Row, Col } from "react-bootstrap";
import "../assets/styles/common.css";
import { NodesPage } from "./NodesPage";
import LoadingPage from "./common/LoadingPage";
import { getNamespaces } from "../services";
import { PodsPage } from "./PodsPage";
import { DeploymentsPage } from "./DeploymentsPage";

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

		// List of buttons which will appear on sidebar.
		this.sidebarOptions = [
			{
				id: "nodes_sidebarOption",
				href: "#nodes",
				title: "Nodes",
				style: "fa fa-desktop"
			},
			{
				id: "pods_sidebarOption",
				href: "#pods",
				title: "Pods",
				style: "fa fa-archive"
			},
			{
				id: "deployments_sidebarOption",
				href: "#deployments",
				title: "Deployments",
				style: "fa fa-cubes"
			},
			{
				id: "services_sidebarOption",
				href: "#services",
				title: "Services",
				style: "fa fa-random"
			},
			{
				id: "jobs_sidebarOption",
				href: "#jobs",
				title: "Jobs",
				style: "fa fa-tasks"
			},
			{
				id: "cronJobs_sidebarOption",
				href: "#cronJobs",
				title: "Cron Jobs",
				style: "fa fa-clock-o"
			},
			{
				id: "configMaps_sidebarOption",
				href: "#configMaps",
				title: "Config Maps",
				style: "fa fa-gears"
			},
			{
				id: "secrets_sidebarOption",
				href: "#secrets",
				title: "Secrets",
				style: "fa fa-user-secret"
			}
		];

		// References of sidebar buttons.
		this.optionRefs = [];
		for (let iter = 0; iter < this.sidebarOptions.length; iter++)
			this.optionRefs[iter] = React.createRef();

		// Fetching list of namespaces from backend.
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

	// Refreshes the state. Used for reflecting child component state change.
	refreshState() {
		this.setState({ ...this.state });
	}

	render() {
		if (this.state.pageLoading) return <LoadingPage />;

		return (
			<React.Fragment>
				<Container className="margin-top-10 align-content-center">
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
												className="namespace-selector"
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
							<Col xs={12} sm={12} md={12} lg={3}>
								<Row className="sidebar shadow p-3 mb-5 bg-white rounded">
									{/* Rendering sidebar buttons */}
									{this.sidebarOptions.map(
										(sidebarOption, index) => {
											return (
												<Col
													xs={6}
													sm={6}
													md={12}
													lg={12}
												>
													<a
														key={
															index +
															"_SIDEBAR_OPTION"
														}
														id={sidebarOption.id}
														className="rounded-corners margin-top-10"
														href={
															sidebarOption.href
														}
														onClick={event =>
															this.handleClick(
																event,
																index + 1
															)
														}
														ref={
															this.optionRefs[
																index
															]
														}
													>
														<span
															className={
																sidebarOption.style
															}
														></span>
														&emsp;{" "}
														{sidebarOption.title}
													</a>
												</Col>
											);
										}
									)}
								</Row>
							</Col>
							<Col
								xs={12}
								sm={12}
								md={12}
								lg={9}
								className="margin-top-10"
							>
								{/* Depending upon sidebarOptionSelected, render respective page. */}
								{/* IMPROVEMENT: Move to this.sidebarOptions  */}

								{this.state.sidebarOptionSelected === 1 && (
									<NodesPage
										refreshState={() => this.refreshState()}
									/>
								)}

								{this.state.sidebarOptionSelected === 2 && (
									<PodsPage
										refreshState={() => this.refreshState()}
										namespace={this.state.namespaceSelected}
									/>
								)}

								{this.state.sidebarOptionSelected === 3 && (
									<DeploymentsPage
										refreshState={() => this.refreshState()}
										namespace={this.state.namespaceSelected}
									/>
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
