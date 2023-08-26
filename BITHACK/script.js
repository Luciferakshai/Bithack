window.onload = function () {
  document.getElementById("tunesNumber").innerHTML = tunes.length
  window.doneSongs = []
}

function play() {
  //setup song
  window.song = tunes[Math.floor(Math.random() * tunes.length)];
  doneSongs.push(song[0][0])
  document.getElementById("onLoad").className = "hidden";
  document.getElementById("playing").style.display = "block"
  if (song[1][0] == "") {
      document.getElementById("artist").style.display = "none"
  }
  else {
      document.getElementById("points").innerHTML += " + 1000"
  }
  Tone.Transport.bpm.value = song[2]
}

function addNote() {
  window.notes = Number(document.getElementById("notes").innerHTML)+1;
  if (notes <= song[3].length) {
      document.getElementById("notes").innerHTML = String(notes);
      document.getElementById("points").innerHTML = "Points available: " + String(Math.round(1000/(notes-1)));
      if (song[1][0] != "") {
          document.getElementById("points").innerHTML += " + " + String(Math.round(1000/(notes-1)));
      }
  };
  if (notes == song[3].length) {
      document.getElementById("addNote").disabled = true;
  };
};

function playTune() {
  try { part.dispose() }
  catch { };

  window.synth = new Tone.Synth().toMaster();

  //sets up the tune
  tune = song[3].slice(0, document.getElementById("notes").innerHTML);
  window.part = new Tone.Part(function(time, event) {
      synth.triggerAttackRelease(event.note, event.dur, time);
  }, tune);

  //start the part at the beginning of the Transport's timeline
  part.start(0);

  //restart the transport
  Tone.Transport.stop()
  Tone.Transport.start()
}

function submit() {
  var pointsScored = Number(0);

  var songCorrect = false;
  var songEntry = document.getElementById("song").value.toLowerCase();
  var options = song[0];
  for (var i = 0; i < options.length; i++) {
      option = options[i].toLowerCase();
      if (option == songEntry || songEntry.startsWith(option)) {
          songCorrect = true;
          break
      }
  }
  if (songCorrect == true) {
      document.getElementById("song").value += " ✓";
      document.getElementById("song").readOnly = true;
      document.getElementById("song").style.color = "green";
      if (notes > 2) {
          pointsScored += Math.round(1000/(notes-1));
      }
      else {
          pointsScored += 1000;
      }
      console.log(Math.round(1000/(notes-1)));
  }
  else {
      document.getElementById("song").value += " ✖   " + song[0][0];
      document.getElementById("song").readOnly = true;
      document.getElementById("song").style.color = "red";
  }

  if (song[1][0] != "") {
      var artistCorrect = false;
      var artistEntry = document.getElementById("artist").value.toLowerCase();
      var options = song[1];
      for (var i = 0; i < options.length; i++) {
          option = options[i].toLowerCase();
          if (option == artistEntry || artistEntry.startsWith(option)) {
              artistCorrect = true;
              break
          }
      }
      if (artistCorrect == true) {
          document.getElementById("artist").value += " ✓";
          document.getElementById("artist").readOnly = true;
          document.getElementById("artist").style.color = "green";
          if (notes > 2) {
              pointsScored += Math.round(1000/(notes-1));
          }
          else {
              pointsScored += 1000;
          }
      }
      else {
          document.getElementById("artist").value += " ✖   " + song[1][0];
          document.getElementById("artist").readOnly = true;
          document.getElementById("artist").style.color = "red";
      }
  }

  document.getElementById("playTune").disabled = true;
  document.getElementById("addNote").disabled = true;
  document.getElementById("next").style.display = "block";
  document.getElementById("submit").style.display = "none";
  document.getElementById("points").innerHTML = "Points scored: " + String(pointsScored);

  score = Number(document.getElementById("pointsScored").innerHTML) + pointsScored;
  document.getElementById("pointsScored").innerHTML = String(score);

  scoreAvailable = Number(document.getElementById("pointsAvailable").innerHTML) + 1000;
  if (song[1][0] != "") {
      scoreAvailable += 1000
  }
  document.getElementById("pointsAvailable").innerHTML = String(scoreAvailable);

  if (score > 0) {
      document.getElementById("saveScore").style.display = "block";
  }

}

function next() {
  delete song;

  if (doneSongs.length == tunes.length) {
      doneSongs = []
      alert("You have gone through all the songs! Just to let you know :) Feel free to leave an upvote for the replit music jam, it would really help! Thanks.")
  }

  window.song = tunes[Math.floor(Math.random() * tunes.length)];
  while (doneSongs.includes(song[0][0])) {
      window.song = tunes[Math.floor(Math.random() * tunes.length)];
  }
  doneSongs.push(song[0][0]);

  Tone.Transport.bpm.value = song[2]

  document.getElementById("notes").innerHTML = 2;
  window.notes = 2;
  document.getElementById("points").innerHTML = "Points available: 1000";
  if (song[1][0] == "") {
      document.getElementById("artist").style.display = 'none'
  }
  else {
      document.getElementById("points").innerHTML += " + 1000"
      document.getElementById("artist").style.display = "block"
  }

  document.getElementById("playTune").disabled = false;
  document.getElementById("addNote").disabled = false;

  document.getElementById("song").readOnly = false;
  document.getElementById("song").value = "";
  document.getElementById("song").style.color = "steelblue";
  document.getElementById("artist").readOnly = false;
  document.getElementById("artist").value = "";
  document.getElementById("artist").style.color = "steelblue";

  document.getElementById("next").style.display = "none";
  document.getElementById("submit").style.display = "block";
}

