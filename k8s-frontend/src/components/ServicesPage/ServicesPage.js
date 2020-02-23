import React, { Component } from "react";
import { SmallLoadingPage, SmallErrorPage } from "../common";
import { getServices } from "../../services/services";
import ServiceCard from "./ServicesCard";

/* 
	Compulsory props:
		1. refreshState (method) [NON-TESTABLE]
			- Used to refresh parent's state.
		2. namespace

	Optional props:
		None
*/
class ServicesPage extends Component {
	state = {
		pageLoading: true,
		servicesListSet: false,
		servicesList: [],
		errorSet: false,
		errorDescription: ""
	};
	_isMounted = false;

	// Makes a service call and sets servicesList.
	getNewData() {
		getServices(this.props.namespace)
			.then(result => {
				if (this._isMounted)
					this.setState({
						...this.state,
						pageLoading: false,
						servicesListSet: true,
						servicesList: result.payLoad
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

	componentDidMount() {
		this._isMounted = true;

		this.getNewData();
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	componentDidUpdate(previousProps) {
		// If namespace is changed, get new data.
		if (previousProps.namespace !== this.props.namespace) {
			if (this._isMounted)
				this.setState({
					...this.state,
					pageLoading: true,
					servicesListSet: false,
					servicesList: []
				});

			this.getNewData();
		}
	}

	render() {
		// If errorSet is set, render SmallErrorPage.
		if (this.state.errorSet)
			return (
				<SmallErrorPage
					errorDescription={this.state.errorDescription}
				/>
			);

		// If pageLoading is set, render SmallLoadingPage.
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
				{/* Map servicesList if it is set. */}
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
