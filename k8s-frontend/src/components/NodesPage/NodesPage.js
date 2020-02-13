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

		getNodes()
			.then(result => {
				let newState = { ...this.state };

				newState.pageLoading = false;
				newState.nodesListSet = true;
				newState.nodesList = result.payLoad;

				if (this._isMounted) this.setState(newState);
			})
			.catch(err => {
				if (this._isMounted)
					this.setState({
						...this.state,
						errorSet: true,
						errorDescription: err
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
