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

// Makes a call to the backend and returns a list of pods in a namespace.
export function getPod(namespace, podName) {
	return new Promise((resolve, reject) => {
		axios
			.get(API_LOCATION + "/pod", {
				params: { namespace, podName }
			})
			.then(result => result.data)
			.then(result => {
				if (result.status === "FAILURE")
					reject({
						errorDescription:
							"Something went wrong while retrieving pod for '" +
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
						"Something went wrong while retrieving pod for '" +
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
			.delete(API_LOCATION + "/pod", {
				data: {
					namespace,
					podName
				}
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
			.get(API_LOCATION + "/pod/exposure", {
				params: { namespace, podName }
			})
			.then(result => result.data)
			.then(result => {
				if (result.status === "FAILURE")
					reject({
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
				resolve(result);
			})
			.catch(error =>
				reject({
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
				})
			);
	});
}

// Makes a call to the backend and creates the target resource.
export function createPod(namespace, resourceName, podImage, podVars) {
	return new Promise((resolve, reject) => {
		axios
			.post(API_LOCATION + "/pod", {
				namespace,
				podName: resourceName,
				podImage,
				podVars
			})
			.then(result => result.data)
			.then(result => {
				if (result.status === "FAILURE")
					reject({
						rawError: result.payLoad,
						errorDescription:
							"Something went wrong while creating pod '" +
							resourceName +
							"'' of '" +
							namespace +
							"' namespace!",
						errorSuggestions: [
							"Make sure the backend service is up and running.",
							"Make sure the endpoint being accessed is valid.",
							"Make sure target resource name and namespace is valid.",
							"Make sure the pod body is valid."
						]
					});
				resolve(result);
			})
			.catch(error =>
				reject({
					rawError: error,
					errorDescription:
						"Something went wrong while creating pod '" +
						resourceName +
						"' of '" +
						namespace +
						"' namespace!",
					errorSuggestions: [
						"Make sure the backend service is up and running.",
						"Make sure the endpoint being accessed is valid.",
						"Make sure target resource name and namespace is valid.",
						"Make sure the pod body is valid."
					]
				})
			);
	});
}

// Makes a call to the backend and patches the target resource.
export function patchPod(namespace, resourceName, body) {
	return new Promise((resolve, reject) => {
		axios
			.patch(API_LOCATION + "/pod", {
				namespace,
				podName: resourceName,
				body
			})
			.then(result => result.data)
			.then(result => {
				if (result.status === "FAILURE")
					reject({
						rawError: result.payLoad,
						errorDescription:
							"Something went wrong while patching pod '" +
							resourceName +
							"'' of '" +
							namespace +
							"' namespace!",
						errorSuggestions: [
							"Make sure the backend service is up and running.",
							"Make sure the endpoint being accessed is valid.",
							"Make sure target resource name and namespace is valid.",
							"Make sure the updated pod body is valid."
						]
					});
				resolve(result);
			})
			.catch(error =>
				reject({
					rawError: error,
					errorDescription:
						"Something went wrong while patching pod '" +
						resourceName +
						"' of '" +
						namespace +
						"' namespace!",
					errorSuggestions: [
						"Make sure the backend service is up and running.",
						"Make sure the endpoint being accessed is valid.",
						"Make sure target resource name and namespace is valid.",
						"Make sure the updated pod body is valid."
					]
				})
			);
	});
}
