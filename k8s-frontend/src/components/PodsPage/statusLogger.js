let getPods = require("../../services/pods").getPods;
let API_LOCATION = require("../../configs/api").API_LOCATION;

while (true) {
	getPods(this.props.namespace).then(result => {
		for (let pod of result.payLoad)
			if (pod.podName === "app-deployment-66468ff749-cqd26")
				console.log(pod.podStatus);
	});
}
