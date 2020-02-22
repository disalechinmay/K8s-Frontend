import { getNamespaces } from "../../services";
import axios from "axios";
jest.mock("axios");

describe("Namespaces Service Tests", () => {
	test("Check if resolves to mock data.", () => {
		// Make axios.get to return mock data.
		axios.get.mockImplementationOnce(() =>
			Promise.resolve({
				data: {
					payLoad: "Dummy payLoad",
					status: "SUCCESS"
				}
			})
		);

		return expect(getNamespaces()).resolves.toEqual({
			payLoad: "Dummy payLoad",
			status: "SUCCESS"
		});
	});

	test("Check if promise rejects when status is FAILURE.", () => {
		// Make axios.get to return mock data.
		axios.get.mockImplementationOnce(() =>
			Promise.resolve({
				data: {
					payLoad: null,
					status: "FAILURE"
				}
			})
		);

		return expect(getNamespaces()).rejects.toEqual({
			errorDescription:
				"Something went wrong while retrieving namespaces!",
			errorSuggestions: [
				"Make sure the backend service is up and running.",
				"Make sure the endpoint being accessed is valid."
			]
		});
	});

	test("Check rejection.", () => {
		// Make axios.get to return mock data.
		axios.get.mockImplementationOnce(() => Promise.reject());

		return expect(getNamespaces()).rejects.toEqual({
			errorDescription:
				"Something went wrong while retrieving namespaces!",
			errorSuggestions: [
				"Make sure the backend service is up and running."
			]
		});
	});
});
