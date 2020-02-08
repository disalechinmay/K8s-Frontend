import { API_LOCATION } from "../configs";

export function getNodes() {
	return new Promise(resolve => {
		fetch(API_LOCATION + "/nodes")
			.then(result => result.json())
			.then(result => resolve(result));
	});
}
