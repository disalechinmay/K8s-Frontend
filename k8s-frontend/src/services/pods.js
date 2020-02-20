import { API_LOCATION } from "../configs";
import axios from "axios";

export function getPods(namespace) {
	return new Promise((resolve, reject) => {
		axios
			.get(API_LOCATION + "/pods", {
				params: { namespace }
			})
			.then(result => result.data)
			.then(result => {
				if (result.status === "FAILURE")
					reject({
						errorDescription:
							"Something went wrong while retrieving pods for '" +
							namespace +
							"' namespace!",
						errorSuggestions: [
							"Make sure the backend service is up and running.",
							"Make sure the endpoint being accessed is valid."
						]
					});
				resolve(result);
			})
			.catch(err =>
				reject({
					errorDescription:
						"Something went wrong while retrieving pods for '" +
						namespace +
						"' namespace!",
					errorSuggestions: [
						"Make sure the backend service is up and running.",
						"Make sure the namespace is correct."
					]
				})
			);
	});
}

export function deletePod(namespace, podName) {
	return new Promise((resolve, reject) => {
		fetch(API_LOCATION + "/pods/", {
			method: "DELETE",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ namespace, podName })
		}).then(() => {
			// let iters = 0;
			// while (iters != 1000) {
			// 	iters++;
			// 	console.log("Inside loop");
			// 	getPods("default").then(result => {
			// 		console.log(result.payLoad);
			// 	});
			// }
		});
	});
}

export function getPodExposure(namespace, podName) {
	return new Promise((resolve, reject) => {
		axios
			.get(API_LOCATION + "/pods/exposure", {
				params: { namespace, podName }
			})
			.then(result => result.data)
			.then(result => {
				if (result.status === "FAILURE")
					reject({
						errorDescription:
							"Something went wrong while retrieving pod exposure for pod '" +
							podName +
							"' '" +
							namespace +
							"' namespace!",
						errorSuggestions: [
							"Make sure the backend service is up and running.",
							"Make sure the endpoint being accessed is valid."
						]
					});
				resolve(result);
			})
			.catch(err =>
				reject({
					errorDescription:
						"Something went wrong while retrieving pod exposure for pod '" +
						podName +
						"' '" +
						namespace +
						"' namespace!",
					errorSuggestions: [
						"Make sure the backend service is up and running.",
						"Make sure the namespace is correct."
					]
				})
			);
	});
}
