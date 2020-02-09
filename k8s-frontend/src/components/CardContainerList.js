import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";

class CardContainerList extends Component {
	render() {
		return (
			<React.Fragment>
				<ListGroup variant="flush">
					{this.props.list.map((val, index) => {
						return (
							<ListGroup.Item key={index + "_LG_ITEM"}>
								<span className="text-muted">
									Container #{index + 1}:
								</span>{" "}
								{val}
							</ListGroup.Item>
						);
					})}
				</ListGroup>
			</React.Fragment>
		);
	}
}

export default CardContainerList;
