import { createLocalVue, shallowMount } from "@vue/test-utils";
import App from "@/App.vue";

describe("TaskList.vue", () => {
  it("renders backlog tasks", async () => {
    const localVue = createLocalVue();
    const wrapper = shallowMount(App, { localVue });
  });
});
