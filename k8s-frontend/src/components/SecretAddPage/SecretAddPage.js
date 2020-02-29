import React, { Component } from "react";
import StartPage from "./StartPage";
import ResourceNamePage from "./ResourceNamePage";
import KeyValPage from "./KeyValPage";
import ApplyPage from "./Apply";
/*
	What should this component do?
		1. Accept resource name
		2. Accept a list of key value pairs
		3. Create the resource
			- In case of errors, display it, allow navigation to previous pages

	PAGES: 5
		Start
		Resource Name
		List of key vals
		Apply
*/

class SecretAddPage extends Component {
	state = {
		currentPage: 1,
		totalPages: 4,
		resourceName: "",
		resourceData: []
	};
	_isMounted = false;

	renderNextPage() {
		if (this.state.currentPage !== this.state.totalPages) {
			if (this._isMounted) {
				this.setState({
					...this.state,
					currentPage: this.state.currentPage + 1
				});
			}
		}
	}

	setResourceName(resourceName) {
		if (this._isMounted) {
			this.setState({
				...this.state,
				resourceName: resourceName
			});
		}
	}

	setResourceData(data) {
		if (this._isMounted)
			this.setState({ ...this.state, resourceData: data });
	}

	render() {
		return (
			<React.Fragment>
				<div className="step-form">
					{this.state.currentPage === 1 && (
						<StartPage
							renderNextPage={() => this.renderNextPage()}
						/>
					)}

					{this.state.currentPage === 2 && (
						<ResourceNamePage
							renderNextPage={() => this.renderNextPage()}
							setResourceName={resourceName =>
								this.setResourceName(resourceName)
							}
						/>
					)}

					{this.state.currentPage === 3 && (
						<KeyValPage
							renderNextPage={() => this.renderNextPage()}
							setResourceData={data => this.setResourceData(data)}
						/>
					)}

					{this.state.currentPage === 4 && (
						<ApplyPage
							namespace={this.props.namespace}
							resourceName={this.state.resourceName}
							resourceData={this.state.resourceData}
						/>
					)}

					<div className="progress-bar">
						{this.renderProgressBar()}
					</div>
				</div>
			</React.Fragment>
		);
	}

	renderProgressBar() {
		let stuffToRender = [];
		for (let i = 0; i < this.state.totalPages; i++) {
			if (i < this.state.currentPage)
				stuffToRender.push(<span className="completed">.</span>);
			else stuffToRender.push(<span className="not-completed">.</span>);
		}

		return (
			<React.Fragment>
				{stuffToRender.map((stuff, index) => {
					return (
						<React.Fragment key={index + "_PROGRESS"}>
							{stuff}
						</React.Fragment>
					);
				})}
			</React.Fragment>
		);
	}

	componentDidMount() {
		this._isMounted = true;
	}

	componentWillUnmount() {
		this._isMounted = false;
	}
}

export default SecretAddPage;
