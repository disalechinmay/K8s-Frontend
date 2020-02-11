import { mount } from "enzyme";
import Skeleton from "../components/Skeleton";
import React from "react";

describe("Skeleton Tests", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Skeleton />);
  });

  test("Check if loading page is working.", () => {
    console.log(wrapper.debug());
    expect(wrapper.find("LoadingPage").exists()).toBeTruthy();
  });

  test("PERFORMANCE CHECK: Check if page load happens under 2 second(s)", async () => {
    // Waits for 2 second(s) and then updates the wrapper
    await new Promise(r => setTimeout(r, 2000));
    wrapper.update();

    expect(wrapper.find("LoadingPage").exists()).toBeFalsy();
  });

  test("Check if NavbarBrand contains text 'Symphonize'", async () => {
    // Waits for 2 second(s) and then updates the wrapper
    await new Promise(r => setTimeout(r, 2000));
    wrapper.update();

    expect(wrapper.find("NavbarBrand").exists()).toBeTruthy();
    expect(wrapper.find("NavbarBrand").text()).toBe("Symphonize");
  });

  test("Check if clicks on sidebar buttons change state appropriately.", async () => {
    // Waits for 2 second(s) and then updates the wrapper
    await new Promise(r => setTimeout(r, 2000));
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
    await new Promise(r => setTimeout(r, 2000));
    wrapper.update();

    expect(wrapper.state("namespaceSelected")).toBe("default");
    wrapper
      .find(".namespace-selector")
      .at(0)
      .simulate("change", { target: { value: "a" } });
    expect(wrapper.state("namespaceSelected")).toBe("a");
  });
});
