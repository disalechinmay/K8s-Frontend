import { API_LOCATION } from "../configs";

export function getJobs() {
	return new Promise((resolve, reject) => {
		fetch(API_LOCATION + "/jobs")
			.then(result => result.json())
			.then(result => resolve(result))
			.catch(err => reject());
	});
}
