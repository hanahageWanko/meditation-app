<template>
  <button @click="emitSound(selectedSound)">
    <img :src="`../static/svg/${selectedSound}.svg`" :alt="selectedSound" />
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class SoundButton extends Vue {
  @Prop()
  public selectedSound!: string;

  public emitSound(sound: string) {
    return this.$emit("soundEvent");
  }
}
</script>
