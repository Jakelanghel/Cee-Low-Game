const rollBtn = document.getElementById("rollBtn");
const resetBtn = document.getElementById("resetBtn");
const hideRulesBtn = document.getElementById("rulesBtnHide");
const showRulesBtn = document.getElementById("rulesBtnShow");
const rules = document.getElementById("rules");
const msg = document.getElementById("msg");
const msg1 = document.getElementById("msg1");
const msg2 = document.getElementById("msg2");
const msg3 = document.getElementById("msg3");
const player1ScoreBoard = document.getElementById("p1ScoreBoard");
const player2ScoreBoard = document.getElementById("p2ScoreBoard");
const p1Roll = document.getElementById("p1roll");
const p2Roll = document.getElementById("p2roll");
const p1 = document.querySelector(".player1");
const p2 = document.querySelector(".player2");
let die1 = document.getElementById("die1");
let die2 = document.getElementById("die2");
let die3 = document.getElementById("die3");



rollBtn.addEventListener("click", rollDice);
resetBtn.addEventListener("click", resetGame);
hideRulesBtn.addEventListener("click", hideRules)
showRulesBtn.addEventListener("click", showRules)

let player1Turn = true;


let player1roll = 0;
let player2roll = 0;

let player1Score = 0;
let player2Score = 0;

// TO DO
// ADD MODEL EXPLAINING RULES
// TEST EVERYTHING
// ADD " C-LOW " TITLE TO TOP OF PAGE


function rollDice() {

    clearDice();
    sorted = playerRoll();
    checkAutoLose();
    checkAutoWin();
    checkTrips();
    checkDouble(sorted);
    setTimeout(changePlayer, 3000);
    checkRound();
    if(player1Score || player2Score >= 10) {
        setTimeout(dubWinner, 3000);
    }

}

function playerRoll() {
    
    const roll = [];

    const randNum1 = Math.floor(Math.random() * 6) + 1;
    let dice = document.createElement("img")
    dice.src = "images/dice-" + randNum1 + ".svg";
    die1.appendChild(dice)
    roll.push(randNum1);

    const randNum2 = Math.floor(Math.random() * 6) + 1;
    dice = document.createElement("img")
    dice.src = "images/dice-" + randNum2 + ".svg";
    die2.appendChild(dice)
    roll.push(randNum2);

    const randNum3 = Math.floor(Math.random() * 6) + 1;
    dice = document.createElement("img")
    dice.src = "images/dice-" + randNum3 + ".svg";
    die3.appendChild(dice)
    roll.push(randNum3);
    roll.sort();


// TEST CODE
    // let roll = [4,5,6]
    // die1.textContent = roll[0];
    // die2.textContent = roll[1];
    // die3.textContent = roll[2];
    
    return roll;
}

function clearDice() {

    die1.removeChild(die1.childNodes[0]);
    die2.removeChild(die2.childNodes[0]);
    die3.removeChild(die3.childNodes[0]);
}

function updateScoreBoard() {

    player1ScoreBoard.textContent = player1Score;
    player2ScoreBoard.textContent = player2Score;
    p1Roll.textContent = player1roll;
    p2Roll.textContent = player2roll;
}

function clearBoard() {

    player1roll = 0;
    player2roll = 0;
    p1Roll.textContent = 0;
    p2Roll.textContent = 0;
    msg1.textContent = "";
    msg2.textContent = "";
    msg3.textContent = "";
}

function changePlayer() {

    if(player1roll === 0 && player2roll > 0) {
        player1Turn = true;
        msg.textContent = "Player 1 turn";
        p2.classList.remove("active");
        p1.classList.add("active");
        rollBtn.style.visibility = "visible";

    }else if (player2roll === 0 && player1roll > 0) {
        player1Turn = false;
        msg.textContent = "Player 2 turn";
        p1.classList.remove("active");
        p2.classList.add("active");
        rollBtn.style.visibility = "visible";
    }
}

function restartRound() {

    if(player1roll > player2roll){
        clearBoard();
        player1Turn = true;
        msg.textContent = "Player 1 turn";
        p2.classList.remove("active");
        p1.classList.add("active");
        rollBtn.style.visibility = "visible";

    }else if(player2roll > player1roll) {
        clearBoard()
        player1Turn = false;
        msg.textContent = "Player 1 turn";
        p1.classList.remove("active");
        p2.classList.add("active");
        rollBtn.style.visibility = "visible";
    }
}


function checkAutoLose() {

    if(sorted[0] === 1 && sorted[1] === 2 && sorted[2] === 3) {

        if(player1Turn){
            rollBtn.style.visibility = "hidden";
            msg1.textContent = "Player 1 automatically loses the round and has to give player 2 a extra point!";
            player1Score --;
            player2Score = player2Score + 2;
            player1Turn = false;
            updateScoreBoard()
            setTimeout(clearBoard, 3000);
            setTimeout(function(){
                msg.textContent = "Player 2 turn"
                p1.classList.remove("active");
                p2.classList.add("active");
            }, 3000);
            setTimeout(function(){
                if(player2Score < 10){
                    rollBtn.style.visibility = "visible";
                }
            }, 3000)
            
        }else {
            rollBtn.style.visibility = "hidden";
            msg2.textContent = "Player 2 automatically loses the round and has to give player 1 a extra point!";
            player2Score --;
            player1Score = player1Score + 2;
            player1Turn = true;
            updateScoreBoard()
            setTimeout(clearBoard, 3000);
            setTimeout(function(){
                msg.textContent = "Player 1 turn"
                p2.classList.remove("active");
                p1.classList.add("active");
            }, 3000);
            setTimeout(function(){
                if(player1Score < 10){
                    rollBtn.style.visibility = "visible";
                }
            }, 3000)
            
        } 
    }
}

