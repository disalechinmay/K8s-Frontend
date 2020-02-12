import React, { Component } from "react";

class ErrorPage extends Component {
	render() {
		return (
			<React.Fragment>
				<div className="d-flex align-items-center min-vh-100 mb-5 p-5">
					<div>
						<h1>OOPS!</h1>
						<hr />
						<span>Things seem to be broken a bit.</span>

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
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default ErrorPage;
