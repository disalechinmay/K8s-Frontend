import { getJobs } from "../../services";
import axios from "axios";
jest.mock("axios");

describe("Jobs Service Tests: getJobs", () => {
	let functionToTest = getJobs;
	let testLabel = "getJobs()";
	let namespace = "namespace";

	test(testLabel + ": Check if resolves to mock data.", () => {
		// Make axios.get to return mock data.
		axios.get.mockImplementationOnce(() =>
			Promise.resolve({
				data: {
					payLoad: "Dummy payLoad",
					status: "SUCCESS"
				}
			})
		);

		return expect(functionToTest(namespace)).resolves.toEqual({
			payLoad: "Dummy payLoad",
			status: "SUCCESS"
		});
	});

	test(
		testLabel + ": Check if promise rejects when status is FAILURE.",
		() => {
			// Make axios.get to return mock data.
			axios.get.mockImplementationOnce(() =>
				Promise.resolve({
					data: {
						payLoad: null,
						status: "FAILURE"
					}
				})
			);

			return expect(functionToTest(namespace)).rejects.toEqual({
				errorDescription:
					"Something went wrong while retrieving jobs for '" +
					namespace +
					"' namespace!",
				errorSuggestions: [
					"Make sure the backend service is up and running.",
					"Make sure the endpoint being accessed is valid."
				]
			});
		}
	);

	test(testLabel + ": Check rejection.", () => {
		// Make axios.get to return mock data.
		axios.get.mockImplementationOnce(() => Promise.reject());

		return expect(functionToTest(namespace)).rejects.toEqual({
			errorDescription:
				"Something went wrong while retrieving jobs for '" +
				namespace +
				"' namespace!",
			errorSuggestions: [
				"Make sure the backend service is up and running.",
				"Make sure the namespace is correct."
			]
		});
	});
});
