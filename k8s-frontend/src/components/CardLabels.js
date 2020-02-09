import React, { Component } from "react";
import { Badge } from "react-bootstrap";

class CardLabels extends Component {
	render() {
		return (
			<React.Fragment>
				{this.props.labels &&
					Object.entries(this.props.labels).map(
						([key, val], index) => {
							return (
								<React.Fragment key={index + "_LABEL_FRAG"}>
									<Badge
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
											"light"
										}
										size="sm"
										className="mb-1 text-wrap"
										key={index + "_LABEL_BUTTON"}
									>
										{key}{" "}
										<Badge
											variant="dark"
											key={index + "_LABEL_BADGE"}
											className="text-wrap"
										>
											{val}
										</Badge>
									</Badge>
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
