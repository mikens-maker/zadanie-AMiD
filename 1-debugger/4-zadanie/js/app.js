const hoursEl = document.querySelector(".timer .hours");
const minutesEl = document.querySelector(".timer .minutes");
const secondEl = document.querySelector(".timer .second");
const clock = document.querySelector(".clock");
let count = 0;

function generateRandomColor() {
    const random = Math.floor(Math.random()*360);
    return `hsl(${random}, 80%, 60%)`; // POPRAWIONE: 20% → 80%
}

function setTimer(h, m, s) {
    hoursEl.innerText = (""+h).padStart(2, "0");    // DODANE
    minutesEl.innerText = (""+m).padStart(2, "0");  // DODANE
    secondEl.innerText = (""+s).padStart(2, "0");
}

function setClockHands(h, m, s) {
    const secondDegrees = ((s / 60) * 360);
    const minutesDegrees = ((m / 60) * 360) + ((s / 60) * 6);     // DODANE
    const hoursDegrees = ((h / 12) * 360) + ((m / 60) * 30);      // DODANE
    
    clock.style.setProperty('--second', `${secondDegrees}deg`);
    clock.style.setProperty('--minutes', `${minutesDegrees}deg`); // DODANE
    clock.style.setProperty('--hours', `${hoursDegrees}deg`);     // DODANE
}

function time() {
    const date = new Date();
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();

    setTimer(h, m, s);
    setClockHands(h, m, s);

    count++;
    if (count >= 5) {
        count = 0;
        document.body.style.backgroundColor = generateRandomColor();
    }
}

setInterval(() => {
    time();
}, 1000)