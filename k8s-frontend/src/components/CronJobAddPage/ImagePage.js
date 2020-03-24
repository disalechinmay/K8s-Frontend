import React, { Component } from "react";

class ImagePage extends Component {
	imageNameRef = React.createRef();

	render() {
		return (
			<React.Fragment>
				<span className="message">
					What image do you want to add to Cron Job?
				</span>

				<input
					type="text"
					placeholder="Enter image name here..."
					ref={this.imageNameRef}
					defaultValue={this.props.imageName}
				/>

				<br />
				<span>
					<span
						className="button-negative"
						onClick={async () => {
							await this.props.setResourceImage(
								this.imageNameRef.current.value
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
							await this.props.setResourceImage(
								this.imageNameRef.current.value
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

export default ImagePage;
