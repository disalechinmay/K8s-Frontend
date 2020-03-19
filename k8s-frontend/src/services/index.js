export { getNamespaces, createNamespace, deleteNamespace } from "./namespaces";
export { getNodes } from "./nodes";
export {
	getPods,
	getPod,
	deletePod,
	getPodExposure,
	createPod,
	patchPod
} from "./pods";
export {
	getDeployments,
	getDeployment,
	patchDeployment,
	createDeployment,
	deleteDeployment
} from "./deployments";
export { getServices, getService, patchService } from "./services";
export {
	getCronJobs,
	getCronJob,
	deleteCronJob,
	patchCronJob
} from "./cronjobs";
export { getJobs, deleteJob, getJob, patchJob } from "./jobs";
export {
	getConfigMaps,
	getConfigMap,
	patchConfigMap,
	createConfigMap,
	deleteConfigMap,
	replaceConfigMap
} from "./configmaps";
export {
	getSecrets,
	getSecret,
	patchSecret,
	replaceSecret,
	createSecret,
	deleteSecret
} from "./secrets";
