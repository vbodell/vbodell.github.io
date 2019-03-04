const dayZero = new Date(2019, 2, 6);
const kUsers = 8;
const kChallengeDays = 40;
const kExpectedAverage = 10000;
const kOrigin = "Räntans Gård";
const kDestination = "Synålsvägen 19, Bromma";

const markerKeys = {
  harry: "harry",
  total: "total"
};

$(function(){
  calcBasics();
});

function getCurrentDay() {
  var today = new Date();
  // Get current day number, rounded down
  var curDay = parseInt((today - dayZero) / (1000*60*60*24) + 1);

  if (curDay > kChallengeDays)
    curDay = kChallengeDays;
  else if (curDay < 0)
    curDay = 0;

  return curDay;
}

function getHarryProgress() {
  var curDayNdx = getCurrentDay()
  return curDayNdx * kExpectedAverage * kUsers;
}

function calcBasics() {
  var day = getCurrentDay();
  day = day > kChallengeDays ? kChallengeDays : day;
  document.getElementById("day-number").innerText = "Dag " + day + "/" + kChallengeDays;
  document.getElementById("scoreboard--aim-avg").innerText = kExpectedAverage * kUsers + " (" + kExpectedAverage + " per pers)";
  document.getElementById("scoreboard--aim-total").innerText = getHarryProgress();
  document.getElementById("scoreboard--aim-today").innerText = kExpectedAverage;

  var d = new Date();
  d = d >= dayZero ? d : dayZero;
  document.getElementById("step-submit--date").value = d.toISOString().slice(0,10);
}
