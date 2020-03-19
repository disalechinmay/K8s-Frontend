import React, { Component } from "react";

class ExpandableComponent extends Component {
	state = {};

	setStyle(key) {
		let res = this.props.resourceVars.some(
			element =>
				element.configMapName === this.props.data.title &&
				key === element.variable
		);

		if (res) return "key selected";
		return "key";
	}

	render() {
		return (
			<React.Fragment>
				{Object.entries(this.props.data.description).map(
					([key, val], index) => {
						return (
							<div className="pair select" key={index + "_FRAG"}>
								<span
									className={this.setStyle(key)}
									onClick={event => {
										if (
											!event.target.classList.contains(
												"selected"
											)
										) {
											event.target.classList.add(
												"selected"
											);

											let resourceVars = this.props
												.resourceVars;
											resourceVars.push({
												configMapName: this.props.data
													.title,
												variable: key
											});
											// this.setState({
											// 	...this.state,
											// 	resourceVars
											// });

											this.props.setResourceVars(
												resourceVars
											);
										}
									}}
								>
									{key}
								</span>
								&emsp;
								<span className="value">{val}</span>
								<br />
							</div>
						);
					}
				)}
			</React.Fragment>
		);
	}
}

export default ExpandableComponent;
