import { API_LOCATION } from "../configs";

export function getServices(namespace) {
	return new Promise((resolve, reject) => {
		fetch(API_LOCATION + "/services?" + new URLSearchParams({ namespace }))
			.then(result => result.json())
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
			.catch(err =>
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
