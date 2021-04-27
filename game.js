
var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];

var gameStarted=false;
var level=1;

function randomRange(m,n){
    var randomNumber=Math.floor(Math.random()*(n-m+1)+m);
    return randomNumber;
}

function playAudio(nameOfAudio){
    var audio=new Audio("sounds/"+nameOfAudio+".mp3");
    audio.play();
}

function pressed(nameOfButton){
    $(nameOfButton).addClass("pressed");
    setTimeout(function(){
        $(nameOfButton).removeClass("pressed");
    }, 100);
}

function nextSequence(){
    var randomNumber=randomRange(0,3);
    randomColor=buttonColors[randomNumber];
    gamePattern.push(randomColor);
    console.log("Game="+gamePattern);
    playAudio(randomColor);
    var randomButton="."+randomColor;
    pressed(randomButton);
    $("h1").text("level "+level);
    level++;
    userClickedPattern=[];
}

$(".btn").click(function(){
    var userChosenColor=this.classList[1];
    pressed("."+userChosenColor);
    playAudio(userChosenColor);
    userClickedPattern.push(userChosenColor);
    console.log("User ="+userClickedPattern);
    console.log(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});


$(document).keydown(function(event){
    if (!gameStarted && event.key==="Enter"){
        nextSequence();
        gameStarted=true;
    }
});

function checkAnswer(currentLevel){
    console.log(currentLevel);
        if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){
            console.log("success");
            if(userClickedPattern.length===gamePattern.length){
                setTimeout(nextSequence,1000);
            }
        }
        else{
            console.log("Failed");
            $("h1").text("Game Over!!! Press 'Enter' to restart.");
            $("body").addClass("red");
            setTimeout(function(){
                $("body").removeClass("red");
            },100);
            
            startOver();
        }
}


function startOver(){
    userClickedPattern=[];
    gamePattern=[];
    gameStarted=false;
    level=1;
}