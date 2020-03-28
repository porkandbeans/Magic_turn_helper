var phaseArr =
    [/*0*/"Untap", /*1*/"Upkeep", /*2*/"Draw",
    /*3*/"Main phase",
    /*4*/"Combat Begins", /*5*/"Declare Attackers", /*6*/"Declare Blockers",
    /*7*/"First Strike Damage", /*8*/"Combat Damage", /*9*/"End Combat",
    /*10*/"2nd Main Phase",
    /*11*/"End step"];

var phasenum = -1;
var turn = 1;
var p1health = 20;
var p2health = 20;
var life1hold = 0;
var life2hold = 0;
var coinflip = new Audio("coinflip.mp3");
var coinland = new Audio("coinland.mp3");
var tap = new Audio("tap.wav");

var $ = function (id) {
    return document.getElementById(id);
    //"$" is now equal to "document.getElementByID"
}



function whosturn() {
    //displays who's turn it is
    if (turn % 2 == 0) {
        $("player").innerHTML = "2";
    } else {
        $("player").innerHTML = "1";
    }
}

function progress() {
    tap.play();

    $("pending").innerHTML = ""; //clears pending text
    
    if (phasenum >= 11) { //catches when phase reaches beyond end step
        phasenum = -1;
        turn += 1;
    }
    
    if ((turn == 1) && (phasenum == -1)) { //catches a skipped turn on turn 1
        phasenum = 2;
    }

    whosturn();
    phasenum += 1; //advances the phase

    $("phase").innerHTML = phaseArr[phasenum]; //displays current phase to the user
    $("Turncount").innerHTML = turn; //displays current turn to the user

    p1health += life1hold; //confirms any health changes
    $("p1life").innerHTML = p1health;

    p2health += life2hold;
    $("p2life").innerHTML = p2health;

    $("life1hold").innerHTML = "+0"; //resets the pending health display
    $("life2hold").innerHTML = "+0";

    life1hold = 0; //resets the pending health
    life2hold = 0;

    helptext(); //updates the text in the modal window

    console.log("Progress(); called. Phasenum: " + phasenum); //redundant code for bugfixing, leaving in for demonstration purposes.
}

function coin() {
    //called when coin is tapped
    $("flipme").src = "coinflip.gif"; //coin flipping animation
    coinflip.play();
    setTimeout(delayedcoin, 1000); //waits 1 second and then performs delayedcoin()
}

function delayedcoin() {
    coinland.play();
    var x = Math.floor(Math.random() * 2); //generates random number between 0 and 1
    var flip;

    if (x == 0) {
        flip = "whitemana.png";
    } else {
        flip = "blackmana.png";
    }
    $("flipme").src = flip; //randomly displays one of two coin faces
}

function resetVars() {
    //called when user clicks "yes" in the "are you sure" modal window
    //just resets all variables to their default values
    tap.play();
    phasenum = -1; 
    helptext(); //updates text in the modal window before "turn" is set to 1 to avoid inconsistent help text
    turn = 1;
    p1health = 20;
    p2health = 20;
    console.log("ResetVars(); called. Phasenum: " + phasenum + " Turn: " + turn);
    life1hold = 0;
    life2hold = 0;
    //$ is the best function EVER!
    $("player").innerHTML = "1";
    $("phase").innerHTML = "Game reset!";
    $("Turncount").innerHTML = turn;
    $("p1life").innerHTML = p1health;
    $("p2life").innerHTML = p2health;
    $("life1hold").innerHTML = "+0";
    $("life2hold").innerHTML = "+0";
    $("skipper").disabled = false; //enables skip button in case it isn't enabled
}

function LifeHoldDisplay(id) {
    if (life1hold >= 0) {
        //detects if life is being incremented or decremented, updates the display accordingly
        $(id).innerHTML = ("+" + life1hold);
    } else {
        $(id).innerHTML = (life1hold);
    }
}

function LifeHoldDisplay1(id) {
    if (life2hold >= 0) {
        $(id).innerHTML = ("+" + life2hold);
    } else {
        $(id).innerHTML = (life2hold);
    }
}

function pend() {
    //added this when I realised the way my life totals works isn't entirely obvious...
    $("pending").innerHTML = ("tap Next &#8594; to confirm life totals");
}

function p1healthup() {
    //called when user clicks heart icons
    pend();
    tap.play();
    life1hold += 1;
    LifeHoldDisplay("life1hold");
}

function p2healthup() {
    pend();
    tap.play();
    life2hold += 1;
    LifeHoldDisplay1("life2hold")
}

function p1healthdown() {
    pend();
    tap.play();
    life1hold -= 1;
    LifeHoldDisplay("life1hold");
}

function p2healthdown() {
    pend();
    tap.play();
    life2hold -= 1;
    LifeHoldDisplay1("life2hold");
}

function turnskip() {
    //called when user skips turn
    tap.play();
    turn += 1; //advances the total number of turns
    whosturn();
    phasenum = -1; //resets the phase
    $("Turncount").innerHTML = turn; //updates turn display
    $("phase").innerHTML = "Turn skipped!";
    helptext(); //updates text in the modal window
    console.log("Turnskip(); called. Phasenum: " + phasenum); //more stuff for bugfixing
}
