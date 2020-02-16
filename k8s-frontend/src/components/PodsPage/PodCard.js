import React, { Component } from "react";
import { deletePod } from "../../services";
import { CardLabels, CardContainerList } from "../common";

class PodCard extends Component {
	render() {
		return (
			<React.Fragment>
				<div className="card flex flex-column">
					<span className="w-100">
						<span className="title">
							<span className="fa fa-lastfm" />
							&emsp;
							{this.props.podInfo.podName}
						</span>

						<span className="resource-manage-section">
							<span
								className="resource-delete-button fa fa-trash"
								onClick={() =>
									deletePod(
										this.props.namespace,
										this.props.podInfo.podName
									)
								}
							/>
							<span className="resource-restart-button fa fa-refresh" />
							<span className="resource-terminal-button fa fa-terminal" />
						</span>
					</span>

					<br />
					<span className="left-orange-border">
						<CardContainerList
							list={this.props.podInfo.podContainers}
							refreshState={() => this.props.refreshState()}
						/>
					</span>

					<br />

					<span className="flex flex-row">
						<span className="mt-5">Labels:</span>
						<span className="flex flex-row mw-100 wrap">
							<CardLabels
								labels={this.props.podInfo.podLabels}
								refreshState={() => this.props.refreshState()}
							/>
						</span>
					</span>

					<span className="flex flex-row">
						<span className="mt-5">Annotations:</span>
						<span className="flex flex-row mw-100 wrap">
							<CardLabels
								labels={this.props.podInfo.podAnnotations}
								refreshState={() => this.props.refreshState()}
							/>
						</span>
					</span>
				</div>
			</React.Fragment>
		);
	}
}

export default PodCard;
