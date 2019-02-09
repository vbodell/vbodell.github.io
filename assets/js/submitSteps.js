document.getElementById("step-submit--submit-button").addEventListener("click", submitSteps);

function submitSteps() {
  var user = document.getElementById("step-submit--competitor").value;
  var steps = parseInt(document.getElementById("step-submit--steps").value);
  var label = document.getElementById("step-submit--warning-label");

  var tableEntries = document.getElementsByClassName("scoreboard--row");

  if (isNaN(steps)) {
    label.style["display"] = "inline";
  }
  else {
    label.style["display"] = "none";
    for (row in tableEntries) {
      for (var i = 0, row; row = tableEntries[i]; i++) {
        if (row.cells[0].innerText == user) {
          row.cells[1].innerText = steps;
          break;
        }
      }
    }
    // console.log(user + " submitted " + steps + " steps.");
    var d = new Date();
    writeStepEntry(user, user, d, steps);
  }
}
