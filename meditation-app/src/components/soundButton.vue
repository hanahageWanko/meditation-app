<template>
  <button @click="emitSound(sound)">
    <img :src="`../static/svg/${sound}.svg`" :alt="sound" />
  </button>
</template>

<script lang="ts">
import { Prop, Vue } from "vue-property-decorator";

interface Prop {
  sound: string;
}

export default class SoundButton extends Vue {
  @Prop({ required: true })
  public sound!: string;

  public emitSound(sound: string) {
    return this.$emit(sound);
  }
}
</script>
