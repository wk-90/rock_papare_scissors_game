//status gry
let gameState = 'notStarted';
// dane gracza i komputera
const player = {
    name: '',
    score: 0
}

const computer = {
    score: 0
}



// pobranie przycisku rozpoczynający grę
const newGamebtn = document.getElementById('js-newGameButton');



// naciśnięcie rozpoczęcia gry 
newGamebtn.addEventListener('click', newGame);

// wybory gracza - pobranie buttonów
const pickRock = document.getElementById('js-playerPick-rock');
const pickPaper = document.getElementById('js-playerPick-paper');
const pickScissors = document.getElementById('js-playerPick-scissors');



// Po wyborze gracza wywołana zostaje funkcja z parametrem reprezentującym wybór gracza
pickRock.addEventListener('click', ()=> {playerPick('rock')} );
pickPaper.addEventListener('click', ()=> {playerPick('paper')} );
pickScissors.addEventListener('click', ()=> {playerPick('scissors')} );




// zdefiniowanie zmiennych w celu dostosowania widoku za pomocą funkcji setGameElements
const newGameElem = document.getElementById('js-newGameElement');
const startGameElem = document.getElementById('js-startGameElement');
const pickElem = document.getElementById('js-playerPickElement');
const resultsElem = document.getElementById('js-resultsTableElement');



// zmiana widoku w zależności od statusy gry
function setGameElements() {
    switch(gameState) {
        case 'started':
            newGameElem.style.display = "none";
            pickElem.style.display = "block";
            resultsElem.style.display = "block";
            
            break;
        case 'ended':
            newGamebtn.innerText = "Jeszcze raz";
        case 'notStarted':
        default:
                newGameElem.style.display = "block";
                pickElem.style.display = "none";
                resultsElem.style.display = "none";
                

    }
}
//wywołanie funckji
setGameElements()

// zmienne odnoszące się do elementów, które będą aktualizowane
const playerPointsElem = document.getElementById('js-playerPoints');
const playerNameElem = document.getElementById('js-playerName');
const computerPointsElem = document.getElementById('js-computerPoints');

// Pobranie inputa do zmiennej
const input = document.querySelector('input');

// Uruchomienie gry po kliknięciu 'enter'
input.addEventListener('keyup', (e)=> {
    if(e.keyCode === 13) {
        newGame();
    }
})

// funkcja uruchamiana po wciśnięciu 'Nowa Gra'
function newGame(){
    player.name = input.value;
    if(player.name) {
        player.score = computer.score = 0;
        gameState = 'started'
        console.log('started');
        setGameElements();
        playerNameElem.innerText = player.name; 
        playerPointsElem.textContent = computerPointsElem.textContent = "0";
        playerPickElem.textContent = "";
        computerPickElem.textContent = "";
        playerResultElem.textContent = ""; 
        computerResultElem.textContent = "";
        winner.textContent = "";
       
    } else {
        alert('Musisz podać imię!')
    }
}




// funkcja losująca wybór komputera
function getComputerPick() {
    const possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

// pobranie do zmiennych pól do wypełnienia (wybory i wyniki gracza, komputera)
const playerPickElem = document.getElementById('js-playerPick');
const computerPickElem = document.getElementById('js-computerPick');
const playerResultElem = document.getElementById('js-playerResult');
const computerResultElem = document.getElementById('js-computerResult');

const winner = document.getElementById('js-winner');


//funkcja odpowiadająca za wybory gracza
function playerPick(playerPick) {
    console.log(playerPick);
    
    const computerPick = getComputerPick();
    console.log(computerPick);

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);
    endGame();
   
}

//Logika gry, przyznawanie punktów
function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = ""; //na początku usuwanie tekstu o wygranej któregoś z graczy

    let winnerIs = 'player';  //założenie że to my wygraliśmy

    if (playerPick == computerPick) {
        winnerIs = 'remis';
    } else if (
        (computerPick == 'rock' && playerPick == 'scissors') ||
        (computerPick == 'scissors' && playerPick == 'paper') ||
        (computerPick == 'paper' && playerPick == 'rock')) {
        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Wygrana!";
        player.score++;
        playerPointsElem.innerText = player.score;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Wygrana!"
        computer.score++;
        computerPointsElem.innerText= computer.score;
    }

}

// Koniec gry

function endGame() {
    
    if(player.score == 10)  {
        
        console.log('koniec gry');
        winner.innerText = ` ${player.name}`;
        newGameElem.style.display = "block";
        player.score = 0;
        computer.score = 0;
        winner.style.color = "green";
        pickElem.style.display = "none";

        
        
    } else if (computer.score == 10) {
        
        console.log('koniec gry');
        winner.innerText = ' Komputer';
        newGameElem.style.display = "block";
        player.score = 0;
        computer.score = 0;
        winner.style.color = "red";
        pickElem.style.display = "none";
        
    }
}


// efekty na przyciskach wyboru
const buttons = document.querySelectorAll('#js-playerPickElement button');

buttons.forEach(btn => btn.addEventListener('mousedown', ()=>{
    btn.style.fontSize = "18px";     
})
)

buttons.forEach(btn => btn.addEventListener('mouseup', ()=>{
    btn.style.fontSize = "16px";
}))


