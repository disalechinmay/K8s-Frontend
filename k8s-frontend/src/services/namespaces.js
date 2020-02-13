import { API_LOCATION } from "../configs";

export function getNamespaces() {
	return new Promise((resolve, reject) => {
		fetch(API_LOCATION + "/namespaces")
			.then(result => result.json())
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
			.catch(err =>
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
