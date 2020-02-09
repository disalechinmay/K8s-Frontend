import { API_LOCATION } from "../configs";

export function getNamespaces() {
	return new Promise((resolve, reject) => {
		fetch(API_LOCATION + "/namespaces")
			.then(result => result.json())
			.then(result => resolve(result))
			.catch(err => reject());
	});
}
