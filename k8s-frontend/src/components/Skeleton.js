import React, { Component } from "react";
import { getNamespaces } from "../services";
import { LoadingPage, ErrorPage } from "./common";
import { HomePage } from "./HomePage";
import { NodesPage } from "./NodesPage";
import { PodsPage } from "./PodsPage";
import { PodAddPage } from "./PodAddPage";
import { PodEditPage } from "./PodEditPage";
import { DeploymentsPage } from "./DeploymentsPage";
import { ConfigMapsPage } from "./ConfigMapsPage";
import { ConfigMapAddPage } from "./ConfigMapAddPage";
import { ConfigMapEditPage } from "./ConfigMapEditPage";
import { DeploymentEditPage } from "./DeploymentEditPage";
import { ServicesPage } from "./ServicesPage";
import { ServiceEditPage } from "./ServiceEditPage";
import { JobsPage } from "./JobsPage";
import { SecretsPage } from "./SecretsPage";
import { SecretAddPage } from "./SecretAddPage";
import { SecretEditPage } from "./SecretEditPage";
import { SearchBar, SearchPage } from "./SearchPage";
import { SIDEBAR_OPTIONS } from "../configs";

class Skeleton extends Component {
	state = {
		sidebarOptionSelected: 0,
		pageLoading: true,
		namespacesListSet: false,
		namespacesList: [],
		namespaceSelected: "default",
		errorSet: false,
		errorDescription: "",
		searchTokens: [],
		editResourceName: "" // Used as a prop to Edit Resource Page
	};

	// Creates sidebar button references.
	// Sets namespacesList using a service call.
	constructor(props) {
		super(props);

		// List of buttons which will appear on sidebar.
		this.sidebarOptions = SIDEBAR_OPTIONS;

		// References for sidebar buttons.
		this.optionRefs = [];
		for (let iter = 0; iter < this.sidebarOptions.length; iter++)
			this.optionRefs[iter] = React.createRef();

		// Fetching list of namespaces from backend.
		getNamespaces()
			.then(result => {
				this.setState({
					...this.state,
					pageLoading: false,
					namespacesListSet: true,
					namespacesList: result.payLoad
				});
			})
			.catch(error => {
				this.setState({
					...this.state,
					errorSet: true,
					errorDescription: error
				});
			});
	}

	// Updates the state & style when sidebar options are selected.
	handleClick(event, clickedOptionIndex) {
		let newState = { ...this.state };

		for (let iter = 0; iter < this.sidebarOptions.length; iter++)
			if (
				this.optionRefs[iter].current.classList.contains(
					"sidebar-button-active"
				)
			)
				this.optionRefs[iter].current.classList.remove(
					"sidebar-button-active"
				);

		newState.sidebarOptionSelected = clickedOptionIndex;

		if (clickedOptionIndex !== 0)
			event.target.classList.add("sidebar-button-active");

		this.setState(newState);
	}

	// Updates the state when namespace selector changes.
	handleNamespaceChange(event) {
		this.setState({ ...this.state, namespaceSelected: event.target.value });
	}

	// Sets sidebarOptionSelected to 9, which in turn renders SearchPage.
	// Manipulated by SearchBar.
	renderSearchPage() {
		for (let iter = 0; iter < this.sidebarOptions.length; iter++)
			if (
				this.optionRefs[iter].current.classList.contains(
					"sidebar-button-active"
				)
			)
				this.optionRefs[iter].current.classList.remove(
					"sidebar-button-active"
				);
		this.setState({ ...this.state, sidebarOptionSelected: 9 });
	}

	// Sets searchTokens in state, which is in turn sent to SearchPage.
	sendTokens(tokens) {
		this.setState({
			...this.state,
			searchTokens: tokens,
			sidebarOptionSelected: 9
		});
	}

	// Sets editResourceName and renders the resource edit page
	renderResourceEditPage(resourceType, resourceName) {
		if (resourceType === "DEPLOYMENT") {
			this.setState({
				...this.state,
				editResourceName: resourceName,
				sidebarOptionSelected: 13
			});
		} else if (resourceType === "SECRET") {
			this.setState({
				...this.state,
				editResourceName: resourceName,
				sidebarOptionSelected: 18
			});
		} else if (resourceType === "POD") {
			this.setState({
				...this.state,
				editResourceName: resourceName,
				sidebarOptionSelected: 12
			});
		} else if (resourceType === "CONFIG_MAP") {
			this.setState({
				...this.state,
				editResourceName: resourceName,
				sidebarOptionSelected: 17
			});
		} else if (resourceType === "SERVICE") {
			this.setState({
				...this.state,
				editResourceName: resourceName,
				sidebarOptionSelected: 14
			});
		}
	}

	// Renders resource add page
	renderResourceAddPage(resourceType) {
		if (resourceType === "SECRET") {
			this.setState({
				...this.state,
				sidebarOptionSelected: 28
			});
		} else if (resourceType === "CONFIG_MAP") {
			this.setState({
				...this.state,
				sidebarOptionSelected: 27
			});
		} else if (resourceType === "POD") {
			this.setState({
				...this.state,
				sidebarOptionSelected: 23
			});
		}
	}

