import { shallowMount } from "@vue/test-utils";
import PlayButton from "@/components/playButton.vue";

describe("PlayButton.vue", () => {
  it("render PlayButton", async () => {
    const wrapper = shallowMount(PlayButton, { 
      propsData: {
        circles: [
          { class: "track-outline", color: "white" },
          { class: "moving-outline", color: "#018EBA" },
        ]
      },
    });
    expect(wrapper.findAll("svg")).toHaveLength(2)
  });
});
