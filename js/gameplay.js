const roundResult = document.querySelector('#roundResult');
const gameResultPara = document.querySelector('#gameResult');
const MAXROUNDS = 5;
let gameResult = [0,0,0,0];


const userChoices = document.querySelectorAll('button');
userChoices.forEach((button) => {
    button.addEventListener('click', () => {
        let roundResult = playRound(button.id);
        gameResult = updateGameResult(roundResult,gameResult);

        if (gameResult[3] == 1) {
            gameResultPara.textContent = "";
        }

        if (gameResult[3] == MAXROUNDS) {
            let winForm = "wins";
            let lossForm = "losses";
            let tieForm = "ties";
            if (gameResult[0] == 1) {winForm = "win"};
            if (gameResult[1] == 1) {lossForm = "loss"};
            if (gameResult[2] == 1) {tieForm = "tie"};
            gameResultPara.textContent = `Final Results: You have ${gameResult[0]} ${winForm}, 
            ${gameResult[1]} ${lossForm}, and ${gameResult[2]} ${tieForm}.`
            gameResult = [0,0,0,0];
        }
    });
});

function playRound(playerSelection) {
    let computerSelection = getComputerChoice();
    let result = getRoundResult(playerSelection,computerSelection);
    roundResult.textContent = printRoundResult(playerSelection,computerSelection,result);
    return result;
}

function getComputerChoice() {
    let choice = Math.floor(Math.random() * 3);
    let options = ["Rock","Paper","Scissors"];
    return options[choice];
}

function getRoundResult(playerSelection,computerSelection) {
    if(playerSelection === computerSelection) {
        return "tie";
    }
    else if((playerSelection === "Rock" && computerSelection === "Scissors") ||
            (playerSelection === "Scissors" && computerSelection === "Paper") ||
            (playerSelection === "Paper" && computerSelection === "Rock")){
                return "win";
            }
    else {
        return "lose";
    }   
}

function printRoundResult(playerSelection,computerSelection,result) {
    switch(result) {
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

function updateGameResult(roundResult,gameResult) {
    switch(roundResult) {
        case "win":
            gameResult[0]+=1;
            break;
        case "lose":
            gameResult[1]+=1;
            break;
        case "tie":
            gameResult[2]+=1;
    }
    gameResult[3]+=1;
    return gameResult;
}