	render() {
		// Renders ErrorPage if errorSet is true.
		if (this.state.errorSet)
			return <ErrorPage errorDescription={this.state.errorDescription} />;

		// Renders LoadingPage if pageLoading is true.
		if (this.state.pageLoading) return <LoadingPage />;

		return (
			<React.Fragment>
				{/* Main Container */}
				<div className="mainContainer">
					{/* Sidebar */}
					<div className="sidebar">
						{/* Sidebar Title*/}
						<div
							className="sidebar-title"
							onClick={event => this.handleClick(event, 0)}
						>
							Symphonize
						</div>

						{/* Sidebar Namespace Picker*/}
						<div className="sidebar-namespace-picker">
							<span className="flex flex-row">
								<span className="flex flex-column justify-content-center namespace-settings">
									<span className="fa fa-cog">
										<span className="menu">
											<span onClick="">Add</span>
											<span>Delete</span>
										</span>
									</span>
								</span>

								<div className="namespace-picker">
									<select
										className="namespace-selector"
										onChange={event =>
											this.handleNamespaceChange(event)
										}
									>
										{/* Populates options of namespaces */}
										{this.state.namespacesListSet &&
											this.state.namespacesList.map(
												namespace => {
													return (
														<option
															value={namespace}
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
									</select>
									<div className="namespace-picker-title">
										Namespace
									</div>
								</div>
							</span>
						</div>

						{/* Sidebar Buttons*/}
						<div className="sidebar-section-title">Resources</div>
						{/* Rendering sidebar buttons */}
						{this.sidebarOptions.map((sidebarOption, index) => {
							return (
								<div
									className="sidebar-button"
									id={sidebarOption.id}
									key={index + "_SIDEBAR_BUTTON"}
									onClick={event =>
										this.handleClick(event, index + 1)
									}
									ref={this.optionRefs[index]}
								>
									<span
										onClick={null}
										className={sidebarOption.style}
									></span>
									&emsp; {sidebarOption.title}
								</div>
							);
						})}

						{/* Sidebar SearchBar*/}
						<SearchBar
							renderSearchPage={() => this.renderSearchPage()}
							sendTokens={tokens => this.sendTokens(tokens)}
						/>
					</div>

					{/* Main Content: Displays core pages.*/}
					<div className="mainContent" id="mainContent">
						{/* Depending upon sidebarOptionSelected, render respective page. */}

						{this.state.sidebarOptionSelected === 0 && (
							<HomePage
								namespace={this.state.namespaceSelected}
							/>
						)}

						{this.state.sidebarOptionSelected === 1 && (
							<NodesPage />
						)}

						{this.state.sidebarOptionSelected === 2 && (
							<PodsPage
								namespace={this.state.namespaceSelected}
								renderAddPage={resourceType =>
									this.renderResourceAddPage(resourceType)
								}
								renderEditPage={(resourceType, resourceName) =>
									this.renderResourceEditPage(
										resourceType,
										resourceName
									)
								}
							/>
						)}

						{this.state.sidebarOptionSelected === 3 && (
							<DeploymentsPage
								renderEditPage={(resourceType, resourceName) =>
									this.renderResourceEditPage(
										resourceType,
										resourceName
									)
								}
								namespace={this.state.namespaceSelected}
							/>
						)}

						{this.state.sidebarOptionSelected === 4 && (
							<ServicesPage
								renderEditPage={(resourceType, resourceName) =>
									this.renderResourceEditPage(
										resourceType,
										resourceName
									)
								}
								namespace={this.state.namespaceSelected}
							/>
						)}
						{this.state.sidebarOptionSelected === 5 && (
							<JobsPage
								namespace={this.state.namespaceSelected}
							/>
						)}

						{this.state.sidebarOptionSelected === 7 && (
							<ConfigMapsPage
								renderEditPage={(resourceType, resourceName) =>
									this.renderResourceEditPage(
										resourceType,
										resourceName
									)
								}
								namespace={this.state.namespaceSelected}
								renderAddPage={resourceType =>
									this.renderResourceAddPage(resourceType)
								}
							/>
						)}

						{this.state.sidebarOptionSelected === 8 && (
							<SecretsPage
								renderEditPage={(resourceType, resourceName) =>
									this.renderResourceEditPage(
										resourceType,
										resourceName
									)
								}
								renderAddPage={resourceType =>
									this.renderResourceAddPage(resourceType)
								}
								namespace={this.state.namespaceSelected}
							/>
						)}

						{this.state.sidebarOptionSelected === 9 && (
							<SearchPage
								namespace={this.state.namespaceSelected}
								searchTokens={this.state.searchTokens}
							/>
						)}

						{this.state.sidebarOptionSelected === 12 && (
							<PodEditPage
								namespace={this.state.namespaceSelected}
								resourceName={this.state.editResourceName}
							/>
						)}

						{this.state.sidebarOptionSelected === 13 && (
							<DeploymentEditPage
								namespace={this.state.namespaceSelected}
								resourceName={this.state.editResourceName}
							/>
						)}

						{this.state.sidebarOptionSelected === 14 && (
							<ServiceEditPage
								namespace={this.state.namespaceSelected}
								resourceName={this.state.editResourceName}
							/>
						)}
						{this.state.sidebarOptionSelected === 17 && (
							<ConfigMapEditPage
								namespace={this.state.namespaceSelected}
								resourceName={this.state.editResourceName}
							/>
						)}

						{this.state.sidebarOptionSelected === 18 && (
							<SecretEditPage
								namespace={this.state.namespaceSelected}
								resourceName={this.state.editResourceName}
							/>
						)}

						{this.state.sidebarOptionSelected === 23 && (
							<PodAddPage
								namespace={this.state.namespaceSelected}
							/>
						)}
						{this.state.sidebarOptionSelected === 27 && (
							<ConfigMapAddPage
								namespace={this.state.namespaceSelected}
							/>
						)}
						{this.state.sidebarOptionSelected === 28 && (
							<SecretAddPage
								namespace={this.state.namespaceSelected}
							/>
						)}
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Skeleton;
