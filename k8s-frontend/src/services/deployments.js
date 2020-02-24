import { API_LOCATION } from "../configs";
import axios from "axios";

// Makes a call to the backend and returns a list of deployments in a namespace.
export function getDeployments(namespace) {
	return new Promise((resolve, reject) => {
		axios
			.get(API_LOCATION + "/deployments", {
				params: { namespace }
			})
			.then(result => result.data)
			.then(result => {
				if (result.status === "FAILURE")
					reject({
						errorDescription:
							"Something went wrong while retrieving deployments for '" +
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
						"Something went wrong while retrieving deployments for '" +
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

// Makes a call to the backend and returns a deployment in a namespace.
export function getDeployment(namespace, resourceName) {
	return new Promise((resolve, reject) => {
		axios
			.get(API_LOCATION + "/deployment", {
				params: { namespace, resourceName }
			})
			.then(result => result.data)
			.then(result => {
				if (result.status === "FAILURE")
					reject({
						errorDescription:
							"Something went wrong while retrieving deployment for '" +
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
						"Something went wrong while retrieving deployment for '" +
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
export function patchDeployment(namespace, resourceName, body) {
	return new Promise((resolve, reject) => {
		axios
			.patch(API_LOCATION + "/deployment", {
				namespace,
				resourceName,
				body
			})
			.then(result => result.data)
			.then(result => {
				if (result.status === "FAILURE")
					reject({
						errorDescription:
							"Something went wrong while patching deployment " +
							resourceName +
							" of '" +
							namespace +
							"' namespace!",
						errorSuggestions: [
							"Make sure the backend service is up and running.",
							"Make sure the endpoint being accessed is valid.",
							"Make sure target resource name and namespace is valid.",
							"Make sure the updated deployment body is valid."
						]
					});
				resolve(result);
			})
			.catch(error =>
				reject({
					errorDescription:
						"Something went wrong while patching deployment " +
						resourceName +
						" of '" +
						namespace +
						"' namespace!",
					errorSuggestions: [
						"Make sure the backend service is up and running.",
						"Make sure the endpoint being accessed is valid.",
						"Make sure target resource name and namespace is valid.",
						"Make sure the updated deployment body is valid."
					]
				})
			);
	});
}
