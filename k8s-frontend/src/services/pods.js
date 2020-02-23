import { API_LOCATION } from "../configs";
import axios from "axios";

// Makes a call to the backend and returns a list of pods in a namespace.
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
			.catch(error =>
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

// Makes a call to the backend and deletes a pod in a namespace.
export function deletePod(namespace, podName) {
	return new Promise((resolve, reject) => {
		axios
			.post(API_LOCATION + "/pods", {
				namespace,
				podName
			})
			.then(result => result.data)
			.then(result => resolve(result))
			.catch(error =>
				reject({
					errorDescription:
						"Something went wrong while deleting pod with name " +
						podName +
						" in '" +
						namespace +
						"' namespace!",
					errorSuggestions: [
						"Make sure the backend service is up and running.",
						"Make sure the namespace is correct.",
						"Make sure the pod name is correct."
					]
				})
			);
	});
}

// Makes a call to the backend and gets a pod's exposure.
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
			.catch(error =>
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
