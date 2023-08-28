var timerStates = [
    { seconds: 45, instruction: "Move cooked tortilla(s) to tortilla warmer (or bowl covered with towel). Carefully place new tortilla(s) on grill, then start timer." },
    { seconds: 90, instruction: "Flip tortilla(s), then start timer." },
    { seconds: 45, instruction: "Flip tortilla(s), gently press down on tortilla(s), then start timer. Tortilla(s) should puff up." },
    { seconds: 15, instruction: "Flip tortilla(s) one last time to brown other side, then start timer."}
]
var currentIndex = 0;
var secondsRemaining = timerStates[0].seconds;
var timerInterval = undefined;

document.body.onkeyup = function(e) {
    if (e.key == " " || e.code == "Space" || e.keyCode == 32) {
        onButtonPressed();
    }
}

function onButtonPressed() {
    if (timerInterval == undefined) {
        startTimer();
    }
    // The timer shouldn't be cancellable during the first second in case the button is double-pressed.
    else if (secondsRemaining < timerStates[currentIndex].seconds - 1) {
        endTimer();
    }
}

function startTimer() {
    clearInterval(timerInterval);
    document.getElementById("instruction").innerText = "Tortilla(s) cooking. Now is a perfect time to press more tortillas!";
    timerInterval = setInterval(countDown, 1000);
}

function countDown() {
    secondsRemaining--;

    if (secondsRemaining <= 0) {
        endTimer()
    }
    else {
        updateTimerText();
    }   
}

function endTimer() {
    clearInterval(timerInterval);
    timerInterval = undefined;

    if (finishedTortilla()) {
        currentIndex = 0;
    }
    else {
        currentIndex++;
    }

    let nextTimerState = timerStates[currentIndex];
    secondsRemaining = nextTimerState.seconds;
    updateTimerText();
    document.getElementById("instruction").innerText = nextTimerState.instruction;
}

function finishedTortilla() {
    let lastIndex = timerStates.length - (document.getElementById("final-flip").checked ? 1 : 2);
    return (currentIndex >= lastIndex);
}

function updateTimerText() {
    document.getElementById("timer").innerText = Math.floor(secondsRemaining / 60).toString().padStart(2, '0') + ":" + Math.floor(secondsRemaining % 60).toString().padStart(2, '0');
}