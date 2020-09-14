<template>
<button @click="emitTime(time)">
  <slot/>
</button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class TimeButton extends Vue {
  @Prop()
  public selectedTime!: number;

  public emitTime(time: number) {
    return this.$emit("timeEvent");
  }
}
</script>
