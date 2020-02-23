import React, { Component } from "react";

/* 
	Compulsory props:
		1. nodeInfo (object)
			- Information about the node to be displayed.
		2. refreshState (method) [NON-TESTABLE]
			- Used to refresh parent's state.

	Optional props:
		1. showResourceType (boolean)
			- If set, displays a resource type tag in the card header.
			- Used by SearchPage.
*/
class NodeCard extends Component {
	// Validates props sent to this component.
	validateProps() {
		if (!this.props.nodeInfo) return false;

		if (!this.props.nodeInfo.nodeName) return false;
		if (typeof this.props.nodeInfo.nodeName !== "string") return false;

		if (!this.props.nodeInfo.nodeCapacity) return false;
		if (typeof this.props.nodeInfo.nodeCapacity !== "object") return false;
		if (
			!this.props.nodeInfo.nodeCapacity.cpu ||
			typeof this.props.nodeInfo.nodeCapacity.cpu !== "string"
		)
			return false;
		if (
			!this.props.nodeInfo.nodeCapacity.memory ||
			typeof this.props.nodeInfo.nodeCapacity.memory !== "string"
		)
			return false;

		if (
			!this.props.nodeInfo.nodeCapacity.pods ||
			typeof this.props.nodeInfo.nodeCapacity.pods !== "string"
		)
			return false;
		if (
			!this.props.nodeInfo.nodeCapacity["ephemeral-storage"] ||
			typeof this.props.nodeInfo.nodeCapacity["ephemeral-storage"] !==
				"string"
		)
			return false;

		return true;
	}

	render() {
		if (!this.validateProps()) return <React.Fragment />;

		return (
			<React.Fragment>
				<div className="card flex flex-column">
					<span className="title w-100">
						<span className="fa fa-lastfm" />
						&emsp;
						{this.props.nodeInfo.nodeName}
						{this.props.showResourceType && (
							<sup className="resource-type">Node</sup>
						)}
					</span>

					<div className="flex flex-row space-around">
						<span>
							<span className="big-number">
								{this.props.nodeInfo.nodeCapacity.cpu}
							</span>
							<br />
							CPU
						</span>

						<span>
							<span className="big-number">
								{
									this.props.nodeInfo.nodeCapacity[
										"ephemeral-storage"
									]
								}
							</span>
							<br />
							Storage
						</span>

						<span>
							<span className="big-number">
								{this.props.nodeInfo.nodeCapacity.memory}
							</span>
							<br />
							Memory
						</span>

						<span>
							<span className="big-number">
								{this.props.nodeInfo.nodeCapacity.pods}
							</span>
							<br />
							Pods
						</span>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default NodeCard;
