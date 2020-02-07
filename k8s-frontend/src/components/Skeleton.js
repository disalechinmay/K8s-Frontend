import React, { Component } from "react";
import {
	Button,
	Container,
	Nav,
	Navbar,
	Form,
	FormControl,
	Row,
	Col
} from "react-bootstrap";
import "../assets/styles/common.css";

class Skeleton extends Component {
	render() {
		return (
			<React.Fragment>
				<Container className="margin-top-10">
					<Container>
						<Navbar>
							<Navbar.Brand href="#home">
								App title goes here
							</Navbar.Brand>
							<Navbar.Toggle />
							<Navbar.Collapse className="justify-content-end">
								<Navbar.Text>
									Signed in as: <a href="#login">Mark Otto</a>
								</Navbar.Text>
							</Navbar.Collapse>
						</Navbar>

						<hr />
						<Row>
							<Col className="right-border bottom-border">
								<div className="sidebar">
									<a
										className="active rounded-corners margin-top-10"
										href="#home"
									>
										Nodes
									</a>
									<a
										className="rounded-corners  margin-top-10"
										href="#news"
									>
										Pods
									</a>
									<a
										className="rounded-corners  margin-top-10"
										href="#contact"
									>
										Deployments
									</a>
									<a
										className="rounded-corners  margin-top-10"
										href="#about"
									>
										Services
									</a>
									<a
										className="rounded-corners  margin-top-10"
										href="#about"
									>
										Jobs
									</a>
									<a
										className="rounded-corners margin-top-10"
										href="#about"
									>
										Cron Jobs
									</a>
									<a
										className="rounded-corners margin-top-10"
										href="#about"
									>
										Config Maps
									</a>
									<a
										className="rounded-corners margin-top-10"
										href="#about"
									>
										Secrets
									</a>
								</div>
							</Col>
							<Col xs={9} className="margin-top-10">
								Main Content
							</Col>
						</Row>
					</Container>
				</Container>
			</React.Fragment>
		);
	}
}

export default Skeleton;
