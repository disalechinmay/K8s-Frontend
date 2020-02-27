import { getPods, deletePod, getPodExposure } from "../../services";
import axios from "axios";
jest.mock("axios");

describe("Pods Service Tests: getPods", () => {
	let functionToTest = getPods;
	let testLabel = "getPods()";
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
					"Something went wrong while retrieving pods for '" +
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
				"Something went wrong while retrieving pods for '" +
				namespace +
				"' namespace!",
			errorSuggestions: [
				"Make sure the backend service is up and running.",
				"Make sure the namespace is correct."
			]
		});
	});
});

// describe("Pods Service Tests: deletePod", () => {
// 	let functionToTest = deletePod;
// 	let testLabel = "deletePod()";
// 	let namespace = "namespace";
// 	let podName = "podName";

// 	test(testLabel + ": Check if resolves to mock data.", () => {
// 		// Make axios.get to return mock data.
// 		axios.post.mockImplementationOnce(() =>
// 			Promise.resolve({
// 				data: {
// 					payLoad: "Dummy payLoad",
// 					status: "SUCCESS"
// 				}
// 			})
// 		);

// 		return expect(functionToTest(namespace, podName)).resolves.toEqual({
// 			payLoad: "Dummy payLoad",
// 			status: "SUCCESS"
// 		});
// 	});

// 	test(testLabel + ": Check rejection.", () => {
// 		// Make axios.get to return mock data.
// 		axios.post.mockImplementationOnce(() => Promise.reject());

// 		return expect(functionToTest(namespace, podName)).rejects.toEqual({
// 			errorDescription:
// 				"Something went wrong while deleting pod with name " +
// 				podName +
// 				" in '" +
// 				namespace +
// 				"' namespace!",
// 			errorSuggestions: [
// 				"Make sure the backend service is up and running.",
// 				"Make sure the namespace is correct.",
// 				"Make sure the pod name is correct."
// 			]
// 		});
// 	});
// });

describe("Pods Service Tests: getPodExposure", () => {
	let functionToTest = getPodExposure;
	let testLabel = "getPodExposure()";
	let namespace = "namespace";
	let podName = "podName";

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

		return expect(functionToTest(namespace, podName)).resolves.toEqual({
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

			return expect(functionToTest(namespace, podName)).rejects.toEqual({
				errorDescription:
					"Something went wrong while retrieving exposure for pod '" +
					podName +
					"' of '" +
					namespace +
					"' namespace!",
				errorSuggestions: [
					"Make sure the backend service is up and running.",
					"Make sure the endpoint being accessed is valid.",
					"Make sure the pod name and namespace is valid."
				]
			});
		}
	);

	test(testLabel + ": Check rejection.", () => {
		// Make axios.get to return mock data.
		axios.get.mockImplementationOnce(() => Promise.reject());

		return expect(functionToTest(namespace, podName)).rejects.toEqual({
			errorDescription:
				"Something went wrong while retrieving exposure for pod '" +
				podName +
				"' of '" +
				namespace +
				"' namespace!",
			errorSuggestions: [
				"Make sure the backend service is up and running.",
				"Make sure the namespace is correct.",
				"Make sure the pod name and namespace is valid."
			]
		});
	});
});
