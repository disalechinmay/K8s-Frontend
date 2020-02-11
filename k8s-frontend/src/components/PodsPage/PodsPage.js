import React, { Component } from "react";
import SmallLoadingPage from "../common/SmallLoadingPage";
import { getPods } from "../../services";
import "../../assets/styles/common.css";
import PodCard from "./PodCard";

class PodsPage extends Component {
	state = { pageLoading: true, podsListSet: false, podsList: [] };

	constructor(props) {
		super(props);

		// Get list of pods for the selected namespace.
		getPods(this.props.namespace).then(result => {
			let newState = { ...this.state };

			newState.pageLoading = false;
			newState.podsListSet = true;
			newState.podsList = result.payLoad;

			this.setState(newState);
		});
	}

	componentDidUpdate(previousProps) {
		// If namespace is changed, get new data.
		if (previousProps.namespace !== this.props.namespace) {
			this.setState({
				pageLoading: true,
				podsListSet: false,
				podsList: []
			});

			getPods(this.props.namespace).then(result => {
				let newState = { ...this.state };

				newState.pageLoading = false;
				newState.podsListSet = true;
				newState.podsList = result.payLoad;

				this.setState(newState);
			});
		}
	}

	render() {
		if (this.state.pageLoading) return <SmallLoadingPage />;

		if (
			this.state.pageLoading === false &&
			this.state.podsListSet &&
			this.state.podsList.length === 0
		)
			return (
				<React.Fragment>
					No pods present in this namespace.
				</React.Fragment>
			);

		return (
			<React.Fragment>
				{this.state.podsListSet &&
					this.state.podsList.map((podInfo, index) => {
						return (
							<React.Fragment key={index + "_FRAG"}>
								<PodCard
									key={index + "_POD_CARD"}
									index={index}
									podInfo={podInfo}
									refreshState={() =>
										this.props.refreshState()
									}
								/>
							</React.Fragment>
						);
					})}
			</React.Fragment>
		);
	}
}

export default PodsPage;
