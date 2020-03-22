import React, { Component } from "react";
import StartPage from "./StartPage";
import ResourceNamePage from "./ResourceNamePage";
import ImagePage from "./ImagePage";
import CompletionsPage from "./CompletionsPage";
import ApplyPage from "./Apply";

class JobAddPage extends Component {
	state = {
		currentPage: 1,
		totalPages: 5,
		resourceName: "",
		resourceImage: "",
		resourceCompletions: 1
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

	setResourceCompletions(completions) {
		if (this._isMounted)
			this.setState({
				...this.state,
				resourceCompletions: completions
			});
	}

	renderPreviousPage() {
		if (this.state.currentPage !== 1) {
			if (this._isMounted) {
				this.setState({
					...this.state,
					currentPage: this.state.currentPage - 1
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

	setResourceImage(resourceImage) {
		if (this._isMounted) {
			this.setState({
				...this.state,
				resourceImage
			});
		}
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
							resourceName={this.state.resourceName}
							renderNextPage={() => this.renderNextPage()}
							renderPreviousPage={() => this.renderPreviousPage()}
							setResourceName={resourceName =>
								this.setResourceName(resourceName)
							}
						/>
					)}

					{this.state.currentPage === 3 && (
						<ImagePage
							imageName={this.state.resourceImage}
							renderNextPage={() => this.renderNextPage()}
							renderPreviousPage={() => this.renderPreviousPage()}
							setResourceImage={data =>
								this.setResourceImage(data)
							}
						/>
					)}

					{this.state.currentPage === 4 && (
						<CompletionsPage
							resourceCompletions={this.state.resourceCompletions}
							renderNextPage={() => this.renderNextPage()}
							renderPreviousPage={() => this.renderPreviousPage()}
							setResourceCompletions={completions =>
								this.setResourceCompletions(completions)
							}
						/>
					)}

					{this.state.currentPage === 5 && (
						<ApplyPage
							namespace={this.props.namespace}
							resourceName={this.state.resourceName}
							resourceImage={this.state.resourceImage}
							resourceCompletions={this.state.resourceCompletions}
							renderPreviousPage={() => this.renderPreviousPage()}
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

export default JobAddPage;
