import React, { Component } from "react";

class ReplicasPage extends Component {
	resourceReplicasRef = React.createRef();

	render() {
		return (
			<React.Fragment>
				<span className="message">
					How many replicas do you want to create?
				</span>

				<input
					className="crazy-big-no"
					type="text"
					placeholder="Enter total replicas..."
					ref={this.resourceReplicasRef}
					defaultValue={this.props.resourceReplicas}
				/>

				<br />
				<span>
					<span
						className="button-negative"
						onClick={async () => {
							await this.props.setResourceReplicas(
								this.resourceReplicasRef.current.value
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
							await this.props.setResourceReplicas(
								this.resourceReplicasRef.current.value
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
