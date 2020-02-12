import { API_LOCATION } from "../configs";

export function getNodes() {
	return new Promise((resolve, reject) => {
		fetch(API_LOCATION + "/nodes")
			.then(result => result.json())
			.then(result => {
				if (result.status === "FAILURE")
					reject({
						errorDescription:
							"Something went wrong while retrieving nodes!",
						errorSuggestions: [
							"Make sure the backend service is up and running.",
							"Make sure the endpoint being accessed is valid."
						]
					});
				resolve(result);
			})
			.catch(err => {
				console.log("Rejecting...");
				reject({
					errorDescription:
						"Something went wrong while retrieving nodes!",
					errorSuggestions: [
						"Make sure the backend service is up and running.",
						"Make sure the Kubernetes cluster is setup properly."
					]
				});
			});
	});
}
