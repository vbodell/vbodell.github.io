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
    updateScoreboard(snapshot.val());
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
  var submitDate = date.getUTCFullYear() + "-" + date.getUTCMonth() + "-" + date.getUTCDate();
  firebase.database().ref('steps/' + userId + "/" + submitDate).set({
    username: name,
    time: submitTime,
    steps: steps
  });
}

function updateScoreboard(data) {
  var scoreboard = document.getElementById("scoreboard");
  var totalEntry = document.getElementById("scoreboard--total-steps");

  var totalSteps = {};
  var runningTotal = 0;

  for (user in data) {
    totalSteps[user] = 0;
    for (entry in data[user])
      totalSteps[user] += data[user][entry]['steps'];

    for (var i = 0, row; row = scoreboard.rows[i]; i++) {
      if (user == row.cells[0].innerText)
        row.cells[1].innerText = totalSteps[user];
    }

    runningTotal += totalSteps[user];
  }
  totalEntry.innerText = runningTotal;
  updateMap(markerKeys.total, runningTotal);
}
