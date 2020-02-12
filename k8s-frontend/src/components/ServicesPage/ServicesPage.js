import React, { Component } from "react";
import { SmallLoadingPage, SmallErrorPage } from "../common";
import { getServices } from "../../services/services";
import ServiceCard from "./ServicesCard";

class ServicesPage extends Component {
	state = {
		pageLoading: true,
		servicesListSet: false,
		servicesList: [],
		errorSet: false,
		errorDescription: ""
	};
	_isMounted = false;

	componentDidMount() {
		this._isMounted = true;

		getServices(this.props.namespace)
			.then(result => {
				let newState = { ...this.state };

				newState.pageLoading = false;
				newState.servicesListSet = true;
				newState.servicesList = result.payLoad;

				if (this._isMounted) this.setState(newState);
			})
			.catch(err => {
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

	componentDidUpdate(previousProps) {
		// If namespace is changed, get new data.
		if (previousProps.namespace !== this.props.namespace) {
			this.setState({
				...this.state,
				pageLoading: true,
				servicesListSet: false,
				servicesList: []
			});

			getServices(this.props.namespace)
				.then(result => {
					let newState = { ...this.state };

					newState.pageLoading = false;
					newState.servicesListSet = true;
					newState.servicesList = result.payLoad;

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
	}

	render() {
		if (this.state.errorSet)
			return (
				<SmallErrorPage
					errorDescription={this.state.errorDescription}
				/>
			);

		if (this.state.pageLoading) return <SmallLoadingPage />;

		if (
			this.state.pageLoading === false &&
			this.state.servicesListSet &&
			this.state.servicesList.length === 0
		)
			return (
				<React.Fragment>
					No services present in this namespace.
				</React.Fragment>
			);

		return (
			<React.Fragment>
				{this.state.servicesListSet &&
					this.state.servicesList.map((serviceInfo, index) => {
						return (
							<React.Fragment key={index + "_FRAG"}>
								<ServiceCard
									key={index + "_SERVICE_CARD"}
									index={index}
									serviceInfo={serviceInfo}
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

export default ServicesPage;
