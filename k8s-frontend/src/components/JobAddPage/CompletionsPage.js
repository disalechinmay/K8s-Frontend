import React, { Component } from "react";

class ReplicasPage extends Component {
	resourceCompletionsRef = React.createRef();

	render() {
		return (
			<React.Fragment>
				<span className="message">
					Enter the number of completions:
				</span>

				<input
					className="crazy-big-no"
					type="text"
					placeholder="Number of completions..."
					ref={this.resourceCompletionsRef}
					defaultValue={this.props.resourceCompletions}
				/>

				<br />
				<span>
					<span
						className="button-negative"
						onClick={async () => {
							await this.props.setResourceCompletions(
								this.resourceCompletionsRef.current.value
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
							await this.props.setResourceCompletions(
								this.resourceCompletionsRef.current.value
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

export default ReplicasPage;
