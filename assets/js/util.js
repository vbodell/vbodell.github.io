const dayZero = new Date(2019, 1, 11);
const kUsers = 8;
const kChallengeDays = 4;
const kExpectedAverage = 8750;
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
  var curDay = parseInt((today - dayZero) / (1000*60*60*24));
  console.log("Today is " + curDay);

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
  var day = getCurrentDay() + 1; // Use +1 for display, but not averages
  day = day > kChallengeDays ? kChallengeDays : day;
  document.getElementById("day-number").innerText = "Dag " + day + "/" + kChallengeDays;
  document.getElementById("scoreboard--aim-avg").innerText = kExpectedAverage * kUsers + " (" + kExpectedAverage + " per pers)";
  document.getElementById("scoreboard--aim-total").innerText = getHarryProgress();

  var d = new Date();
  d = d >= dayZero ? d : dayZero;
  document.getElementById("step-submit--date").value = d.toISOString().slice(0,10);
}
