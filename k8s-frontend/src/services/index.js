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
export {
	getServices,
	getService,
	patchService,
	createService,
	deleteService
} from "./services";
export {
	getCronJobs,
	getCronJob,
	deleteCronJob,
	patchCronJob,
	createCronJob
} from "./cronjobs";
export { getJobs, deleteJob, getJob, patchJob, createJob } from "./jobs";
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
