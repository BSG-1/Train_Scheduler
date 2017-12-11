// Initialize Firebase
var config = {
    apiKey: "AIzaSyDXMiByuVJBzWTOjx3C1mxNopn6iwEAeH4",
    authDomain: "train-scheduler1.firebaseapp.com",
    databaseURL: "https://train-scheduler1.firebaseio.com",
    storageBucket: "train-scheduler1.appspot.com",
};

firebase.initializeApp(config);

var database = firebase.database();

$("#train-btn").on("click", function(event){
	event.preventDefault();

	//grab user inputs
	var trainName = $("#train-name").val().trim();
	var destination = $("#destination").val().trim();
	var firstTrainTime = moment($("#first-train").val().trim(), "hh:mm").format("hh:mm");
	var frequency = $("#frequency").val().trim();

	//create local 'temporary' object for holding train data
	var newTrain = {
		Name: trainName,
		Destination: destination,
		FirstTrainTime: firstTrainTime,
		Frequency: frequency
	};

	//upload train data to firebase database
	database.ref().push(newTrain);

	//console log everything
	console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(newTrain.firstTrainTime);
	console.log(newTrain.frequency);

	//alert successful add
	alert("Train added to schedule!");

	//clear text boxes
	$("#train-name").val("");
	$("#destination").val("");
	$("#first-train").val("");
	$("#frequency").val("");

});

database.ref().on("child_added", function(childSnapshot, prevChildKey){
	console.log(childSnapshot.val());

	//store to variable
	var trainName = childSnapshot.val().Name;
	var destination = childSnapshot.val().Destination;
	var firstTrainTime = childSnapshot.val().FirstTrainTime;
	var frequency = childSnapshot.val().Frequency;

	//train info
	console.log(trainName);
	console.log(destination);
	console.log(firstTrainTime);
	console.log(frequency);

	//add each train info to table
	$("#train-table > tbody").append("<tr><td>" + trainName + 
	"</td><td>" + destination + "</td><td>" + firstTrainTime + "</td><td>" + frequency + "</td></tr>");
});





















