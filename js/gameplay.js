// TO DO: 
// 1) Why does the font size increase for the player and computer choices on the last round?
// 2) How can I reset the textContent for the choices div? Do I need to refactor the code?
// Code flow:
//  main
//    playRound - returns round result (win, loss, or tie)
//      getComputerChoice - returns computer choice
//      getRoundResult - returns win, loss, tie
//      displayChoices - updates choices div for computer and player
//      printRoundResult - print the round result
//    updateGameResult - 
//    resultString

const roundResult = document.querySelector('#roundResult');
const gameResultPara = document.querySelector('#gameResult');
const playerChoices = document.querySelector('#playerChoices');
const computerChoices = document.querySelector('#computerChoices');

const MAXROUNDS = 5;
let gameResult = [0, 0, 0, 0]; // wins, losses, ties, and games played


const userChoices = document.querySelectorAll('button');
userChoices.forEach((button) => {
    button.addEventListener('click', () => {
        let roundResult = playRound(button.id);
        gameResult = updateGameResult(roundResult, gameResult);

        if (gameResult[3] == 1) {
            gameResultPara.textContent = ""; //reset game results at the start of a new game
            playerChoices.textContent = "";
            computerChoices.textContent = "";
        }

        if (gameResult[3] == MAXROUNDS) {
            gameResultPara.textContent = resultString(gameResult);
            gameResult = [0, 0, 0, 0];
        }
    });
});

// Called by main
function playRound(playerSelection) {
    let computerSelection = getComputerChoice();
    let result = getRoundResult(playerSelection, computerSelection);
    displayChoices(playerSelection, computerSelection);
    roundResult.textContent = printRoundResult(playerSelection, computerSelection, result);
    return result;
}

// called by playRound
function displayChoices(playerSelection, computerSelection) {
    playerChoices.textContent += `${playerSelection} \r\n`;
    computerChoices.textContent += `${computerSelection} \r\n`;
}

// Called by main
function resultString(gameResult) {
    let winForm = (gameResult[0] == 1) ? 'win' : 'wins';
    let lossForm = (gameResult[1] == 1) ? 'loss' : 'losses';
    let tieForm = (gameResult[2] == 1) ? 'tie' : 'ties';
    return (`Final Results: You have ${gameResult[0]} ${winForm}, 
    ${gameResult[1]} ${lossForm}, and ${gameResult[2]} ${tieForm}.`)

}

// called by playRound
function getComputerChoice() {
    let choice = Math.floor(Math.random() * 3);
    let options = ["Rock", "Paper", "Scissors"];
    return options[choice];
}

// called by playRound
function getRoundResult(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return "tie";
    } else if ((playerSelection === "Rock" && computerSelection === "Scissors") ||
        (playerSelection === "Scissors" && computerSelection === "Paper") ||
        (playerSelection === "Paper" && computerSelection === "Rock")) {
        return "win";
    } else {
        return "lose";
    }
}

// called by playRound
function printRoundResult(playerSelection, computerSelection, result) {
    switch (result) {
        case "win":
            return `You Win! ${playerSelection} beats ${computerSelection}.`;
            break;
        case "lose":
            return `You Lose! ${computerSelection} beats ${playerSelection}.`;
            break;
        case "tie":
            return `You tie! You both chose ${playerSelection}.`;
    }

}

// called by main
function updateGameResult(roundResult, gameResult) {
    switch (roundResult) {
        case "win":
            gameResult[0] += 1;
            break;
        case "lose":
            gameResult[1] += 1;
            break;
        case "tie":
            gameResult[2] += 1;
    }
    gameResult[3] += 1;
    return gameResult;
}