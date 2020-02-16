import React, { Component } from "react";

class CardLabels extends Component {
	render() {
		return (
			<React.Fragment>
				{this.props.labels &&
					Object.entries(this.props.labels).map(
						([key, val], index) => {
							return (
								<React.Fragment key={index + "_LABEL_FRAG"}>
									<div className="label">
										{key}

										<span
											className={
												(this.props.matchedLabels &&
													this.props.matchedLabels.hasOwnProperty(
														key
													) &&
													val ===
														this.props
															.matchedLabels[
															key
														] &&
													"value-matched") ||
												"value"
											}
										>
											{val}
										</span>
									</div>
								</React.Fragment>
							);
						}
					)}
			</React.Fragment>
		);
	}
}

export default CardLabels;
