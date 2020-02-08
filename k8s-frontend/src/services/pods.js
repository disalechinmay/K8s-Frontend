import { API_LOCATION } from "../configs";

export function getPods(namespace) {
	return new Promise(resolve => {
		fetch(API_LOCATION + "/pods?" + new URLSearchParams({ namespace }))
			.then(result => result.json())
			.then(result => resolve(result));
	});
}
