import React, { Component } from "react";
import { getDeployments } from "../../services";
import DataTable, { createTheme } from "react-data-table-component";

class DeploymentSelectPage extends Component {
	state = {
		deploymentListSet: false,
		deploymentList: [],
		data: []
	};
	_isMounted = false;

	// Makes a service call and sets configMapsList.
	getNewData() {
		// Get list of configMaps for the selected namespace.
		getDeployments(this.props.namespace)
			.then(result => {
				if (this._isMounted) {
					this.setState({
						...this.state,
						deploymentListSet: true,
						deploymentList: result.payLoad
					});

					let tempData = [];
					for (let deployment of this.state.deploymentList) {
						tempData.push({
							deployment: deployment.deploymentName
						});
					}

					this.setState({ ...this.state, data: tempData });
				}
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
		this.columns = [
			{
				name: "Deployment",
				selector: "deployment",
				sortable: true,
				expandOnRowClicked: false
			}
		];
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		createTheme("dark", {
			text: {
				primary: "#FFFFFF",
				secondary: "rgba(255, 255, 255, 0.7)",
				disabled: "rgba(0,0,0,.12)"
			},
			background: {
				default: "transparent"
			},
			context: {
				background: "#065013",
				text: "#FFFFFF"
			},
			divider: {
				default: "rgba(81, 81, 81, 1)"
			},
			button: {
				default: "#FFFFFF",
				focus: "rgba(255, 255, 255, .54)",
				hover: "rgba(255, 255, 255, .12)",
				disabled: "rgba(0,0,0,.12)"
			},
			sortFocus: {
				default: "rgba(255, 255, 255, .54)"
			},
			selected: {
				default: "rgba(0, 0, 0, .7)",
				text: "#FFFFFF"
			},
			highlightOnHover: {
				default: "rgba(0, 0, 0, .7)",
				text: "#FFFFFF"
			},
			striped: {
				default: "rgba(0, 0, 0, .87)",
				text: "#FFFFFF"
			}
		});

		return (
			<React.Fragment>
				<span className="message">
					Select the deployments this service should target:
				</span>
				<br />
				<DataTable
					title="Deployments"
					columns={this.columns}
					data={this.state.data}
					theme="dark"
					selectableRows={true}
					selectableRowsHighlight={true}
					onSelectedRowsChange={data => {
						let tempData = [];
						for (let deployment of data["selectedRows"]) {
							tempData.push(deployment["deployment"]);
						}
						this.setState({
							...this.state,
							selectedDeployments: tempData
						});
						this.props.setTargetDeployments(tempData);
						return true;
					}}
					selectableRowSelected={row => {
						if (
							this.props.targetDeployments.includes(
								row.deployment
							)
						)
							return true;
						return false;
					}}
				/>

				<br />
				<span>
					<span
						className="button-negative"
						onClick={async () => {
							await this.props.setTargetDeployments(
								this.state.selectedDeployments
							);
							this.props.renderPreviousPage();
						}}
					>
						Back
					</span>
					&emsp;&emsp;
					<span
						className="button-positive"
						onClick={async () => {
							this.props.setTargetDeployments(
								this.state.selectedDeployments
							);
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

export default DeploymentSelectPage;
