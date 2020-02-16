import { API_LOCATION } from "../configs";
import axios from "axios";

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
