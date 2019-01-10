// Initialize Firebase
var config = {
  apiKey: "AIzaSyC6OcB6cZ3_VMNZcS24sxf1zHUBktnbmDo",
  authDomain: "train-scheduler-demo.firebaseapp.com",
  databaseURL: "https://train-scheduler-demo.firebaseio.com",
  projectId: "train-scheduler-demo",
  storageBucket: "train-scheduler-demo.appspot.com",
  messagingSenderId: "1034003993438"
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


// On addition of new value or page load, add new train to table via element creation & firebase read

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {

  console.log(snapshot);

});
