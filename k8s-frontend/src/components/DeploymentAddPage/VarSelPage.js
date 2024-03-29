import React, { Component } from "react";
import { getConfigMaps, getSecrets } from "../../services";
import DataTable, { createTheme } from "react-data-table-component";
import ExpandableComponent from "./ExpandableComponent";

class VarSelPage extends Component {
	state = {
		pageLoading: true,
		configMapsListSet: false,
		configMapsList: [],
		secretsListSet: false,
		secretsList: [],
		resourceVars: [],
		errorSet: false,
		errorDescription: "",
		data: [],
		secretsData: []
	};

	_isMounted = false;

	// Makes a service call and sets configMapsList.
	getNewData() {
		// Get list of configMaps for the selected namespace.
		getConfigMaps(this.props.namespace)
			.then(result => {
				if (this._isMounted) {
					this.setState({
						...this.state,
						pageLoading: false,
						configMapsListSet: true,
						configMapsList: result.payLoad
					});

					let tempData = [];
					for (let configMap of this.state.configMapsList) {
						tempData.push({
							type: "configMap",
							title: configMap.configMapName,
							description: configMap.configMapData
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

		getSecrets(this.props.namespace)
			.then(result => {
				if (this._isMounted) {
					this.setState({
						...this.state,
						pageLoading: false,
						secretsListSet: true,
						secretsList: result.payLoad
					});

					let tempData = [];
					for (let secret of this.state.secretsList) {
						tempData.push({
							type: "secret",
							title: secret.secretName,
							description: secret.secretData
						});
					}

					this.setState({ ...this.state, secretsData: tempData });
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
				name: "Title",
				selector: "title",
				sortable: true,
				expandOnRowClicked: false,
				expandableRowExpanded: row => {
					console.log("YEET");
					console.log(row);
					return true;
				}
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
					Select the environment variables you wish to attach to this
					pod:
				</span>
				<br />

				<DataTable
					title="Config Maps"
					columns={this.columns}
					data={this.state.data}
					theme="dark"
					expandableRows
					expandableRowsComponent={
						<ExpandableComponent
							resourceVars={this.state.resourceVars}
							setResourceVars={data => {
								this.setState({
									...this.state,
									resourceVars: data
								});
								this.props.setResourceVars(data);
							}}
						/>
					}
					expandableRowExpanded={row => {
						for (let obj of this.state.resourceVars)
							if (row.title === obj.configMapName) return true;

						return false;
					}}
				/>

				<DataTable
					title="Secrets"
					columns={this.columns}
					data={this.state.secretsData}
					theme="dark"
					expandableRows
					expandableRowsComponent={
						<ExpandableComponent
							resourceVars={this.state.resourceVars}
							setResourceVars={data => {
								this.setState({
									...this.state,
									resourceVars: data
								});
								this.props.setResourceVars(data);
							}}
						/>
					}
					expandableRowExpanded={row => {
						for (let obj of this.state.resourceVars)
							if (row.title === obj.secretName) return true;

						return false;
					}}
				/>

				{/* Map configMapsList if it is set. */}
				{/* {this.state.configMapsListSet &&
					this.state.configMapsList.map((configMapInfo, index) => {
						return (
							<div className="pairs" key={index + "_FRAG"}>
								{Object.entries(
									configMapInfo.configMapData
								).map(([key, val], index) => {
									return (
										<div
											className="pair select"
											key={index + "_FRAG"}
										>
											<span
												className="key"
												onClick={event => {
													if (
														!event.target.classList.contains(
															"selected"
														)
													) {
														event.target.classList.add(
															"selected"
														);

														if (this._isMounted) {
															let resourceVars = this
																.state
																.resourceVars;
															resourceVars.push({
																configMapName:
																	configMapInfo.configMapName,
																variable: key
															});

															this.setState({
																...this.state,
																resourceVars
															});
														}

														this.props.setResourceVars(
															this.state
																.resourceVars
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
								})}
							</div>
						);
					})} */}
				<br />
				<span>
					<span
						className="button-negative"
						onClick={async () => {
							await this.props.setResourceVars(
								this.state.resourceVars
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
							await this.props.setResourceVars(
								this.state.resourceVars
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

export default VarSelPage;
