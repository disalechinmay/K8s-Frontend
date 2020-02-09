import { API_LOCATION } from "../configs";

export function getDeployments(namespace) {
	return new Promise((resolve, reject) => {
		fetch(
			API_LOCATION + "/deployments/?" + new URLSearchParams({ namespace })
		)
			.then(result => result.json())
			.then(result => resolve(result))
			.catch(err => reject());
	});
}
