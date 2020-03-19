import React, { Component } from "react";
import { createSecret } from "../../services";

class ApplyPage extends Component {
	state = { informationPane: "", errorSet: false, successSet: false };

	printError(error) {
		return (
			<div className="error">
				<span className="fa fa-times red-cross" />
				&nbsp;
				{error.rawError.status && error.rawError.status} Code:{" "}
				{error.rawError.code && error.rawError.code} (API Version:{" "}
				{error.rawError.apiVersion && error.rawError.apiVersion})
				<br />
				<br />
				Message:
				<br />
				{error.rawError.message && error.rawError.message}
				<br />
				<br />
				{error.rawError.details &&
					error.rawError.details.causes &&
					error.rawError.details.causes.map((cause, index) => {
						return (
							<React.Fragment key={index + "_CAUSE_FRAG"}>
								Field:&nbsp;
								{cause.field}
								<br />
								Message:&nbsp;
								{cause.message}
								<br />
								Reason:&nbsp;
								{cause.reason}
								<br />
								<br />
							</React.Fragment>
						);
					})}
			</div>
		);
	}

	printSuccess(success) {
		return (
			<div className="success">
				<span className="fa fa-check green-check" />
				&nbsp; Service created successfully.
			</div>
		);
	}

	render() {
		return (
			<React.Fragment>
				<span className="greeting">Great!</span>

				<span className="message">
					We got what we needed. Click the button below to create the
					resource.
				</span>

				<br />
				<div className="information-pane">
					{this.state.errorSet &&
						this.printError(this.state.informationPane)}

					{this.state.successSet &&
						this.printSuccess(this.state.informationPane)}
				</div>

				<br />
				<br />
				<span>
					<span
						className="button-negative"
						onClick={() => {
							this.props.renderPreviousPage();
						}}
					>
						Back
					</span>
					&emsp;&emsp;
					<span
						className="button-positive"
						onClick={() => {
							createSecret(
								this.props.namespace,
								this.props.resourceName,
								this.props.resourceData
							)
								.then(result => {
									this.setState({
										...this.state,
										informationPane: result,
										successSet: true,
										errorSet: false
									});
								})
								.catch(error =>
									this.setState({
										...this.state,
										informationPane: error,
										errorSet: true,
										successSet: false
									})
								);
						}}
					>
						Create new service
					</span>
				</span>
			</React.Fragment>
		);
	}
}

export default ApplyPage;
