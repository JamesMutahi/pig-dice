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