import { mount } from "enzyme";
import React from "react";
import toJson from "enzyme-to-json";
import { NodesPage } from "../../components/NodesPage";
import { getNodes } from "../../services";
import { PAGE_LOAD_LIMIT_TIME } from "../../configs";

jest.mock("../../services");

describe("NodesPage Tests", () => {
	test("Check if SmallLoadingPage renders", () => {
		getNodes.mockImplementationOnce(() => Promise.resolve());

		let wrapper = mount(<NodesPage />);
		expect(wrapper.find("SmallLoadingPage").exists()).toBeTruthy();
	});

	test("Reject getNodes service call.", async () => {
		getNodes.mockImplementationOnce(() => Promise.reject());

		let wrapper = mount(<NodesPage />);
		await new Promise(resolve => setTimeout(resolve, PAGE_LOAD_LIMIT_TIME));
		wrapper.update();

		expect(wrapper.state("errorSet")).toBeTruthy();
		expect(wrapper.find("SmallErrorPage").exists()).toBeTruthy();
	});

	test("Resolve getNodes service call with non empty payload.", async () => {
		getNodes.mockImplementationOnce(() =>
			Promise.resolve({
				payLoad: [
					{
						nodeAnnotations: {
							"kubeadm.alpha.kubernetes.io/cri-socket":
								"/var/run/dockershim.sock",
							"node.alpha.kubernetes.io/ttl": "0",
							"volumes.kubernetes.io/controller-managed-attach-detach":
								"true"
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
					}
				],
				status: "SUCCESS",
				statusDetails: "Returning data from /nodes endpoint."
			})
		);

		let wrapper = mount(<NodesPage />);
		await new Promise(resolve => setTimeout(resolve, PAGE_LOAD_LIMIT_TIME));
		wrapper.update();

		expect(wrapper.state("errorSet")).toBeFalsy();
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	test("Resolve getNodes service call with empty payload.", async () => {
		getNodes.mockImplementationOnce(() =>
			Promise.resolve({
				payLoad: [],
				status: "SUCCESS",
				statusDetails: "Returning data from /nodes endpoint."
			})
		);

		let wrapper = mount(<NodesPage />);
		await new Promise(resolve => setTimeout(resolve, PAGE_LOAD_LIMIT_TIME));
		wrapper.update();

		expect(wrapper.state("errorSet")).toBeFalsy();
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
