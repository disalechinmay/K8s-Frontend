import React, { Component } from "react";

/* 
	Takes in a few compulsory props:
		1. nodeInfo

	WARNING: Doesn't render anything without these props.
*/
class NodeCard extends Component {
	// Validates nodeInfo prop
	validateProps() {
		if (!this.props.nodeInfo) return false;

		if (!this.props.nodeInfo.nodeName) return false;
		if (typeof this.props.nodeInfo.nodeName !== "string") return false;

		if (!this.props.nodeInfo.nodeCapacity) return false;
		if (typeof this.props.nodeInfo.nodeCapacity !== "object") return false;
		if (!this.props.nodeInfo.nodeCapacity.cpu) return false;
		if (!this.props.nodeInfo.nodeCapacity["ephemeral-storage"])
			return false;
		if (!this.props.nodeInfo.nodeCapacity.memory) return false;
		if (!this.props.nodeInfo.nodeCapacity.pods) return false;

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
