import React, { Component } from "react";
import SmallLoadingPage from "../common/SmallLoadingPage";
import { getNodes } from "../../services";
import "../../assets/styles/common.css";
import NodeCard from "./NodeCard";

class NodesPage extends Component {
	state = { pageLoading: true, nodesListSet: false, nodesList: [] };

	constructor(props) {
		super(props);

		getNodes().then(result => {
			let newState = { ...this.state };

			newState.pageLoading = false;
			newState.nodesListSet = true;
			newState.nodesList = result.payLoad;

			this.setState(newState);
		});
	}

	render() {
		if (this.state.pageLoading) return <SmallLoadingPage />;

		return (
			<React.Fragment>
				{this.state.nodesListSet &&
					this.state.nodesList.map((nodeInfo, index) => {
						return (
							<NodeCard
								key={index + "_NODE_CARD"}
								nodeInfo={nodeInfo}
								index={index}
								refreshState={() => this.props.refreshState()}
							/>
						);
					})}
			</React.Fragment>
		);
	}
}

export default NodesPage;
