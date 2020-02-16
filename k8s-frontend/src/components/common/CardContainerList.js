import React, { Component } from "react";

class CardContainerList extends Component {
	render() {
		return (
			<React.Fragment>
				{this.props.list.map((val, index) => {
					return (
						<React.Fragment key={index + "_CONTAINER_CARD"}>
							<span className="flex flex-row">
								<span className="lighter">
									Container #{index + 1}:
								</span>
								&emsp;
								<span className="bolder">{val}</span>
							</span>
						</React.Fragment>
					);
				})}
			</React.Fragment>
		);
	}
}

export default CardContainerList;
