// Initialize Firebase
var config = {
  apiKey: "AIzaSyB_MgJu59u48N-npAPylOw9KSd_I2jxD18",
  authDomain: "rantan-stepcount.firebaseapp.com",
  databaseURL: "https://rantan-stepcount.firebaseio.com",
  projectId: "rantan-stepcount",
  storageBucket: "rantan-stepcount.appspot.com",
  messagingSenderId: "138492714460"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();
readData();

function readData() {
  var stepsRef = firebase.database().ref('steps');
  stepsRef.on('value', function(snapshot) {
    updateScoreboard(snapshot.val(), useTotal);
  });
}

function writeUser(userId, name) {
  firebase.database().ref('users/' + userId).set({
    username: name
  });
}

function writeStepEntry(userId, name, date, steps) {
  writeUser(userId, name);
  var submitTime = date.getTime();
  var submitDate = date.toISOString().slice(0,10);
  firebase.database().ref('steps/' + userId + "/" + submitDate).set({
    username: name,
    time: submitTime,
    steps: steps
  });
}

function updateScoreboard(data, updateTotal) {
  var scoreboard = document.getElementById("scoreboard");
  var totalEntry = document.getElementById("scoreboard--total-steps");
  var totalAvgLabel = document.getElementById("scoreboard--total-steps-avg");
  var todayAvgLabel = document.getElementById("scoreboard--total-steps-today");

  var totalSteps = {};
  var todaysSteps = {};
  var runningTotal = 0;
  var curDay = getCurrentDay();
  var curDay = curDay > 0 ? curDay : 1;

  var todaysTotal = 0;
  var d = new Date();
  var todaysDate = d.toISOString().slice(0,10);

  for (user in data) {
    totalSteps[user] = 0;
    todaysSteps[user] = 0;
    for (entry in data[user]) {
      totalSteps[user] += data[user][entry]['steps'];
      if (entry == todaysDate) {
        todaysSteps[user] = data[user][entry]['steps'];
        todaysTotal += todaysSteps[user];
      }
    }

    for (var i = 0, row; row = scoreboard.rows[i]; i++) {
      if (user == row.cells[0].innerText) {
        row.cells[1].innerText = totalSteps[user];
        row.cells[2].innerText = parseInt(totalSteps[user] / curDay);
        row.cells[3].innerText = todaysSteps[user];
      }
    }

    runningTotal += totalSteps[user];
  }
  totalEntry.innerText = runningTotal;
  totalAvgLabel.innerText = parseInt(runningTotal / curDay) + " (" + parseInt(runningTotal / (curDay * kUsers)) + " per pers)";
  todayAvgLabel.innerText = todaysTotal;

  if (updateTotal)
    updateMap(markerKeys.total, runningTotal);
  else {
    for (var user in data) {
      updateMap(markerKeys[user], totalSteps[user]);
    }
  }
}
