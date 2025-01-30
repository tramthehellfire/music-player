console.log("Welcome to TramTron");

let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

songItems.forEach(element => {
    element.addEventListener('click', () => {
        let songPath = element.dataset.songPath;
        let songName = element.dataset.songName;

        if (audioElement.src !== songPath || audioElement.paused) {
            audioElement.src = songPath;
            masterSongName.innerText = songName;
            audioElement.currentTime = 0;
            audioElement.play().catch(error => {
                console.error("Autoplay prevented:", error);
                alert("Please interact with the page first to enable audio.");
            });
            gif.style.opacity = 1;
            masterPlay.innerText = "Pause"; // Update master play button text
        } else {
            audioElement.pause();
            gif.style.opacity = 0;
            masterPlay.innerText = "Play"; // Update master play button text
        }
    });
});

masterPlay.addEventListener('click', () => {
    if (audioElement.paused) {
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.innerText = "Pause";
    } else {
        audioElement.pause();
        gif.style.opacity = 0;
        masterPlay.innerText = "Play";
    }
});

audioElement.addEventListener('timeupdate', () => {
    if (isNaN(audioElement.duration)) return;
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    if (isNaN(audioElement.duration)) return;
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songItems.length;
    playSong(songIndex);
});

document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songItems.length) % songItems.length;
    playSong(songIndex);
});

function playSong(index) {
    let songPath = songItems[index].dataset.songPath;
    let songName = songItems[index].dataset.songName;
    audioElement.src = songPath;
    masterSongName.innerText = songName;
    audioElement.currentTime = 0;
    audioElement.play().catch(error => {
        console.error("Autoplay prevented:", error);
        alert("Please interact with the page first to enable audio.");
    });
    gif.style.opacity = 1;
    masterPlay.innerText = "Pause"; // Update master play button text
}
