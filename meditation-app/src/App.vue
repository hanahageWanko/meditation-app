<template>
  <div class="app">
    <div class="vid-container">
      <video loop class="vid-inner" ref="video">
        <source src="../public/static/video/rain.mp4" type="video/mp4" />
      </video>
    </div>
    <div class="time-selector">
      <TimeButton
        v-for="time in timeSelector"
        :key="time"
        :data-time="time"
        ref="timeselect"
        :selectedTime="time"
        @timeEvent="timeSet(time)"
      >
        {{ time / 60 }} Minutes
      </timeButton>
    </div>
    <div class="player-container">
      <audio class="song" ref="song">
        <source src="../public/static/sounds/rain.mp3" />
      </audio>
      <PlayButton
        :circles="circles"
        :playIng="playing"
        ref="play"
        @playEvent="checkPlaying()"
      />
      <h3 class="time-display" ref="timedisplay"></h3>
    </div>
    <div class="sound-picker">
      <SoundButton
        v-for="sound in sounds"
        :key="sound"
        :selectedSound="sound"
        @soundEvent="selectSound(sound)"
        :class="`sound-${sound}`"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from "vue-property-decorator";
import SoundButton from "@/components/soundButton.vue";
import TimeButton from "@/components/timeButton.vue";
import PlayButton from "@/components/playButton.vue";

@Component({
  components: {
    SoundButton,
    TimeButton,
    PlayButton
  },
})
export default class App extends Vue {
  name!: "App";
  // data
  timeSelector: number[] = [120, 300, 600];
  circles: {
    class: string;
    color: string;
  }[] = [
    { class: "track-outline", color: "white" },
    { class: "moving-outline", color: "#018EBA" },
  ];
  sounds: string[] = ["rain", "beach"];
  currentSong = "rain";
  fakeDuration = 600;
  playing: string[] = ["pause", "play"];

  mounted() {
    this.initialState();
    this.onTimeUpdate();
  }

  public refs(): any {
    return this.$refs;
  }

  public getSong(): any {
    const song = this.refs().song;
    return song;
  }

  public getPlay(): any {
    console.log(this.refs().play);
    const play = this.refs().play;
    return play;
  }

  public getOutline(): any {
    const outline = this.refs().play.$refs["moving-outline"][0];
    return outline;
  }

  public getVideo(): any {
    const video = this.refs().video;
    return video;
  }

  public getTimeDisplay(): any {
    const timeDisplay = this.refs().timedisplay;
    return timeDisplay;
  }

  public getOutlineLength(): number {
    const outlineLength: number = this.getOutline().getTotalLength();
    return outlineLength;
  }

  public getTimeSelect() {
    const timeSelects = this.refs().timeselect;
    return timeSelects;
  }

  public selectSound(sound: string): void {
    this.getSong().src = `./static/sounds/${sound}.mp3`;
    this.getVideo().src = `./static/video/${sound}.mp4`;
    this.checkPlaying("play");
  }

  public checkPlaying(state: string) {
    if (state == "play" || this.getSong().paused) {
      this.getSong().play();
      this.getVideo().play();
      this.getPlay().src = "../static/svg/pause.svg";
    } else {
      this.getSong().pause();
      this.getVideo().pause();
      this.getPlay().src = "./static/svg/play.svg";
    }
  }

  public timeSet(time: number): void {
    this.fakeDuration = time;
    this.getTimeDisplay().textContent = `${Math.floor(
      this.fakeDuration / 60
    )}:${Math.floor(this.fakeDuration % 60)}`;
    this.checkPlaying("play");
    this.getSong().currentTime = 0;
  }

  public onTimeUpdate(): void {
    this.getSong().addEventListener("timeupdate", () => {
      let currentTime = this.getSong().currentTime;
      let elapsed = this.fakeDuration - currentTime;
      let seconds = Math.floor(elapsed % 60);
      let minutes = Math.floor(elapsed / 60);
      this.getTimeDisplay().textContent = `${minutes}:${seconds}`;
      let progress =
        this.getOutlineLength() -
        (currentTime / this.fakeDuration) * this.getOutlineLength();
      this.getOutline().style.strokeDashoffset = progress;

      if (currentTime >= this.fakeDuration) {
        this.getSong().pause();
        this.getSong().currentTime = 0;
        this.getPlay().src = "./static/svg/play.svg";
        this.getVideo().pause();
      }
    });
  }

  public initialState(): void {
    this.getOutline().style.strokeDashoffset = this.getOutlineLength();
    this.getOutline().style.strokeDasharray = this.getOutlineLength();
    this.getTimeDisplay().textContent = `${Math.floor(
      this.fakeDuration / 60
    )}:${Math.floor(this.fakeDuration % 60)}`;
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

svg,
img {
  display: block;
  width: 100%;
}

button {
  border-radius: 4px;
  background-color: transparent;
  display: block;
  box-shadow: none;
  border: none;
  box-sizing: border-box;
  cursor: pointer;
}

.app {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 0;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  min-height: 430px;
}

.vid-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
}

.vid-inner {
  min-width: 100%;
  min-height: 100%;
  z-index: 1;
}

.time-selector,
.sound-picker,
.player-container {
  height: 80%;
  flex: 1;
  width: 100%;
  position: relative;
  z-index: 2;
}

.time-selector,
.sound-picker {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
}

.time-selector button {
  border: 1.5px solid rgba(255, 255, 255, 0.8);
  padding: 14px 8px;
  min-width: 7rem;
}

.sound-picker button {
  padding: 20px;
  width: 80px;
  border-radius: 50%;
}

.sound-picker .sound-rain {
  background-color: rgb(72, 127, 189);
}

.sound-picker .sound-beach {
  background-color: rgb(189, 72, 72);
}

.player-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
  text-align: center;
}

.track-outline,
.moving-outline{
  position: absolute;
  top: 50%;
  left: 50%;
}

.track-outline,
.moving-outline {
  margin-top: -100px;
  margin-left: -100px;
  width: 200px;
}

.time-display {
  position: absolute;
  font-size: 160%;
  top: 50%;
  margin-top: 130px;
  font-family: serif;
}

</style>
