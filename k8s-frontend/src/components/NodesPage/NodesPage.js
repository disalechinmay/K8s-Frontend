import React, { Component } from "react";
import { SmallLoadingPage, SmallErrorPage } from "../common";
import { getNodes } from "../../services";
import NodeCard from "./NodeCard";

class NodesPage extends Component {
	state = {
		pageLoading: true,
		nodesListSet: false,
		nodesList: [],
		errorSet: false,
		errorDescription: ""
	};
	_isMounted = false;

	componentDidMount() {
		this._isMounted = true;

		// Makes a service call to get a list of nodes
		getNodes()
			.then(result => {
				if (this._isMounted)
					this.setState({
						...this.state,
						pageLoading: false,
						nodesListSet: true,
						nodesList: result.payLoad
					});
			})
			.catch(error => {
				if (this._isMounted)
					this.setState({
						...this.state,
						errorSet: true,
						errorDescription: error
					});
			});
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		if (this.state.errorSet) {
			return (
				<SmallErrorPage
					errorDescription={this.state.errorDescription}
				/>
			);
		}

		if (this.state.pageLoading) return <SmallLoadingPage />;

		return (
			<React.Fragment>
				{this.state.nodesListSet &&
					this.state.nodesList.map((nodeInfo, index) => {
						return (
							<NodeCard
								key={index + "_NODE_CARD"}
								nodeInfo={nodeInfo}
								refreshState={() => this.props.refreshState()}
							/>
						);
					})}
			</React.Fragment>
		);
	}
}

export default NodesPage;
