import { API_LOCATION } from "../configs";

export function getNamespaces() {
	return new Promise(resolve => {
		fetch(API_LOCATION + "/namespaces")
			.then(result => result.json())
			.then(result => resolve(result));
	});
}
