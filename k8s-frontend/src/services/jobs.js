import { API_LOCATION } from "../configs";
import axios from "axios";

// Makes a call to the backend and returns a list of jobs in a namespace.
export function getJobs(namespace) {
	return new Promise((resolve, reject) => {
		axios
			.get(API_LOCATION + "/jobs", {
				params: { namespace }
			})
			.then(result => result.data)
			.then(result => {
				if (result.status === "FAILURE")
					reject({
						errorDescription:
							"Something went wrong while retrieving jobs for '" +
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
						"Something went wrong while retrieving jobs for '" +
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

// Makes a call to the backend and deletes a job in a namespace.
export function deleteJob(namespace, jobName) {
	console.log(namespace);
	return new Promise((resolve, reject) => {
		axios
			.delete(API_LOCATION + "/job", {
				data: {
					namespace,
					jobName
				}
			})
			.then(result => result.data)
			.then(result => resolve(result))
			.catch(error =>
				reject({
					errorDescription:
						"Something went wrong while deleting job with name " +
						jobName +
						" in '" +
						namespace +
						"' namespace!",
					errorSuggestions: [
						"Make sure the backend service is up and running.",
						"Make sure the namespace is correct.",
						"Make sure the job name is correct."
					]
				})
			);
	});
}
