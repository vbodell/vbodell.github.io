// TODO: read from json instead? And use that to get index.html data+firebase
const users = ["Göran",
"Linnea",
"Robert",
"Elin",
"Simon",
"Miriam",
"Victor",
"Karin"];

const dayZero = new Date(2019, 9, 14); // Month is 0-indexed
// const dayZero = new Date({{ site.start-date }}); // Month is 0-indexed
const kUsers = users.length;
const kChallengeDays = 40;

const kExpectedAverage = 10000;
const kStepLength = 0.587715;

const kOrigin = "Tåtorp";
const kDestination = "Tåtorp";
const kWaypoints = [{location: "Mariestad"},
                    {location: "Hällekis"},
                    {location: "Skara"},
                    {location: "Falköping"},
                    {location: "Hjo"},
                    {location: "Forsvik"}];

const useTotal = false;

const markerKeys = {
  harry: "harry",
  total: "total"
};

$(function(){
  initMarkerKeys();
  calcBasics(useTotal);
});

function initMarkerKeys() {
  // TODO: read from json instead?
  for (var ndx = 0; ndx < users.length; ndx++) {
    var name = users[ndx];
    markerKeys[name] = name;
    markers[name] = {desc: name, marker: null, label: name};
  }
}

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

function getHarryProgress(useTotal) {
  var curDayNdx = getCurrentDay()
  if (useTotal)
    return curDayNdx * kExpectedAverage * kUsers;
  return curDayNdx * kExpectedAverage;
}

function calcBasics(useTotal) {
  var day = getCurrentDay();
  day = day > kChallengeDays ? kChallengeDays : day;
  document.getElementById("day-number").innerText = "Dag " + day + "/" + kChallengeDays;

  if (useTotal)
    document.getElementById("scoreboard--aim-avg").innerText = kExpectedAverage * kUsers + " (" + kExpectedAverage + " per pers)";
  else
    document.getElementById("scoreboard--aim-avg").innerText = kExpectedAverage;

  document.getElementById("scoreboard--aim-total").innerText = getHarryProgress(useTotal);
  document.getElementById("scoreboard--aim-today").innerText = kExpectedAverage;

  var d = new Date();
  d = d >= dayZero ? d : dayZero;
  document.getElementById("step-submit--date").value = d.toISOString().slice(0,10);
}
