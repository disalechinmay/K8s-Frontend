import React, { Component } from "react";

class SmallErrorPage extends Component {
	state = {};
	render() {
		return (
			<React.Fragment>
				<div className="small-error-page">
					<div className="error-page-content">
						<h1 className="oops">OOPS!</h1>
						<span className="message">
							Things seem to be broken a bit.
						</span>

						{this.props.errorDescription && (
							<React.Fragment>
								<br />
								<br />
								<span className="font-weight-bold">
									Error:&nbsp;
								</span>
								<span>
									{
										this.props.errorDescription
											.errorDescription
									}
								</span>
								<br />
								<br />
								<span className="font-weight-bold">
									Suggestions:&nbsp;
								</span>
								<br />
								<span>
									{this.props.errorDescription.errorSuggestions.map(
										(suggestion, index) => {
											return (
												<React.Fragment
													key={
														index +
														"_SUGGESTION_FRAG"
													}
												>
													{suggestion}
													<br
														key={
															index +
															"_SUGGESTION"
														}
													/>
												</React.Fragment>
											);
										}
									)}
								</span>
							</React.Fragment>
						)}

						<span className="logo">Symphonize</span>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default SmallErrorPage;
