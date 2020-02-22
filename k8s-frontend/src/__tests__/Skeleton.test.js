import React from "react";
import { mount } from "enzyme";
import renderer from "react-test-renderer";
import toJson from "enzyme-to-json";
import { PAGE_LOAD_LIMIT_TIME } from "../configs";
import Skeleton from "../components/Skeleton.js";

describe("Skeleton Tests", () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(<Skeleton />);
	});

	test("Check if loading page is being rendered initially.", () => {
		expect(wrapper.find("LoadingPage").exists()).toBeTruthy();
	});

	test("Check if sidebar title contains text 'Symphonize'", async () => {
		// Waits for 2 second(s) and then updates the wrapper
		await new Promise(resolve => setTimeout(resolve, PAGE_LOAD_LIMIT_TIME));
		wrapper.update();

		expect(wrapper.find(".sidebar-title").exists()).toBeTruthy();
		expect(wrapper.find(".sidebar-title").text()).toBe("Symphonize");
	});

	test("Check if clicks on sidebar buttons change state appropriately.", async () => {
		// Waits for PAGE_LOAD_LIMIT_TIME second(s) and then updates the wrapper
		await new Promise(resolve => setTimeout(resolve, PAGE_LOAD_LIMIT_TIME));
		wrapper.update();

		expect(wrapper.state("sidebarOptionSelected")).toBe(0);

		let buttonsToCheck = [
			{ id: "#nodes_sidebarOption", value: 1 },
			{ id: "#pods_sidebarOption", value: 2 },
			{ id: "#deployments_sidebarOption", value: 3 },
			{ id: "#services_sidebarOption", value: 4 },
			{ id: "#jobs_sidebarOption", value: 5 },
			{ id: "#cronJobs_sidebarOption", value: 6 },
			{ id: "#configMaps_sidebarOption", value: 7 },
			{ id: "#secrets_sidebarOption", value: 8 }
		];

		for (let button of buttonsToCheck) {
			wrapper.find(button.id).simulate("click");
			wrapper.update();
			expect(wrapper.state("sidebarOptionSelected")).toBe(button.value);
		}
	});

	test("Check if namespace selector works.", async () => {
		await new Promise(resolve => setTimeout(resolve, PAGE_LOAD_LIMIT_TIME));
		wrapper.update();

		expect(wrapper.state("namespaceSelected")).toBe("default");
		wrapper
			.find(".namespace-selector")
			.at(0)
			.simulate("change", { target: { value: "a" } });
		expect(wrapper.state("namespaceSelected")).toBe("a");
	});

	test("Check if renderSearchPage() works.", async () => {
		await new Promise(resolve => setTimeout(resolve, PAGE_LOAD_LIMIT_TIME));
		wrapper.update();

		wrapper.instance().renderSearchPage();
		expect(wrapper.state("sidebarOptionSelected")).toBe(9);
	});

	test("Check if sendTokens() works.", async () => {
		await new Promise(resolve => setTimeout(resolve, PAGE_LOAD_LIMIT_TIME));
		wrapper.update();

		wrapper.instance().sendTokens(["1", "2"]);
		expect(wrapper.state("searchTokens")).toStrictEqual(["1", "2"]);
	});

	test("Check if ErrorPage renders when errorSet is true.", async () => {
		await new Promise(resolve => setTimeout(resolve, PAGE_LOAD_LIMIT_TIME));
		wrapper.update();

		wrapper.setState({
			...wrapper.state(),
			errorSet: true,
			errorDescription: {
				errorDescription:
					"Something went wrong while retrieving namespaces!",
				errorSuggestions: [
					"Make sure the backend service is up and running.",
					"Make sure the endpoint being accessed is valid."
				]
			}
		});

		wrapper.update();
		expect(wrapper.find("ErrorPage").exists()).toBeTruthy();
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	test("Check if loading page renders correctly.", () => {
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	test("Check if skeleton renders correctly.", async () => {
		await new Promise(resolve => setTimeout(resolve, PAGE_LOAD_LIMIT_TIME));
		wrapper.update();

		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
