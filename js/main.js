var myVar;

function myFunction() {
    myVar = setTimeout(showPage, 3000);
}

function showPage() {
    document.getElementById("mdb-preloader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
}

var num = 0,
    newMark = 0,
    playerDetails = [],
    finalScore = 0,
    diePic = "",
    pos = 0;

function PlayersInfo(name, score, totalScore) {
    this.playerNames = name;
    this.playerMarks = score;
    this.totalScores = totalScore;
}
var genRandom = function() {
    randomNo = Math.floor(Math.random() * 6) + 1;
    return randomNo;
}
PlayersInfo.prototype.AddScores = function(thisMark) {
    if (thisMark === 1) {
        this.playerMarks = 0;
    } else if (thisMark !== 1) {
        this.playerMarks = this.playerMarks + thisMark;
    }
    return this.playerMarks;
}
PlayersInfo.prototype.Total = function(total) {
    return this.totalScores = this.totalScores + total;
}
var getDieSide = function(getInput) {
    if (getInput == 1) diePic = "1";
    else if (getInput == 2) diePic = "2";
    else if (getInput == 3) diePic = "3";
    else if (getInput == 4) diePic = "4";
    else if (getInput == 5) diePic = "5";
    else if (getInput == 6) diePic = "6";

    return diePic;
}

function reset() {
    pos = 0;
    PlayersInfo.playerMarks = 0;
    PlayersInfo.totalScores = 0;
    $("#image-die").html("");
    $("p.text-uppercase").text("");
    $("h1").text("0");
    $(".cumulative").text("");
}

$(document).ready(function() {
    $("#reset").click(function() {
        reset();
        $("#hold").show();
        $("#roll-dice").show();
        $("#content1").addClass("player-turn");
        // console.log(finalScore);
    })
});