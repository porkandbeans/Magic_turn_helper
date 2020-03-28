/*https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal */

function closeModal() {
    document.getElementById("myModal").style.display = "none";
    tap.play();
}

function openModal() {
    document.getElementById("myModal").style.display = "block";
    tap.play();
}

function helptext() {
    //called lots of times in the code
    if ((phasenum != 3) && (phasenum != 10)) { //detects main phase and 2nd main phase
        $("legalcards").innerHTML = "Instant, Cards with \"Flash\", and activated abilities can now be played during this turn by either player. If it is not your turn and you want to play something at instant speed, you must wait for the main player to advance the phase, or play a card so that you are performing the action \"in response\".";
    } else {
        $("legalcards").innerHTML = "If it is your turn, you may now play 1 land for your turn (if you have not done so already) and any other cards you wish, assuming you have the mana to cast them. Either player is still able to cast spells at instant speed."
    }

    if (phasenum == 0) {
        $("desctext").innerHTML = "Any cards that are tapped must be untapped now (unless the card states otherwise).";
    } else if (phasenum == 1) {
        $("desctext").innerHTML = "Cards that activate \"during upkeep\" trigger now.";
    } else if (phasenum == 2) {
        $("desctext").innerHTML = "Draw a card for your turn.";
    } else if (phasenum == 3) {
        $("desctext").innerHTML = "This is the first \"main phase\" for your turn.";
    } else if (phasenum == 4) {

        /*disables skip button so you cannot declare an attacker,
        have it blocked then go to the next phase without attacking.
        Not that I expect MTG players to do this, but it
        further implies how the rules work. Skip button only exists so
        people don't have to go through every single phase
        on turns when they have nothing to do.*/
        $("skipper").disabled = true;

        $("desctext").innerHTML = "Combat begins. You do not declare your attackers until the next phase.";
    } else if (phasenum == 5) {
        $("desctext").innerHTML = "Declare your attackers by tapping them (turn them sideways). Any creatures you played THIS TURN may not be used to attack with, due to \"Summoning Sickness\". Creatures with \"Haste\" negate this restriction.";
    } else if (phasenum == 6) {
        $("desctext").innerHTML = "Defending player chooses their defending creatures. Summoning sickness does not affect their ability to block. Being tapped does.";
    } else if (phasenum == 7) {
        $("desctext").innerHTML = "Creatures with \"First Strike\" or \"Double Strike\" deal damage to players or defending creatures now.";
    } else if (phasenum == 8) {
        $("desctext").innerHTML = "Combat damage is dealt to players, planeswalkers and creatures now. Creatures with \"Double Strike\" hit a second time this turn. Creatures with \"First Strike\" do not hit again.";
    } else if (phasenum == 9) {
        $("desctext").innerHTML = "Combat ends on this phase. Creatures with health 0 or lower are sent from the battlefield to the graveyard (unless they are indestructible).";
    } else if (phasenum == 10) {
        $("skipper").disabled = false;
        $("desctext").innerHTML = "2nd main phase."
    } else if (phasenum == 11) {
        $("desctext").innerHTML = "It it the end step. This is the final phase before your turn ends. If you are an opposing player, now would be a good time to cast an instant or tap something!";
    } else {
        $("desctext").innerHTML = "This window will display the following:<ul><li>What you can do on the current phase</li><li>What cards can be played</li><li>Gameplay tips for the current phase</li></ul>";
    }
}

function about() {
    //called when user clicks "how to use this app" button
    $("desctext").innerHTML = "HEADS UP: This app will not teach you EVERYTHING that you need to know about Magic: The Gathering. This app will help you understand how turn structures work and when you can play specific cards.<br><br>This app is built for 2 players for learning purposes. To start the game, tap the sun/skull icon to flip it like a coin. Whoever wins the coin toss gets to choose who goes first. Each player shuffles their decks and draws 7 cards. If you don't like your starting hand, you can choose to \"Mulligan\" by shuffling those 7 cards back into your deck and drawing another 7, however you must discard 1 card for each time you have \"Mulligan'd\" (these rules vary depending on which kind of game you are playing, but these are the rules for standard play). Player 1 does not draw a card at the beginning of their first turn, so choose wisely!";
    $("legalcards").innerHTML = "The game is played in phases. At any point, click the \"?\" button for reference on what cards you can play and what happens during the current phase. If it is your turn, it is your responsibility to advance the phase by tapping the \"next phase\" button in the top left.<br><br>To add or subtract from a player's life total, you must first hit the + or - button above the totals, and then tap the \"Next Phase\" arrow button to confirm the changes.<br><br>This app was built by Charlie Matthews. Contact: Voter96@gmail.com<br>See <a href=\"https://cmatthews.nz/about.html\">cmatthews.nz</a> for the source code.";
    openModal();
}

function ays() {
    //called when user clicks "reset" button
    openModal();
    $("desctext").innerHTML = "Are you sure?";
    $("legalcards").innerHTML = "<button class=\"ynbutt\" onclick=\"resetVars(); closeModal();\">Yes</button><button class=\"ynbutt\" onclick=\"closeModal();\">No</button>" //writing HTML inside quotes is a bit of a pain, I wonder if there is a better way of doing this
}
