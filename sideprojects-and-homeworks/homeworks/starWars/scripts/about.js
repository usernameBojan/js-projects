const audio = new Audio("../assets/audio/swsong.mp3");
const txtSec = document.querySelector("section");
let counter = 0;

audio.play();
audio.volume = 0.05;

window.addEventListener("click", () => {
    counter++;
    (counter%2 === 0)? audio.play() : audio.pause();
});

let hideCrawl = () => {
    txtSec.style.display = "none";
};

setTimeout(hideCrawl, 67000);