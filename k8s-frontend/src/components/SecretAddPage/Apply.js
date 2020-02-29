import React, { Component } from "react";
import { createSecret } from "../../services";

class ApplyPage extends Component {
	render() {
		return (
			<React.Fragment>
				<span className="greeting">Great!</span>

				<span className="message">
					We got what we needed. Click the button below to create the
					resource.
				</span>

				<span
					className="button-positive"
					onClick={() =>
						createSecret(
							this.props.namespace,
							this.props.resourceName,
							this.props.resourceData
						)
					}
				>
					Create new secret
				</span>
			</React.Fragment>
		);
	}
}

export default ApplyPage;
