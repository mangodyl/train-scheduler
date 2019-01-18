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

// Current time moment


// Function to add/remove all console logs. Just comment out console.log(messages).
function logs(...messages) {

  console.log(...messages);

};

$(document).ready(function() {

// Example train time calculations
var exFirstTime = "08:45";
var exFirstMom = moment(exFirstTime, 'HH:mm').subtract(1, "years");

var exCurrentTime = moment();

var exTimeDiff = exCurrentTime.diff(moment(exFirstMom), "minutes");
var exModuloTime = exTimeDiff % 60;

logs("exTimeDiff" + exTimeDiff);

var exMinsTill = 60 - exModuloTime;
logs("ex mins till: " + exMinsTill);
var exNextArrival = exCurrentTime.add(exMinsTill, "minutes");
logs ("ex arrival time: " + moment(exNextArrival).format('HH:mm'));

$("#ex-mins-away").text(exMinsTill);
$("#ex-next-train").text(moment(exNextArrival).format('HH:mm'));
  
});


// On click: stores new values in firebase & clears form

$(document).on("click", '#submit', function (event) {
  
  event.preventDefault();

  logs("ok");

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

database.ref().orderByChild("dateAdded").limitToLast(10).on("child_added", function (snapshot) {

  logs(snapshot);

  var train = $("<p>");
  var dest = $("<p>");
  var freq = $("<p>");

  train.attr('type', "text");
  dest.attr('type', "text");
  freq.attr('type', "number");
  
  var next = $("<p>");
  var till = $("<p>");

  train.text(snapshot.val().trainName);
  $("#train").append(train);

  dest.text(snapshot.val().destination);
  $("#dest").append(dest);

  freq.text(snapshot.val().frequency);
  $("#freq").append(freq);

  // Time calculations

  var tFreq = snapshot.val().frequency;

  var firstTime = snapshot.val().time;
  var momTime = moment(firstTime, 'HH:mm').subtract(1, "years");
  var currentTime = moment();

  // var currentTimeConv = moment(currentTime, 'HH:MM');


  logs(momTime);
  logs(currentTime);

  var timeDiff = currentTime.diff(moment(momTime), "minutes");
  var moduloTime = timeDiff % tFreq;

  logs(timeDiff);

  var minsTill = tFreq - moduloTime;
  logs("mins till train: " + minsTill);
  var nextArrival = currentTime.add(minsTill, "minutes");
  logs("arrival time: " + moment(nextArrival).format('HH:mm'));

  next.text(moment(nextArrival).format('HH:mm'));
  till.text(minsTill);

  $("#next").append(next);
  $("#min").append(till);

});
