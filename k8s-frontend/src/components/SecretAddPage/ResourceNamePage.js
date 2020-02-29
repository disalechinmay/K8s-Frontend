import React, { Component } from "react";

class ResourceNamePage extends Component {
	resourceNameRef = React.createRef();

	render() {
		return (
			<React.Fragment>
				<span className="message">
					What do you want to name the new resource?
				</span>

				<input
					type="text"
					placeholder="Enter resource name here..."
					ref={this.resourceNameRef}
				/>

				<span
					className="button-positive"
					onClick={async () => {
						await this.props.setResourceName(
							this.resourceNameRef.current.value
						);
						this.props.renderNextPage();
					}}
				>
					Next
				</span>
			</React.Fragment>
		);
	}
}

export default ResourceNamePage;
