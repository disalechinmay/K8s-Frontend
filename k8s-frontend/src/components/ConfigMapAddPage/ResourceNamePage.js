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
					defaultValue={this.props.resourceName}
				/>

				<br />
				<span>
					<span
						className="button-negative"
						onClick={async () => {
							await this.props.setResourceName(
								this.resourceNameRef.current.value
							);
							this.props.renderPreviousPage();
						}}
					>
						Back
					</span>
					&emsp;&emsp;
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
				</span>
			</React.Fragment>
		);
	}
}

export default ResourceNamePage;
