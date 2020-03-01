export { getNamespaces } from "./namespaces";
export { getNodes } from "./nodes";
export { getPods, deletePod, getPodExposure } from "./pods";
export { getDeployments, getDeployment, patchDeployment } from "./deployments";
export { getServices } from "./services";
export { getJobs } from "./jobs";
export { getConfigMaps, createConfigMap, deleteConfigMap } from "./configmaps";
export {
	getSecrets,
	getSecret,
	patchSecret,
	createSecret,
	deleteSecret
} from "./secrets";
