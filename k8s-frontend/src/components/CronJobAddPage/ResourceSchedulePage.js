import React, { Component } from "react";

class ResourceNamePage extends Component {
	resourceScheduleRef = React.createRef();

	render() {
		return (
			<React.Fragment>
				<span className="message">
					When do you want to schedule this Job?
				</span>

				<input
					className="crazy-big-no"
					type="text"
					placeholder="Enter Schdule"
					ref={this.resourceScheduleRef}
					defaultValue={this.props.resourceSchedule}
				/>

				<br />
				<span>
					<span
						className="button-negative"
						onClick={async () => {
							await this.props.setResourceSchedule(
								this.resourceScheduleRef.current.value
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
							await this.props.setResourceSchedule(
								this.resourceScheduleRef.current.value
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
