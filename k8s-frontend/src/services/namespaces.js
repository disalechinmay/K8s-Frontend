import { API_LOCATION } from "../configs";
import axios from "axios";

// Makes a call to the backend and returns a list of namespaces.
export function getNamespaces() {
	return new Promise((resolve, reject) => {
		axios
			.get(API_LOCATION + "/namespaces")
			.then(result => result.data)
			.then(result => {
				if (result.status === "FAILURE")
					reject({
						errorDescription:
							"Something went wrong while retrieving namespaces!",
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
						"Something went wrong while retrieving namespaces!",
					errorSuggestions: [
						"Make sure the backend service is up and running."
					]
				})
			);
	});
}

export function createNamespace(namespace) {
	return new Promise((resolve, reject) => {
		axios
			.post(API_LOCATION + "/namespace", {
				namespace
			})
			.then(result => result.data)
			.then(result => {
				if (result.status === "FAILURE")
					reject({
						errorDescription:
							"Something went wrong while retrieving namespaces!",
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
						"Something went wrong while retrieving namespaces!",
					errorSuggestions: [
						"Make sure the backend service is up and running."
					]
				})
			);
	});
}

export function deleteNamespace(namespace) {
	return new Promise((resolve, reject) => {
		axios
			.delete(API_LOCATION + "/namespace", {
				data: {
					namespace
				}
			})
			.then(result => result.data)
			.then(result => {
				if (result.status === "FAILURE")
					reject({
						errorDescription:
							"Something went wrong while deleting namespace!",
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
						"Something went wrong while deleting namespace!",
					errorSuggestions: [
						"Make sure the backend service is up and running."
					]
				})
			);
	});
}
