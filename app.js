//querySelectorで各セレクタを変数に代入
const song = document.querySelector(".song");
const play = document.querySelector(".play");
const replay = document.querySelector(".replay");
const outline = document.querySelector(".moving-outline circle");
const video = document.querySelector(".vid-container video");
//Sounds
// querySelectorAllを使用すると、引数に指定したセレクタに該当するセレクタ全てが配列に格納される
const sounds = document.querySelectorAll(".sound-picker button");
//Time Display
const timeDisplay = document.querySelector(".time-display");
// getTotalLengthでSVG要素の長さを取得
const outlineLength = outline.getTotalLength();
//Duration
const timeSelect = document.querySelectorAll(".time-selector button");
let fakeDuration = 600;

// stroke-dasharray:破線の感覚を指定
// stroke-dashoffset:svgパスが始まる値
outline.style.strokeDashoffset = outlineLength;
outline.style.strokeDasharray = outlineLength;
// textContentはHTMLを解釈せずにそのまま文字として出力する
timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
  fakeDuration % 60
)}`;

sounds.forEach(sound => {
  //addEventListenerの第一引数のイベントが起こるたびに発火
  sound.addEventListener("click", () => {
    console.log(song.src);
    song.src = sound.getAttribute("data-sound");
    video.src = sound.getAttribute("data-video");
    console.log(song.src);

    checkPlaying(song);
  });
});

play.addEventListener("click", () => {
  checkPlaying(song);
});

replay.addEventListener("click", () => {
  song.currentTime = 0;
});

timeSelect.forEach(option => {
  option.addEventListener("click", () => {
    console.log(option);
    fakeDuration = option.getAttribute("data-time");
    timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
      fakeDuration % 60
    )}`;
    console.log(fakeDuration);
  });
});

const checkPlaying = song => {
  if (song.paused) {
    song.play();
    video.play();
    play.src = "./svg/pause.svg";
  } else {
    song.pause();
    video.pause();
    play.src = "./svg/play.svg";
  }
};

song.ontimeupdate = () => {
  let currentTime = song.currentTime;
  let elapsed = fakeDuration - currentTime;
  let seconds = Math.floor(elapsed % 60);
  let minutes = Math.floor(elapsed / 60);
  timeDisplay.textContent = `${minutes}:${seconds}`;
  let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
  outline.style.strokeDashoffset = progress;

  if (currentTime >= fakeDuration) {
    song.pause();
    song.currentTime = 0;
    play.src = "./svg/play.svg";
    video.pause();
  }
};
