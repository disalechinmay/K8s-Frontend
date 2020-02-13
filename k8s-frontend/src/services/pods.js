import { API_LOCATION } from "../configs";

export function getPods(namespace) {
	return new Promise((resolve, reject) => {
		fetch(API_LOCATION + "/pods/?" + new URLSearchParams({ namespace }))
			.then(result => result.json())
			.then(result => resolve(result))
			.catch(err => reject());
	});
}

export function deletePod(namespace, podName) {
	return new Promise((resolve, reject) => {
		fetch(API_LOCATION + "/pods/", {
			method: "DELETE",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ namespace, podName })
		});
	});
}
