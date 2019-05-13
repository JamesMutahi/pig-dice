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
    $("#player-names").submit(function(event) {
        event.preventDefault();
        num++;
        if (num > 2) {
            alert("Players cannot exceed 2!");
            playerDetails = [];
            num = 0;
            console.log(playerDetails);
            reset();
        } else if (num == 2) {
            $("#input-details").modal('hide');
        }
        var inputtedName = $("#name-player").val();
        var newPlayer = new PlayersInfo(inputtedName, 0, 0);
        playerDetails.push(newPlayer);
        $("#content1").addClass("player-turn");
        // console.log(playerDetails);
        $("#content" + num + " h2").html("<span class=player" + num + ">" + newPlayer.playerNames + "</span>");

        $("#name-player").val("");
    });
    $("#roll-dice").click(function() {
        if (num == 2) {
            var switchPlayer;
            var getRandom = genRandom();
            var getPlayerId = playerDetails[pos];
            getPlayerId.AddScores(getRandom);
            if (getRandom == 1 && pos == 0) {
                $("#content" + (pos + 1) + " h4").text("0");
                $("#content" + (pos + 1)).removeClass("player-turn");
                $("#image-die").html("");
                pos = 1;
                switchPlayer = playerDetails[pos];
                $("p.text-uppercase").html("Oooops, You rolled a 1. <br>" + switchPlayer.playerNames + "'s turn");
                // alert("Oooops, You rolled a 1. " + switchPlayer.playerNames + "'s turn");
                $("#content" + (pos + 1)).addClass("player-turn");
            } else if (getRandom == 1 && pos == 1) {
                $("#content" + (pos + 1) + " h4").text("0");
                $("#content" + (pos + 1)).removeClass("player-turn");
                $("#image-die").html("");
                pos = 0;
                switchPlayer = playerDetails[pos];
                $("p.text-uppercase").html("Oooops, You rolled a 1. <br>" + switchPlayer.playerNames + "'s turn");
                // alert("Oooops, You rolled a 1. " + switchPlayer.playerNames + "'s turn");
                $("#content" + (pos + 1)).addClass("player-turn");
            } else if (getRandom > 1) {
                newMark = getPlayerId.playerMarks;
                $("p.text-uppercase").text("");
                $("#content" + (pos + 1) + " h4").text(newMark);
                $("#image-die").html(getDieSide(getRandom))
            }
            console.log(getRandom + " " + pos + " " + newMark);
        } else if (num == 1) {
            alert("Player 2 Name Required");
            $("#input-details").modal();
        } else if (num == 0) {
            alert("Players' Names Required");
            $("#input-details").modal();
        }
    });
    $("#hold").click(function() {
        if (num == 2) {
            var getPlayerId = playerDetails[pos];
            newMark = getPlayerId.playerMarks;
            getPlayerId.Total(newMark);
            finalScore = getPlayerId.totalScores;
            console.log(finalScore);
            //Make the total become 0;//Final score, This Round, Dice Value
            getPlayerId.playerMarks = 0;
            $("#content" + (pos + 1) + " h4").text("0");
            $("#content" + (pos + 1) + " h1").text(finalScore);
            $("#image-die").html("");
            if (pos == 0) {
                $("#content" + (pos + 1)).removeClass("player-turn");
                pos = 1;
                $("#content" + (pos + 1)).addClass("player-turn");
            } else if (pos == 1) {
                $("#content" + (pos + 1)).removeClass("player-turn");
                pos = 0;
                $("#content" + (pos + 1)).addClass("player-turn");
            }
            if (finalScore > 99) {
                playerDetails[0].totalScores = 0;
                playerDetails[1].totalScores = 0;
                $(".winner-text").html("<h3 class = 'text-uppercase'>" + getPlayerId.playerNames + " HAS WON!!!</h3>")
                $("#winner-modal").modal();
                // alert(getPlayerId.playerNames + " has won!!");
                $("#hold").hide();
                $("#roll-dice").hide();
                $("#reset").show();
                $("#content1").removeClass("player-turn");
                $("#content2").removeClass("player-turn");
            }
        } else if (num == 1) {
            alert("Player 2 Name Required");
            $("#input-details").modal();
        } else if (num == 0) {
            alert("Players' Names Required");
            $("#input-details").modal();
        }
    });
});