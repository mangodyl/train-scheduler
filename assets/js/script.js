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


// On addition of new value or page load, add new train to table via element creation & firebase read

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {

  console.log(snapshot);

  var train = $("<p>");
  var dest = $("<p>");
  var freq = $("<p>");

  train.attr('type', "text");
  dest.attr('type', "text");
  freq.attr('type', "number");
  
  var next = $("<p>");
  var till = $("<p>");

  till.attr('type', "number");

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


  console.log(momTime);
  console.log(currentTime);

  var timeDiff = currentTime.diff(moment(momTime), "minutes");
  var moduloTime = timeDiff % tFreq;

  console.log(timeDiff);

  var minsTill = tFreq - moduloTime;
  console.log("mins till train: " + minsTill);
  var nextArrival = currentTime.add(minsTill, "minutes");
  console.log("arrival time: " + moment(nextArrival).format('HH:mm'));

  next.text(moment(nextArrival).format('HH:mm'));
  till.text(minsTill);

  $("#next").append(next);
  $("#min").append(till);

  // Example train time calculations
  var exFirstTime = "08:45";
  var exFirstMom = moment(exFirstTime, 'HH:mm').subtract(1, "years");

  

});
