let countDown;
const timeDisplay = document.querySelector('.display__time-left')
const endDisplay = document.querySelector('.display__end-time')
const timerControls = document.querySelectorAll('[data-time]');
const input = document.querySelector('[type="text"]');

function timer(seconds){
    clearInterval(countDown);
    const now = Date.now();
    const then = now + seconds*1000;
    DisplayTimeLeft(seconds);
    DisplayEndTime(then);
    countDown = setInterval(() => {
        let secondsLeft = Math.round((then - Date.now())/1000);
        if(secondsLeft<0)
        {
            clearInterval(countDown);
            return;
        }
        // secondsLeft = Math.abs(secondsLeft);
        DisplayTimeLeft(secondsLeft);
    },1000);
}
function DisplayTimeLeft(seconds){
    const mins = Math.floor(seconds/60);
    seconds = seconds%60;
    const display = (mins<10?'0':'') + mins + ":" + (seconds<10?'0':'')+ seconds;
    timeDisplay.innerHTML =  display;
    document.title = display;
}
function DisplayEndTime(timestamp){
    const hours = (new Date(timestamp)).getHours();
    const mins = (new Date(timestamp)).getMinutes();
    const display = (hours<10?'0':'') + hours + ":" + (mins<10?'0':'')+ mins;
    endDisplay.innerHTML = 'Be Back At ' + display;
}

function setTimeControl(){
    timer(this.dataset.time);
}

function setTimeControlMinutes(e){
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins*60);
    this.reset();
}

timerControls.forEach(timerControl => timerControl.addEventListener('click',setTimeControl));
document.customForm.addEventListener('submit',setTimeControlMinutes);