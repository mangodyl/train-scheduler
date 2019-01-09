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

  database.ref().on("value", function (snapshot) {

    console.log(snapshot);

  });

$("#submit").click(function (event) {
    event.preventDefault();

    var newTrain = $("#new-train").val().trim();
    var newDest = $("#new-dest").val().trim();
    var newTime = parseInt($("#new-time").val().trim());
    var newFreq = parseInt($("#new-freq").val().trim());

    database.ref();

});