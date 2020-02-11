import React, { Component } from "react";
import SmallLoadingPage from "../common/SmallLoadingPage";
import { getServices } from "../../services/services";
import "../../assets/styles/common.css";
import ServiceCard from "./ServicesCard";

class ServicesPage extends Component {
  state = { pageLoading: true, servicesListSet: false, servicesList: [] };
  constructor(props) {
    super(props);

    getServices(this.props.namespace).then(result => {
      let newState = { ...this.state };

      newState.pageLoading = false;
      newState.servicesListSet = true;
      newState.servicesList = result.payLoad;

      this.setState(newState);
    });
  }

  componentDidUpdate(previousProps) {
    // If namespace is changed, get new data.
    if (previousProps.namespace !== this.props.namespace) {
      this.setState({
        pageLoading: true,
        servicesListSet: false,
        servicesList: []
      });

      getServices(this.props.namespace).then(result => {
        let newState = { ...this.state };

        newState.pageLoading = false;
        newState.servicesListSet = true;
        newState.servicesList = result.payLoad;

        this.setState(newState);
      });
    }
  }

  render() {
    if (this.state.pageLoading) return <SmallLoadingPage />;

    if (
      this.state.pageLoading === false &&
      this.state.servicesListSet &&
      this.state.servicesList.length === 0
    )
      return (
        <React.Fragment>No services present in this namespace.</React.Fragment>
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
                  refreshState={() => this.props.refreshState()}
                />
              </React.Fragment>
            );
          })}
      </React.Fragment>
    );
  }
}

export default ServicesPage;
