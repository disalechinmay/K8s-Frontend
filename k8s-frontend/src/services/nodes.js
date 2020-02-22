import { API_LOCATION } from "../configs";
import axios from "axios";

// Makes a call to the backend and returns a list of nodes.
export function getNodes() {
	return new Promise((resolve, reject) => {
		axios
			.get(API_LOCATION + "/nodes")
			.then(result => result.data)
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
			.catch(error => {
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