function saveScore() {
  document.getElementById("playing").style.display = "none";
  document.getElementById("saveToLeaderboard").classList.remove("hidden");
  document.getElementById("saveToLeaderboard").style.display = "block";

  score = document.getElementById("pointsScored").innerHTML
  document.getElementById("insertScore").innerHTML = score;
  scoreAvailable = document.getElementById("pointsAvailable").innerHTML
  document.getElementById("insertScoreAvailable").innerHTML = scoreAvailable;
  document.getElementById("insertAccuracy").innerHTML = Math.round((Number(score) / Number(scoreAvailable)) * 100);
  fillLeaderboard(86400000);
}

function fillLeaderboard(timeAgo) {
  // Works out which ones should go in the leaderboard
  var currentTime = new Date().getTime();
  top5 = leaderboardDatabase.filter( function(a) {
      return (currentTime - a.time < timeAgo);
  }).sort( function(a, b) { 
      return b.score - a.score;
  }).slice(0, 5);

  // Puts them in the leaderboard
  if (timeAgo == 86400000) {
      document.getElementById("innerLeaderboard").style.backgroundColor = 'lightsalmon'
  }
  else if (timeAgo == 604800000) {
      document.getElementById("innerLeaderboard").style.backgroundColor = '#C299A1'
  }
  else {
      document.getElementById("innerLeaderboard").style.backgroundColor = '#3E4053'
  }

  if (top5.length == 0) {
      if (timeAgo == 86400000) {
          for (var i=0; i<5; i++) {
              document.getElementsByClassName("leftText")[i].innerHTML = "-";
              document.getElementsByClassName("leftText")[i].style.color = 'lightsalmon';
              document.getElementsByClassName("rightText")[i].innerHTML = "-";
              document.getElementsByClassName("rightText")[i].style.color = 'lightsalmon';
          }
          document.getElementsByClassName("leftText")[2].innerHTML = "No-one has played yet today...";
          document.getElementsByClassName("leftText")[2].style.color = 'white'
      }
      else if (timeAgo == 604800000) {
          for (var i=0; i<5; i++) {
              document.getElementsByClassName("leftText")[i].innerHTML = "-";
              document.getElementsByClassName("leftText")[i].style.color = '#C299A1';
              document.getElementsByClassName("rightText")[i].innerHTML = "-";
              document.getElementsByClassName("rightText")[i].style.color = '#C299A1';
          }
          document.getElementsByClassName("leftText")[2].innerHTML = "No-one has played yet this week...";
          document.getElementsByClassName("leftText")[2].style.color = 'white'
      }
  }
  else { for (var i = 0; i < 5; i++) {
      if (i == 0) {
          document.getElementsByClassName("leftText")[i].style.color = 'gold';
          document.getElementsByClassName("rightText")[i].style.color = 'gold';
      }
      else if (i == 1) {
          document.getElementsByClassName("leftText")[i].style.color = 'silver';
          document.getElementsByClassName("rightText")[i].style.color = 'silver';
      }
      else if (i == 2) {
          document.getElementsByClassName("leftText")[i].style.color = 'brown';
          document.getElementsByClassName("rightText")[i].style.color = 'brown';
      }
      else {
          document.getElementsByClassName("leftText")[i].style.color = 'white';
          document.getElementsByClassName("rightText")[i].style.color = 'white';
      }
      document.getElementsByClassName("leftText")[i].innerHTML = String(i+1)+": "+top5[i].name;
      document.getElementsByClassName("rightText")[i].innerHTML = top5[i].score;
  } }
}

function getLeaderboard() {
  return fetch('https://www.jsonstore.io/19c1f027d2dc1799227775a20db446ab64b0eb2ce4ab56a8b91e2e895a36934e')
  .then(function(response) {
      console.log("Success!", response);
  }).catch(function(error) {
      console.log("Failed!", error);
  })
}

function putLeaderboard(leaderboard) {
  fetch('https://www.jsonstore.io/19c1f027d2dc1799227775a20db446ab64b0eb2ce4ab56a8b91e2e895a36934e/leaderboard', {
      headers: {
          'Content-type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(leaderboard),
  }).then(function(response) {
      console.log("Success!", response);
  }).catch(function(error) {
      console.log("Failed!", error);
  })
}

function postLeaderboard(leaderboard) {
  fetch('https://www.jsonstore.io/19c1f027d2dc1799227775a20db446ab64b0eb2ce4ab56a8b91e2e895a36934e', {
      headers: {
          'Content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({leaderboard: leaderboard})
  }).then(function(response) {
      console.log("Success!", response);
  }).catch(function(error) {
      console.log("Failed!", error);
  })
}