import React, { Component } from "react";

class ExpandableComponent extends Component {
	state = {};
	render() {
		return <React.Fragment>{this.props.data.description}</React.Fragment>;
	}
}

export default ExpandableComponent;