function checkAutoWin() {

    if(sorted[0] === 4 && sorted[1] === 5 && sorted[2] === 6) {
        if(player1Turn) {
            rollBtn.style.visibility = "hidden";
            msg1.textContent = "Player 1 rolled a 4 5 6!!! you automatically win this round!!!";
            player1Score ++;
            updateScoreBoard();
            setTimeout(clearBoard, 3000);
            if(player1Score < 10){
                setTimeout(function() {
                    rollBtn.style.visibility = "visible";
                }, 3000)
            }
            
        
        }else {
            rollBtn.style.visibility = "hidden";
            msg2.textContent = "Player 2 rolled a 4 5 6!!! you automatically win this round!!!";
            player2Score ++;
            updateScoreBoard()
            setTimeout(clearBoard, 3000);
            if(player2Score< 10) {
                setTimeout(function() {
                    rollBtn.style.visibility = "visible";
                }, 3000)
            }
        }
    }
}

function checkTrips() {
    
    if(sorted[0] === sorted[1] && sorted[0] === sorted[2]) {
        if(player1Turn){
            rollBtn.style.visibility = "hidden";
            msg1.textContent = "Player one scored trip " + sorted[0] + "'s ! ! !";
            player1roll = 10 + sorted[0];
            updateScoreBoard();
            // change sorted so that check doubles does not overwrite
            sorted = [3,5,1];
            
        }else{
            rollBtn.style.visibility = "hidden";
            msg2.textContent = "Player two scored trip " + sorted[0] + "'s ! ! !";
            player2roll = 10 + sorted[0];
            updateScoreBoard();
            // change sorted so that check doubles does not overwrite//
            sorted = [3,5,1];
        }
    }
}


function checkDouble() {

    if(sorted[0] === sorted[1]){
        if(player1Turn) {
            rollBtn.style.visibility = "hidden";
            player1roll = sorted[2];
            msg1.textContent = "Player one scored a " + player1roll + " !";
            updateScoreBoard();
        }else {
            rollBtn.style.visibility = "hidden";
            player2roll = sorted[2];
            msg2.textContent = "Player two scored a " + sorted[2] + " !";
            updateScoreBoard();
        }
        
    }else if(sorted[2] === sorted[1]) {
        if(player1Turn) {
            rollBtn.style.visibility = "hidden";
            player1roll = sorted[0];
            msg1.textContent = "Player one scored a " + sorted[0] + " !";
            updateScoreBoard();
        }else {
            rollBtn.style.visibility = "hidden";
            player2roll = sorted[0];
            msg2.textContent = "Player two scored a " + sorted[0] + " !";
            updateScoreBoard();
        }
    }
}

function checkRound() {

        if(player1roll && player2roll > 0) {
        
        if(player1roll === player2roll){
            msg3.textContent = "It's a tie! please roll again..";
            setTimeout(handleTie, 3000);
            
            
        }else if(player1roll > player2roll){
            msg3.textContent = "Player one wins the round! " + player1roll + " > " + player2roll;
            player1Score ++;
            updateScoreBoard();
            setTimeout(restartRound, 3000);

        }else if(player2roll > player1roll) {
            msg3.textContent = "Player two wins the round! " + player2roll + " > " + player1roll;
            player2Score ++;
            updateScoreBoard();
            setTimeout(restartRound, 3000);
        }
    }
}



function handleTie() {
    
    if(player1Turn) {
        clearBoard();
        player1Turn = false;
        msg.textContent = "Player 2 turn";
        p1.classList.remove("active");
        p2.classList.add("active");
        rollBtn.style.visibility = "visible";
    }else{
        clearBoard();
        player1Turn = true;
        msg.textContent = "Player 1 turn";
        p2.classList.remove("active");
        p1.classList.add("active"); 
        rollBtn.style.visibility = "visible";
    }
}

function dubWinner() {

        if(player1Score >= 10) {
            msg.classList.add("winner-msg");
            msg.textContent = "PLAYER 1 WINS!!!";
            rollBtn.style.visibility = "hidden";
            resetBtn.style.visibility = "visible";
             
        }else if(player2Score >= 10) {
            msg.classList.add("winner-msg");
            msg.textContent = "PLAYER 2 WINS!!!";
            rollBtn.style.visibility = "hidden";
            resetBtn.style.visibility = "visible";
        }
    }


function resetGame() {
    msg.classList.remove("winner-msg");
    p2.classList.remove("active");
    p1.classList.add("active");
    msg.textContent = "Player 1 turn"
    clearBoard();
    player1Score = 0;
    player2Score = 0;
    updateScoreBoard()
    rollBtn.style.visibility = "visible";
    resetBtn.style.visibility = "hidden";

}

function hideRules() {
    rules.style.visibility = "hidden";
    hideRulesBtn.style.visibility = "hidden";
    showRulesBtn.style.visibility = "visible"
}
function showRules() {
    rules.style.visibility = "visible";
    hideRulesBtn.style.visibility = "visible";
    showRulesBtn.style.visibility = "hidden"
}

