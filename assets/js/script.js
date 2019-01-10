// Initialize Firebase
var config = {
  apiKey: "AIzaSyDVT_z4sfrvwIkgzWAs1eaG1UOW8lPar8c",
  authDomain: "train-scheduler-m.firebaseapp.com",
  databaseURL: "https://train-scheduler-m.firebaseio.com",
  projectId: "train-scheduler-m",
  storageBucket: "train-scheduler-m.appspot.com",
  messagingSenderId: "44735770926"
};
firebase.initializeApp(config);

var database = firebase.database();


// On click: stores new values in firebase & clears form

$(document).on("click", '#submit', function (event) {
  
  event.preventDefault();

  console.log("ok");

  var newTrain = $("#new-train").val().trim();
  var newDest = $("#new-dest").val().trim();
  var newTime = $("#new-time").val().trim();
  var newFreq = parseInt($("#new-freq").val().trim());

  function newTrainFunc (insTrain, insDest, insTime, insFreq) {
    database.ref().push({

      trainName: insTrain,
      destination: insDest,
      time: insTime,
      frequency: insFreq,
      dateAdded: firebase.database.ServerValue.TIMESTAMP

    });
  };

  newTrainFunc (newTrain, newDest, newTime, newFreq);

  $("#new-train").val("");
  $("#new-dest").val("");
  $("#new-time").val("");
  $("#new-freq").val("");


});

// Calculations go here

// ------------------------------------

// On addition of new value or page load, add new train to table via element creation & firebase read

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {

  console.log(snapshot);

  var train = $("<p>");
  var dest = $("<p>");
  var freq = $("<p>");
  
  var next = $("<p>");
  var till = $("<p>");

  train.text(snapshot.val().trainName);
  // append to table

  dest.text(snapshot.val().destination);
  // append to table

  freq.text(snapshot.val().frequency);
  // append to table

  // add calculation variables to 'next' and 'till', then append

});
