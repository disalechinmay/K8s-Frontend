export { getNamespaces } from "./namespaces";
export { getNodes } from "./nodes";
export {
	getPods,
	getPod,
	deletePod,
	getPodExposure,
	createPod,
	patchPod
} from "./pods";
export { getDeployments, getDeployment, patchDeployment } from "./deployments";
export { getServices, getService, patchService } from "./services";
export { getJobs } from "./jobs";
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
