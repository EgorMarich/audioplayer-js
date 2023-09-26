const image = document.getElementById('cover'),
title = document.getElementById('music-title'),
artist = document.getElementById('music-artist');
currentTimeEl = document.getElementById('current-time');
durationEl = document.getElementById('duration');
progress = document.getElementById('progress');
playerProgress = document.getElementById('player-progress');
prevBtn = document.getElementById('prev');
playBtn = document.getElementById('play');
nextBtn = document.getElementById('next');
background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: './assets/1.mp3',
        displayName: 'Yin&Yang',
        cover: './assets/1.jpg',
        artist: '5EB',
    },

    {
        path: './assets/2.mp3',
        displayName: '(It Goes Like) Nanana',
        cover: './assets/2.png',
        artist: 'Peggy Gou',
    },

    {
        path: './assets/3.mp3',
        displayName: 'Redbone',
        cover: './assets/3.jpg',
        artist: 'Childish Gambino',
    },

    {
        path: './assets/4.mp3',
        displayName: 'WHateva U Want',
        cover: './assets/4.jpg',
        artist: 'ScHoolboy Q  feat. Candice Pillay',
    },

    {
        path: './assets/5.mp3',
        displayName: 'FACE',
        cover: './assets/5.jpg',
        artist: 'BROCKHOMPTON',
    },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay(){
    if(isPlaying){
        pauseMusic();
    }else {
        palyMusic();
    }
    
}

function palyMusic(){
    isPlaying = true;

    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}


function pauseMusic(){
    isPlaying = false;

    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song){
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction){
     musicIndex = (musicIndex + direction + songs.length) % songs.length;
     loadMusic(songs[musicIndex]);
     palyMusic();
}

function updateProgressBar(){
    const { duration, currentTime} = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration/60)}:${formatTime(duration % 60)}`;

    currentTimeEl.textContent = `${formatTime(currentTime/60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e){
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1) );
nextBtn.addEventListener('click', () => changeMusic(1) );
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

 loadMusic(songs[musicIndex]);