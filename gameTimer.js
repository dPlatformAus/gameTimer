var timer; 
var timeLength = 3000; // tenths of a second ... secs=5*60
var gameTime = 0;
var currentPlayer = 0;
var playerRight = 1;
var playerLeft = 2;
var playerRightTime, playerLeftTime
var playerRightRed, playerLeftRed
var playerRightGreen, playerLeftGreen
var playerRightBlue, playerLeftBlue
var colourFactor

function intToHex(n) { 
    var hex = Number(n).toString(16);
    if (hex.length < 2) {
         hex = "0" + hex;
    }
    return hex;
  };

function getHexColour(r,g,b){
    var red = intToHex(Math.floor(r));
    var green = intToHex(Math.floor(g));
    var blue = intToHex(Math.floor(b));
    return red+green+blue;

}

function getTimeStr(inTime){
    return new Date(inTime * 100).toISOString().substr(11, 10)
}

function bodyLoad() {
    $('#timeLength').val(timeLength/10)
    initGame()
}

function initGame() {
    currentPlayer = 0;
    gameTime = 0;
    timeLength=$('#timeLength').val()*10;
    playerRightTime = timeLength;
    playerLeftTime = timeLength;
    colourFactor = 400/timeLength
    playerRightRed = playerLeftRed = 25
    playerRightGreen = playerLeftGreen = 225
    playerRightBlue = playerLeftBlue = 25
    $('#playerLeftTime').text(getTimeStr(playerLeftTime));
    $('#playerRightTime').text(getTimeStr(playerRightTime));
    $('#totalTime').text(getTimeStr(gameTime));
    $('#button-left').css('background','#' + getHexColour(playerLeftRed, playerLeftGreen, playerLeftBlue))
    $('#button-right').css('background','#' + getHexColour(playerRightRed, playerRightGreen, playerRightBlue))
}

function startGame(){
    timer = setInterval(updateTimer, 100);
}

function endGame(){
    clearInterval(timer);
}

function resetGame(){
    if (currentPlayer > 0) {
        endGame();
    }
    initGame();
}

function  timePlayerRight() {
    if (currentPlayer == 0) {
        startGame();
    }
    currentPlayer = playerRight;
}

function  timePlayerLeft() {
    if (currentPlayer == 0) {
        startGame();
    }    
    currentPlayer = playerLeft;
}

function updateTimer() {
    gameTime += 1
    if (currentPlayer == playerRight) {
        playerRightTime -= 1;
        if (playerRightRed < 225) {
            playerRightRed += colourFactor;
        } else {
            playerRightGreen -= colourFactor;
        }
        $('#button-right').css('background','#' + getHexColour(playerRightRed, playerRightGreen, playerRightBlue))
        $('#button-left').css('background','#' + getHexColour(playerLeftRed/2, playerLeftGreen/2, playerLeftBlue/2))
    }
    if (currentPlayer == playerLeft) {
        playerLeftTime -= 1;
        if (playerLeftRed < 225) {
            playerLeftRed += colourFactor;
        } else {
            playerLeftGreen -= colourFactor;
        }
        $('#button-right').css('background','#' + getHexColour(playerRightRed/2, playerRightGreen/2, playerRightBlue/2))
        $('#button-left').css('background','#' + getHexColour(playerLeftRed, playerLeftGreen, playerLeftBlue))
    }
    $('#playerLeftTime').text(getTimeStr(playerLeftTime));
    $('#playerRightTime').text(getTimeStr(playerRightTime));
    $('#totalTime').text(getTimeStr(gameTime));
    if (playerRightTime == 0 || playerLeftTime == 0){
        endGame();
    }
}