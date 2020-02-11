import { API_LOCATION } from "../configs";

export function getServices(namespace) {
  return new Promise((resolve, reject) => {
    fetch(API_LOCATION + "/services/?" + new URLSearchParams({ namespace }))
      .then(result => result.json())
      .then(result => resolve(result))
      .catch(err => reject());
  });
}
