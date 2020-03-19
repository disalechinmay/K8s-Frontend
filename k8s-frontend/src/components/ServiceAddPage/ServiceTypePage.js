import React, { Component } from "react";
import { RadioGroup, RadioButton } from "react-radio-buttons";

class ServiceTypePage extends Component {
	resourceNameRef = React.createRef();

	render() {
		return (
			<React.Fragment>
				<span className="message">Select a sevice type:</span>
				<br />
				<RadioGroup
					onChange={value => this.props.setServiceType(value)}
					style={{ minWidth: "50%" }}
				>
					<RadioButton value="LoadBalancer" pointColor="#2ecc71">
						Load Balancer
					</RadioButton>
					<RadioButton value="ClusterIP" pointColor="#2ecc71">
						Cluster IP
					</RadioButton>
					<RadioButton value="NodePort" pointColor="#2ecc71">
						Node Port
					</RadioButton>

					<RadioButton value="ExternalName" pointColor="#2ecc71">
						External Name
					</RadioButton>
				</RadioGroup>

				<br />
				<br />
				<span>
					<span
						className="button-negative"
						onClick={async () => {
							this.props.renderPreviousPage();
						}}
					>
						Back
					</span>
					&emsp;&emsp;
					<span
						className="button-positive"
						onClick={async () => {
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

export default ServiceTypePage;
