import React, { Component } from "react";
import { Button, Badge } from "react-bootstrap";

class CardLabels extends Component {
	render() {
		return (
			<React.Fragment>
				{this.props.labels &&
					Object.entries(this.props.labels).map(
						([key, val], index) => {
							return (
								<React.Fragment key={index + "_LABEL_FRAG"}>
									<Button
										variant={
											(this.props.matchedLabels &&
												this.props.matchedLabels.hasOwnProperty(
													key
												) &&
												val ===
													this.props.matchedLabels[
														key
													] &&
												"success") ||
											"secondary"
										}
										size="sm"
										className="mb-1 text-wrap"
										key={index + "_LABEL_BUTTON"}
									>
										{key}{" "}
										<Badge
											variant="light"
											key={index + "_LABEL_BADGE"}
											className="text-wrap"
										>
											{val}
										</Badge>
									</Button>
									&nbsp;&nbsp;
								</React.Fragment>
							);
						}
					)}
			</React.Fragment>
		);
	}
}

export default CardLabels;
