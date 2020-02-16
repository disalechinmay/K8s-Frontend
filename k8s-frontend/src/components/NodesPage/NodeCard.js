import React, { Component } from "react";

class NodeCard extends Component {
	render() {
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
