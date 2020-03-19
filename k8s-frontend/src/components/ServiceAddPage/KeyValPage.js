import React, { Component } from "react";

class KeyValPage extends Component {
	state = { data: [] };
	resourceNameRef = React.createRef();

	componentDidMount() {
		this.setState({ ...this.state, data: this.props.resourceData });
	}

	addNewPair() {
		let newData = this.state.data;
		newData.push({ key: "exposed_port", value: "target_port" });

		this.setState({ ...this.state, data: newData });
	}

	updateKey(event, index) {
		console.log(index);
		let newData = this.state.data;
		newData[index].key = event.target.innerText;

		this.setState({ ...this.state, data: newData });
	}

	updateValue(event, index) {
		let newData = this.state.data;
		newData[index].value = event.target.innerText;

		this.setState({ ...this.state, data: newData });
	}

	render() {
		return (
			<React.Fragment>
				<span className="message">Enter your port mappings</span>
				<br />
				<span className="pairs">
					{this.state.data.map((pair, index) => {
						return (
							<span className="pair" key={index + "_PAIR"}>
								#{index}&emsp;
								<span
									className="key"
									contentEditable={true}
									suppressContentEditableWarning={true}
									onBlur={event =>
										this.updateKey(event, index)
									}
								>
									{pair.key}
								</span>
								&emsp;=>&emsp;
								<span
									className="value"
									contentEditable={true}
									suppressContentEditableWarning={true}
									onBlur={event =>
										this.updateValue(event, index)
									}
								>
									{pair.value}
								</span>
							</span>
						);
					})}
				</span>

				<span
					className="add-new-button"
					onClick={() => this.addNewPair()}
				>
					Add new mapping
				</span>

				<br />
				<br />
				<span>
					<span
						className="button-negative"
						onClick={async () => {
							await this.props.setResourceData(this.state.data);
							this.props.renderPreviousPage();
						}}
					>
						Back
					</span>
					&emsp;&emsp;
					<span
						className="button-positive"
						onClick={async () => {
							await this.props.setResourceData(this.state.data);
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

export default KeyValPage;
