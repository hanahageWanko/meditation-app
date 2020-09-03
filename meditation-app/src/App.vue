<template>
  <div class="app">
    <div class="vid-container">
      <video loop class="vid-inner" ref="video">
        <source src="./video/rain.mp4" type="video/mp4" />
      </video>
    </div>
    <div class="time-selector">
      <button
        v-for="time in timeSelector"
        :key="time"
        :data-time="time"
        ref="timeselect"
        @click="timeSet(time)"
      >
        {{ time / 60 }} Minutes
      </button>
    </div>
    <div class="player-container">
      <audio class="song" ref="song">
        <source src="./sounds/rain.mp3" />
      </audio>
      <img
        src="./svg/play.svg"
        alt="play"
        class="play"
        ref="play"
        @click="checkPlaying()"
      />
      <svg
        v-for="(circle, index) of circles"
        :key="`${circle.class}-${index}`"
        :class="circle.class"
        viewBox="0 0 453 453"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
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
      <img
        src="./svg/replay.svg"
        class="replay"
        ref="replay"
        @click="this.getSong().currentTime = 0"
      />
      <h3 class="time-display" ref="timedisplay">0:00</h3>
    </div>
    <div class="sound-picker">
      <button
        v-for="sound in sounds"
        :key="sound"
        @click="selectSound(sound)"
        :class="`sound-${sound}`"
      >
        <img src="./svg/rain.svg" alt="rain" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      timeSelector: [120, 300, 600],
      circles: [
        { class: "track-outline", color: "white" },
        { class: "moving-outline", color: "#018EBA" }
      ],
      sounds: ["rain", "beach"],
      currentSong: "rain",
      fakeDuration: 600,
      playing: ["pause", "play"]
    };
  },
  mounted() {
    // console.log(this.$refs["track-outline"][0].outerHTML);
    // console.log(this.$refs["moving-outline"][0].outerHTML);
    this.initialState();
    this.onTimeUpdate();
  },
  methods: {
    getSong() {
      const song = this.$refs.song;
      return song;
    },
    getPlay() {
      const play = this.$refs.play;
      return play;
    },
    getReplay() {
      const replay = this.$refs.replay;
      return replay;
    },
    getOutline() {
      const outline = this.$refs["moving-outline"][0];
      return outline;
    },
    getVideo() {
      const video = this.$refs.video;
      return video;
    },
    getTimeDisplay() {
      const timeDisplay = this.$refs.timedisplay;
      return timeDisplay;
    },
    getOutlineLength() {
      const outlineLength = this.getOutline().getTotalLength();
      return outlineLength;
    },
    getTimeSelect() {
      const timeSelects = this.$refs.timeselect;
      return timeSelects;
    },
    selectSound(sound) {
      this.getSong().src = `./sounds/${sound}.mp3`;
      this.getVideo().src = `./video/${sound}.mp4`;
      this.checkPlaying(this.getSong());
    },
    checkPlaying() {
      console.log();
      if (this.getSong().paused) {
        this.getSong().play();
        this.getVideo().play();
        this.getPlay().src = "./svg/pause.svg";
      } else {
        this.getSong().pause();
        this.getVideo().pause();
        this.getPlay().src = "./svg/play.svg";
      }
    },
    timeSet(time) {
      this.fakeDuration = time;
      this.getTimeDisplay().textContent = `${Math.floor(
        this.fakeDuration / 60
      )}:${Math.floor(this.fakeDuration % 60)}`;
    },
    onTimeUpdate() {
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
          this.getPlay().src = "./svg/play.svg";
          this.getVideo().pause();
        }
      });
    },
    initialState() {
      this.getOutline().style.strokeDashoffset = this.getOutlineLength();
      this.getOutline().style.strokeDasharray = this.getOutlineLength();
      this.getTimeDisplay().textContent = `${Math.floor(
        this.fakeDuration / 60
      )}:${Math.floor(this.fakeDuration % 60)}`;
    }
  }
};
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

.play {
  width: 90px;
  margin-top: -45px;
  margin-left: -45px;
  z-index: 10;
}

.play,
.track-outline,
.moving-outline,
.replay {
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

.replay {
  margin-top: -150px;
  margin-left: -100px;
  width: 200px;
  display: none;
}
</style>
