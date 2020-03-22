import { API_LOCATION } from "../configs";
import axios from "axios";

// Makes a call to the backend and returns a list of cronJobs in a namespace.
export function getCronJobs(namespace) {
	return new Promise((resolve, reject) => {
		axios
			.get(API_LOCATION + "/cronjobs", {
				params: { namespace }
			})
			.then(result => result.data)
			.then(result => {
				if (result.status === "FAILURE")
					reject({
						errorDescription:
							"Something went wrong while retrieving cron cronJobs for '" +
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
						"Something went wrong while retrieving cron cronJobs for '" +
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

// Makes a call to the backend and returns a list of cron job in a namespace.
export function getCronJob(namespace, cronJobName) {
	return new Promise((resolve, reject) => {
		axios
			.get(API_LOCATION + "/cronjob", {
				params: { namespace, cronJobName }
			})
			.then(result => result.data)
			.then(result => {
				if (result.status === "FAILURE")
					reject({
						errorDescription:
							"Something went wrong while retrieving cron job for '" +
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
						"Something went wrong while retrieving cron job for '" +
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

// Makes a call to the backend and deletes a cron cronJob in a namespace.
export function deleteCronJob(namespace, cronJobName) {
	console.log(namespace);
	return new Promise((resolve, reject) => {
		axios
			.delete(API_LOCATION + "/cronjob", {
				data: {
					namespace,
					cronJobName
				}
			})
			.then(result => result.data)
			.then(result => resolve(result))
			.catch(error =>
				reject({
					errorDescription:
						"Something went wrong while deleting cron cronJob with name " +
						cronJobName +
						" in '" +
						namespace +
						"' namespace!",
					errorSuggestions: [
						"Make sure the backend service is up and running.",
						"Make sure the namespace is correct.",
						"Make sure the cron Job name is correct."
					]
				})
			);
	});
}

// Makes a call to the backend and patches the target resource.
export function patchCronJob(namespace, resourceName, body) {
	return new Promise((resolve, reject) => {
		axios
			.patch(API_LOCATION + "/cronjob", {
				namespace,
				cronJobName: resourceName,
				body
			})
			.then(result => result.data)
			.then(result => {
				if (result.status === "FAILURE")
					reject({
						rawError: result.payLoad,
						errorDescription:
							"Something went wrong while patching cronJob '" +
							resourceName +
							"'' of '" +
							namespace +
							"' namespace!",
						errorSuggestions: [
							"Make sure the backend service is up and running.",
							"Make sure the endpoint being accessed is valid.",
							"Make sure target resource name and namespace is valid.",
							"Make sure the updated cronJob body is valid."
						]
					});
				resolve(result);
			})
			.catch(error =>
				reject({
					rawError: error,
					errorDescription:
						"Something went wrong while patching cronJob '" +
						resourceName +
						"' of '" +
						namespace +
						"' namespace!",
					errorSuggestions: [
						"Make sure the backend service is up and running.",
						"Make sure the endpoint being accessed is valid.",
						"Make sure target resource name and namespace is valid.",
						"Make sure the updated cronJob body is valid."
					]
				})
			);
	});
}

// Makes a call to the backend and creates the target resource.
export function createCronJob(
	namespace,
	resourceName,
	cronJobImage,
	cronJobSchedule
) {
	return new Promise((resolve, reject) => {
		axios
			.post(API_LOCATION + "/cronjob", {
				namespace,
				cronJobName: resourceName,
				cronJobImage,
				cronJobSchedule
			})
			.then(result => result.data)
			.then(result => {
				if (result.status === "FAILURE")
					reject({
						rawError: result.payLoad,
						errorDescription:
							"Something went wrong while creating cron job '" +
							resourceName +
							"'' of '" +
							namespace +
							"' namespace!",
						errorSuggestions: [
							"Make sure the backend service is up and running.",
							"Make sure the endpoint being accessed is valid.",
							"Make sure target resource name and namespace is valid.",
							"Make sure the cron job body is valid."
						]
					});
				resolve(result);
			})
			.catch(error =>
				reject({
					rawError: error,
					errorDescription:
						"Something went wrong while creating cron job '" +
						resourceName +
						"' of '" +
						namespace +
						"' namespace!",
					errorSuggestions: [
						"Make sure the backend service is up and running.",
						"Make sure the endpoint being accessed is valid.",
						"Make sure target resource name and namespace is valid.",
						"Make sure the cron job body is valid."
					]
				})
			);
	});
}
