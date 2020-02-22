import { mount } from "enzyme";
import React from "react";
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

		nodeInfo = { nodeName: "NODE1", nodeCapacity: "String" };
		wrapper = mount(<NodeCard nodeInfo={nodeInfo} />);
		expect(wrapper.isEmptyRender()).toBe(true);
	});

	// Checks if everything renders if nodeInfo prop is valid.
	test("Check if everything renders if nodeInfo prop is valid", () => {
		let nodeInfo = {
			nodeName: "NODE_NAME",
			nodeCapacity: {
				"ephemeral-storage": "NODE_CAPACITY.EPHEMERAL-STORAGE",
				cpu: "NODE_CAPACITY.CPU",
				memory: "NODE_CAPACITY.MEMORY",
				pods: "NODE_CAPACITY.PODS"
			}
		};

		let wrapper = mount(<NodeCard nodeInfo={nodeInfo} />);
		expect(wrapper.isEmptyRender()).toBe(false);
		expect(wrapper.find(".card").text()).toContain("NODE_NAME");
		expect(wrapper.find(".card").text()).toContain(
			"NODE_CAPACITY.EPHEMERAL-STORAGE"
		);
		expect(wrapper.find(".card").text()).toContain("NODE_CAPACITY.CPU");
		expect(wrapper.find(".card").text()).toContain("NODE_CAPACITY.MEMORY");
		expect(wrapper.find(".card").text()).toContain("NODE_CAPACITY.PODS");
	});
});
