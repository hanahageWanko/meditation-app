<template>
  <span>
    <img
      src="/static/svg/play.svg"
      alt="play"
      class="play"
      @click="emitPlay()"
    />
    <svg
      v-for="(circle, index) of circles"
      :key="`${circle.class}-${index}`"
      :class="circle.class"
      viewBox="0 0 453 453"
      fill="none"
    >
      <circle
        :ref="circle.class"
        cx="226.5"
        cy="226.5"
        r="216.5"
        :stroke="circle.color"
        stroke-width="20"
      />
    </svg>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from "vue-property-decorator";

@Component
export default class PlayButton extends Vue {
  @Prop()
  public circles!: {
    class: string;
    color: string;
  }[]

  public emitPlay() {
    return this.$emit("playEvent");
  }
}
</script>

<style scoped>
.play {
  width: 90px;
  margin-top: -45px;
  margin-left: -45px;
  z-index: 10;
}
.play{
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>