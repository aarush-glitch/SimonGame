var buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function() {
    if(!started) {
        $("#level-title").text("Level "+ level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1, gamePattern.length-1);
});

function nextSequence() {
    level++;

    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);

    playSound(randomChosenColour);
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    $("#" + name).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function checkAnswer(currentLevel, gameLevel) {
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]) {
        console.log("success");
        if(currentLevel===gameLevel) {
            setTimeout(function() {
                nextSequence();
                userClickedPattern.length = 0;
            }, 1000);  
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200);
        setTimeout(function() {
            $("#level-title").text("Game-over, Press A Key to Start");
            gamePattern.length = 0;
            userClickedPattern.length = 0;
            started = false;
            level = 0;
        }, 1000);
    }
}