const dayZero = new Date(2019, 1, 5);
const kUsers = 8;
const kChallengeDays = 40;
const kExpectedAverage = 10000;

const markerKeys = {
  harry: "harry",
  total: "total"
};

calcHarry();

function getCurrentDay() {
  var today = new Date();
  // Get current day number, rounded down
  var curDay = parseInt((today - dayZero) / (1000*60*60*24));

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

function calcHarry() {
  document.getElementById("scoreboard--aim-avg").innerText = kExpectedAverage * kUsers + " (" + kExpectedAverage + " per pers)";
  document.getElementById("scoreboard--aim-total").innerText = getHarryProgress();
}
