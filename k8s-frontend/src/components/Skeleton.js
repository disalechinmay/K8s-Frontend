import React, { Component } from "react";
import { getNamespaces } from "../services";
import { LoadingPage, ErrorPage } from "./common";
import { NodesPage } from "./NodesPage";
import { PodsPage } from "./PodsPage";
import { DeploymentsPage } from "./DeploymentsPage";
import { ServicesPage } from "./ServicesPage";
import { JobsPage } from "./JobsPage";
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
		searchTokens: []
	};

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

	// Updates the state when sidebar options are selected.
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

	// Refreshes the state. Used for reflecting child component state change.
	refreshState() {
		this.setState({ ...this.state });
	}

	// Sets sidebarOptionSelectec to 9, which in turn renders SearchPage.
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

	render() {
		// Renders ErrorPage if errorSet is true.
		if (this.state.errorSet)
			return <ErrorPage errorDescription={this.state.errorDescription} />;

		// Renders LoadingPage if pageLoading is true.
		if (this.state.pageLoading) return <LoadingPage />;

		return (
			<React.Fragment>
				<div className="mainContainer">
					<div className="sidebar">
						<div
							className="sidebar-title"
							onClick={event => this.handleClick(event, 0)}
						>
							Symphonize
						</div>
						<div className="sidebar-namespace-picker">
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
							</div>

							<div className="namespace-picker-title">
								Namespace
							</div>
						</div>
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
										className={sidebarOption.style}
									></span>
									&emsp; {sidebarOption.title}
								</div>
							);
						})}
						<SearchBar
							refreshState={() => this.refreshState()}
							renderSearchPage={() => this.renderSearchPage()}
							sendTokens={tokens => this.sendTokens(tokens)}
						/>
					</div>

					<div className="mainContent" id="mainContent">
						{/* Depending upon sidebarOptionSelected, render respective page. */}

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

						{this.state.sidebarOptionSelected === 4 && (
							<ServicesPage
								refreshState={() => this.refreshState()}
								namespace={this.state.namespaceSelected}
							/>
						)}
						{this.state.sidebarOptionSelected === 5 && (
							<JobsPage
								refreshState={() => this.refreshState()}
								namespace={this.state.namespaceSelected}
							/>
						)}

						{this.state.sidebarOptionSelected === 9 && (
							<SearchPage
								refreshState={() => this.refreshState()}
								namespace={this.state.namespaceSelected}
								searchTokens={this.state.searchTokens}
							/>
						)}
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Skeleton;
