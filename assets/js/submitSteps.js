$(function(){
  document.getElementById("step-submit--submit-button").addEventListener("click", submitSteps);
});

function submitSteps() {
  var user = document.getElementById("step-submit--competitor").value;
  var steps = parseInt(document.getElementById("step-submit--steps").value);
  var submitDate = new Date(document.getElementById("step-submit--date").value);
  var label = document.getElementById("step-submit--warning-label");

  var tableEntries = document.getElementsByClassName("scoreboard--row");

  if (isNaN(steps)) {
    label.style.color = "red";
  }
  else {
    label.style.color = "white";
    for (row in tableEntries) {
      for (var i = 0, row; row = tableEntries[i]; i++) {
        if (row.cells[0].innerText == user) {
          row.cells[1].innerText = steps;
          break;
        }
      }
    }
    // console.log(user + " submitted " + steps + " steps.");
    writeStepEntry(user, user, submitDate, steps);
    var alertMsg = steps + " steg";

    if (steps < kExpectedAverage / 2)
      alertMsg += ", fortsätt kämpa ";
    else if (steps < kExpectedAverage)
      alertMsg += ", nästan där ";
    else if (steps > kExpectedAverage * 1.5)
      alertMsg += "! Otroligt bra jobbat ";
    else
      alertMsg += ", snyggt ";

    alertMsg += user + "!";
    alert(alertMsg);
  }
}
