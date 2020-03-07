export { getNamespaces } from "./namespaces";
export { getNodes } from "./nodes";
export { getPods, getPod, deletePod, getPodExposure, createPod } from "./pods";
export { getDeployments, getDeployment, patchDeployment } from "./deployments";
export { getServices } from "./services";
export { getJobs } from "./jobs";
export { getConfigMaps, createConfigMap, deleteConfigMap } from "./configmaps";
export {
	getSecrets,
	getSecret,
	patchSecret,
	replaceSecret,
	createSecret,
	deleteSecret
} from "./secrets";
