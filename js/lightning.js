var mySlides = impress();
var countTotal = 15;
var countCurrent = 0;
var countIncrement = 1;

var counter;

function countDecrement() {
    updateCounterDisplay(countCurrent);

    if (countCurrent <= 0) {
        clearInterval(counter);
        countCurrent = countTotal;
        mySlides.next();
    }
    countCurrent -= countIncrement;
}

function startCounter() {
    clearInterval(counter);
    countCurrent = countTotal;
    counter = setInterval(countDecrement, countIncrement * 1000);
}

function stopCounter() {
    clearInterval(counter);
    updateCounterDisplay(0);
}

function updateCounterDisplayNumeric(count) {
    count = count == 0 ? "" : count;
    document.getElementById("countdown").innerHTML = count;
}

function updateCounterDisplay(count) {
    countDisplay = ""
    for (i=0;i<count;i++) {
        countDisplay += "|<br>"
    }
    document.getElementById("countdown").innerHTML = countDisplay;
}

document.addEventListener("impress:stepenter", function (event) {
    // No counter on first of last slide
    if (["slide0", "overview"].indexOf(event.target.id) == -1) {
        startCounter();
    } else {
        stopCounter();
    }
}, false);

document.addEventListener("keyup", function ( event ) {
    switch( event.keyCode ) {
        case 27: // Escape to stop counter
            console.log("Escape");
            stopCounter();
            break;
        case 13: //Enter to start counter
            console.log("Enter");
            startCounter();
            break;
    }
    
}, false);


document.addEventListener("mousedown", function ( event ) {
    event.preventDefault();
    if (event.button === 0) { // Left Click
        mySlides.next();
    } else if (event.button === 2) {
        mySlides.prev(); //Right Click
    }
}, false);

document.addEventListener("contextmenu", function ( event ) {
    // Disable context menu on right click
    event.preventDefault();
    return false;
}, false);

