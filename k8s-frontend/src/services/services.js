import { API_LOCATION } from "../configs";
import axios from "axios";

// Makes a call to the backend and returns a list of services in a namespace.
export function getServices(namespace) {
	return new Promise((resolve, reject) => {
		axios
			.get(API_LOCATION + "/servicesx", {
				params: { namespace }
			})
			.then(result => result.data)
			.then(result => {
				if (result.status === "FAILURE")
					reject({
						errorDescription:
							"Something went wrong while retrieving services for '" +
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
						"Something went wrong while retrieving services for '" +
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

// Makes a call to the backend and returns a service in a namespace.
export function getService(namespace, resourceName) {
	return new Promise((resolve, reject) => {
		axios
			.get(API_LOCATION + "/service", {
				params: { namespace, serviceName: resourceName }
			})
			.then(result => result.data)
			.then(result => {
				if (result.status === "FAILURE")
					reject({
						errorDescription:
							"Something went wrong while retrieving service for '" +
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
						"Something went wrong while retrieving service for '" +
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

// Makes a call to the backend and patches the target resource.
export function patchService(namespace, resourceName, body) {
	return new Promise((resolve, reject) => {
		axios
			.patch(API_LOCATION + "/service", {
				namespace,
				serviceName: resourceName,
				body
			})
			.then(result => result.data)
			.then(result => {
				if (result.status === "FAILURE")
					reject({
						rawError: result.payLoad,
						errorDescription:
							"Something went wrong while patching service '" +
							resourceName +
							"'' of '" +
							namespace +
							"' namespace!",
						errorSuggestions: [
							"Make sure the backend service is up and running.",
							"Make sure the endpoint being accessed is valid.",
							"Make sure target resource name and namespace is valid.",
							"Make sure the updated service body is valid."
						]
					});
				resolve(result);
			})
			.catch(error =>
				reject({
					rawError: error,
					errorDescription:
						"Something went wrong while patching service '" +
						resourceName +
						"' of '" +
						namespace +
						"' namespace!",
					errorSuggestions: [
						"Make sure the backend service is up and running.",
						"Make sure the endpoint being accessed is valid.",
						"Make sure target resource name and namespace is valid.",
						"Make sure the updated service body is valid."
					]
				})
			);
	});
}

// Makes a call to the backend and creates the target resource.
export function createService(
	namespace,
	resourceName,
	portMappings,
	targetDeployments,
	serviceType
) {
	return new Promise((resolve, reject) => {
		axios
			.post(API_LOCATION + "/service", {
				namespace,
				serviceName: resourceName,
				portMappings,
				targetDeployments,
				serviceType
			})
			.then(result => result.data)
			.then(result => {
				if (result.status === "FAILURE")
					reject({
						rawError: result.payLoad,
						errorDescription:
							"Something went wrong while creating service '" +
							resourceName +
							"'' of '" +
							namespace +
							"' namespace!",
						errorSuggestions: [
							"Make sure the backend service is up and running.",
							"Make sure the endpoint being accessed is valid.",
							"Make sure target resource name and namespace is valid.",
							"Make sure the service body is valid."
						]
					});
				resolve(result);
			})
			.catch(error =>
				reject({
					rawError: error,
					errorDescription:
						"Something went wrong while creating service '" +
						resourceName +
						"' of '" +
						namespace +
						"' namespace!",
					errorSuggestions: [
						"Make sure the backend service is up and running.",
						"Make sure the endpoint being accessed is valid.",
						"Make sure target resource name and namespace is valid.",
						"Make sure the service body is valid."
					]
				})
			);
	});
}

// Makes a call to the backend and deletes a service in a namespace.
export function deleteService(namespace, serviceName) {
	return new Promise((resolve, reject) => {
		axios
			.delete(API_LOCATION + "/service", {
				data: {
					namespace,
					serviceName
				}
			})
			.then(result => result.data)
			.then(result => resolve(result))
			.catch(error =>
				reject({
					errorDescription:
						"Something went wrong while service deployment with name " +
						serviceName +
						" in '" +
						namespace +
						"' namespace!",
					errorSuggestions: [
						"Make sure the backend service is up and running.",
						"Make sure the namespace is correct.",
						"Make sure the service name is correct."
					]
				})
			);
	});
}
