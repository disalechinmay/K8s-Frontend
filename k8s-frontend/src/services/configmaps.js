import { API_LOCATION } from "../configs";
import axios from "axios";

// Makes a call to the backend and returns a list of config maps in a namespace.
export function getConfigMaps(namespace) {
	return new Promise((resolve, reject) => {
		axios
			.get(API_LOCATION + "/configmaps", {
				params: { namespace }
			})
			.then(result => result.data)
			.then(result => {
				if (result.status === "FAILURE")
					reject({
						errorDescription:
							"Something went wrong while retrieving config maps for '" +
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
						"Something went wrong while retrieving configMaps for '" +
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

// Makes a call to the backend and creates the target resource.
export function createConfigMap(namespace, resourceName, data) {
	return new Promise((resolve, reject) => {
		axios
			.post(API_LOCATION + "/configmap", {
				namespace,
				configMapName: resourceName,
				configMapData: data
			})
			.then(result => result.data)
			.then(result => {
				if (result.status === "FAILURE")
					reject({
						rawError: result.payLoad,
						errorDescription:
							"Something went wrong while creating config map '" +
							resourceName +
							"'' of '" +
							namespace +
							"' namespace!",
						errorSuggestions: [
							"Make sure the backend service is up and running.",
							"Make sure the endpoint being accessed is valid.",
							"Make sure target resource name and namespace is valid.",
							"Make sure the config map body is valid."
						]
					});
				resolve(result);
			})
			.catch(error =>
				reject({
					rawError: error,
					errorDescription:
						"Something went wrong while creating config map '" +
						resourceName +
						"' of '" +
						namespace +
						"' namespace!",
					errorSuggestions: [
						"Make sure the backend service is up and running.",
						"Make sure the endpoint being accessed is valid.",
						"Make sure target resource name and namespace is valid.",
						"Make sure the config map body is valid."
					]
				})
			);
	});
}

// Makes a call to the backend and deletes the target resource.
export function deleteConfigMap(namespace, resourceName) {
	return new Promise((resolve, reject) => {
		axios
			.delete(API_LOCATION + "/configmap", {
				data: {
					namespace,
					configMapName: resourceName
				}
			})
			.then(result => result.data)
			.then(result => {
				if (result.status === "FAILURE")
					reject({
						rawError: result.payLoad,
						errorDescription:
							"Something went wrong while deleting config map '" +
							resourceName +
							"'' of '" +
							namespace +
							"' namespace!",
						errorSuggestions: [
							"Make sure the backend service is up and running.",
							"Make sure the endpoint being accessed is valid.",
							"Make sure target resource name and namespace is valid."
						]
					});
				resolve(result);
			})
			.catch(error =>
				reject({
					rawError: error,
					errorDescription:
						"Something went wrong while deleting config map '" +
						resourceName +
						"' of '" +
						namespace +
						"' namespace!",
					errorSuggestions: [
						"Make sure the backend service is up and running.",
						"Make sure the endpoint being accessed is valid.",
						"Make sure target resource name and namespace is valid."
					]
				})
			);
	});
}
