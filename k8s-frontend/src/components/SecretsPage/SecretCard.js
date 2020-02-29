import React, { Component } from "react";
import { CardLabels } from "../common";
import { deleteSecret } from "../../services";

/* 
	Compulsory props:
		1. secretInfo (object)
			- Information about the secret to be displayed.
		2. refreshState (method) [NON-TESTABLE]
			- Used to refresh parent's state.
		3. namespace (string)
		4. renderEditPage (method)

	Optional props:
		1. showResourceType (boolean)
			- If set, displays a resource type tag in the card header.
			- Used by SearchPage.
*/
class SecretCard extends Component {
	state = {};
	render() {
		return (
			<React.Fragment>
				<div className="card flex flex-column">
					{/* Card Header */}
					<React.Fragment>
						<span className="flex flex-row space-between w-100 ">
							{/* Card Title */}
							<span className="flex flex-row title mw-80 flex-start">
								<span className="fa fa-lastfm" />
								&emsp;
								{this.props.secretInfo.secretName}
								{this.props.showResourceType && (
									<sup className="resource-type">Secret</sup>
								)}
							</span>

							{/* Card Resource Manip Button */}
							<span className="resource-manage-section">
								<span className="fa fa-bars floaty-button" />
								<span className="buttons">
									<span
										className="resource-delete-button fa fa-trash"
										onClick={() =>
											deleteSecret(
												this.props.namespace,
												this.props.secretInfo.secretName
											)
										}
									/>
									<span className="resource-restart-button fa fa-refresh" />
									<span
										className="resource-edit-button fa fa-pencil"
										onClick={() =>
											this.props.renderEditPage(
												"SECRET",
												this.props.secretInfo.secretName
											)
										}
									/>
								</span>
							</span>
						</span>
					</React.Fragment>

					{/* Card Body */}
					<React.Fragment>
						{/* Data */}
						<div className="flex flex-column mw-100">
							{this.props.secretInfo.secretData &&
								Object.entries(
									this.props.secretInfo.secretData
								).map(([key, val], index) => {
									return (
										<div
											className="secret-data"
											key={index + "_FRAG"}
										>
											<span className="key">{key}</span>
											&emsp;
											<span className="value">{val}</span>
											<br />
										</div>
									);
								})}
						</div>
						<br />

						{/* Labels */}
						<span className="flex flex-row">
							<span className="mt-5">Labels:</span>
							<span className="flex flex-row mw-100 wrap">
								<CardLabels
									labels={this.props.secretInfo.secretLabels}
									refreshState={() =>
										this.props.refreshState()
									}
								/>
							</span>
						</span>

						{/* Annotations */}
						<span className="flex flex-row">
							<span className="mt-5">Annotations:</span>
							<span className="flex flex-row mw-100 wrap">
								<CardLabels
									labels={
										this.props.secretInfo.secretAnnotations
									}
									refreshState={() =>
										this.props.refreshState()
									}
								/>
							</span>
						</span>
					</React.Fragment>
				</div>
			</React.Fragment>
		);
	}
}

export default SecretCard;
