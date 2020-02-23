import { mount } from "enzyme";
import React from "react";
import toJson from "enzyme-to-json";
import { NodeCard } from "../../components/NodesPage";

describe("NodeCard Tests", () => {
	test("Check if NodeCard doesn't throw error when nodeInfo prop is not passed.", () => {
		let wrapper = mount(<NodeCard />);
		expect(wrapper.isEmptyRender()).toBe(true);
	});

	// Sends in broken nodeInfo prop.
	test("Check if NodeCard doesn't throw error when nodeInfo prop is broken.", () => {
		let nodeInfo = {};
		let wrapper = mount(<NodeCard nodeInfo={nodeInfo} />);
		expect(wrapper.isEmptyRender()).toBe(true);

		nodeInfo = { nodeName: {} };
		wrapper = mount(<NodeCard nodeInfo={nodeInfo} />);
		expect(wrapper.isEmptyRender()).toBe(true);

		nodeInfo = { nodeName: "NODE1" };
		wrapper = mount(<NodeCard nodeInfo={nodeInfo} />);
		expect(wrapper.isEmptyRender()).toBe(true);

		nodeInfo = { nodeName: "NODE1", nodeCapacity: "String" };
		wrapper = mount(<NodeCard nodeInfo={nodeInfo} />);
		expect(wrapper.isEmptyRender()).toBe(true);

		nodeInfo = { nodeName: "minikube", nodeCapacity: {} };
		wrapper = mount(<NodeCard nodeInfo={nodeInfo} />);
		expect(wrapper.isEmptyRender()).toBe(true);

		nodeInfo = { nodeName: "minikube", nodeCapacity: { cpu: 5 } };
		wrapper = mount(<NodeCard nodeInfo={nodeInfo} />);
		expect(wrapper.isEmptyRender()).toBe(true);

		nodeInfo = {
			nodeName: "minikube",
			nodeCapacity: { cpu: "5", memory: 5 }
		};
		wrapper = mount(<NodeCard nodeInfo={nodeInfo} />);
		expect(wrapper.isEmptyRender()).toBe(true);

		nodeInfo = {
			nodeName: "minikube",
			nodeCapacity: { cpu: "5", memory: "5", pods: 5 }
		};
		wrapper = mount(<NodeCard nodeInfo={nodeInfo} />);
		expect(wrapper.isEmptyRender()).toBe(true);

		nodeInfo = {
			nodeName: "minikube",
			nodeCapacity: { cpu: "5", memory: "5", pods: "5" }
		};
		wrapper = mount(<NodeCard nodeInfo={nodeInfo} />);
		expect(wrapper.isEmptyRender()).toBe(true);

		nodeInfo = {
			nodeName: "minikube",
			nodeCapacity: {
				cpu: "5",
				memory: "5",
				pods: "5",
				"ephemeral-storage": 5
			}
		};
		wrapper = mount(<NodeCard nodeInfo={nodeInfo} />);
		expect(wrapper.isEmptyRender()).toBe(true);
	});

	// Checks if everything renders if nodeInfo prop is valid.
	test("Check if everything renders if nodeInfo prop is valid", () => {
		let nodeInfo = {
			nodeAnnotations: {
				"kubeadm.alpha.kubernetes.io/cri-socket":
					"/var/run/dockershim.sock",
				"node.alpha.kubernetes.io/ttl": "0",
				"volumes.kubernetes.io/controller-managed-attach-detach": "true"
			},
			nodeCapacity: {
				cpu: "4",
				"ephemeral-storage": "34471692Ki",
				"hugepages-1Gi": "0",
				"hugepages-2Mi": "0",
				memory: "3963180Ki",
				pods: "110"
			},
			nodeLabels: {
				"beta.kubernetes.io/arch": "amd64",
				"beta.kubernetes.io/os": "linux",
				"kubernetes.io/arch": "amd64",
				"kubernetes.io/hostname": "minikube",
				"kubernetes.io/os": "linux",
				"node-role.kubernetes.io/master": ""
			},
			nodeName: "minikube"
		};

		let wrapper = mount(<NodeCard nodeInfo={nodeInfo} />);
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	test("Check if everything renders if nodeInfo prop is valid & showResourceType is set", () => {
		let nodeInfo = {
			nodeAnnotations: {
				"kubeadm.alpha.kubernetes.io/cri-socket":
					"/var/run/dockershim.sock",
				"node.alpha.kubernetes.io/ttl": "0",
				"volumes.kubernetes.io/controller-managed-attach-detach": "true"
			},
			nodeCapacity: {
				cpu: "4",
				"ephemeral-storage": "34471692Ki",
				"hugepages-1Gi": "0",
				"hugepages-2Mi": "0",
				memory: "3963180Ki",
				pods: "110"
			},
			nodeLabels: {
				"beta.kubernetes.io/arch": "amd64",
				"beta.kubernetes.io/os": "linux",
				"kubernetes.io/arch": "amd64",
				"kubernetes.io/hostname": "minikube",
				"kubernetes.io/os": "linux",
				"node-role.kubernetes.io/master": ""
			},
			nodeName: "minikube"
		};

		let wrapper = mount(
			<NodeCard nodeInfo={nodeInfo} showResourceType={true} />
		);
		expect(wrapper.find(".resource-type").exists()).toBeTruthy();
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
