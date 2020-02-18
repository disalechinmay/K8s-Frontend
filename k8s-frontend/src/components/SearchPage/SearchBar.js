import React, { Component } from "react";

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.searchDiv = React.createRef();
	}

	handleClick() {
		if (this.searchDiv.current.textContent === "Search Resources..")
			this.searchDiv.current.textContent = "";
	}

	handleChange(event) {
		this.props.renderSearchPage();
		let tokens = this.searchDiv.current.textContent.split(" ");

		this.props.sendTokens(tokens);
	}

	handleBlur() {
		if (this.searchDiv.current.textContent === "")
			this.searchDiv.current.textContent = "Search Resources..";
	}

	render() {
		return (
			<React.Fragment>
				<div
					className="sidebar-search"
					contentEditable="true"
					suppressContentEditableWarning="true"
					ref={this.searchDiv}
					onClick={() => this.handleClick()}
					onBlur={() => this.handleBlur()}
					onInput={event => this.handleChange(event)}
				>
					Search Resources..
				</div>
			</React.Fragment>
		);
	}
}

export default SearchBar;
