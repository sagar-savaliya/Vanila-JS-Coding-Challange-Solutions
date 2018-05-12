
const player = document.querySelector(".player");
const video  = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progress_bar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('#fullscreen');
console.log(fullScreen);

function togglePlay(){
    if(video.paused){
        video.play();
    }else  
        video.pause();
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip(){
    console.log("skipping");
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
    console.log(this.value);
    video[this.name] = this.value;
}

function scrub(e){
    console.log(e);
    const scrubTime = (e.offsetX/progress.offsetWidth)*video.duration;
    video.currentTime =  scrubTime;
}

function handleProgress(){
    const percent = (video.currentTime/ video.duration)*100;
    progress_bar.style.flexBasis = `${percent}%`;
}
function handleScreen(){
    console.dir(video);
    // player.classList.toggle('fullscreen');
    video.webkitRequestFullscreen();
}


video.addEventListener('click',togglePlay);
video.addEventListener('play',updateButton);
video.addEventListener('timeupdate',handleProgress);
video.addEventListener('pause',updateButton);
toggle.addEventListener('click',togglePlay);
skipButtons.forEach(skipButton => skipButton.addEventListener('click',skip));
ranges.forEach(range => range.addEventListener('change',handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove',handleRangeUpdate));
progress.addEventListener('click',scrub);
let mouseDown = false;
progress.addEventListener('mousemove',(e) => mouseDown && scrub(e));
progress.addEventListener('mousedown',() => mouseDown=true);
progress.addEventListener('mouseup',() => mouseDown=false);

fullScreen.addEventListener('click',handleScreen);