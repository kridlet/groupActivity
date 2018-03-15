// Initialize Firebase
var config = {
  apiKey: "AIzaSyCAyXQkifFrOuG46U5sTd4zzNfBJrMTk4E",
  authDomain: "helloworld-265b2.firebaseapp.com",
  databaseURL: "https://helloworld-265b2.firebaseio.com",
  projectId: "helloworld-265b2",
  storageBucket: "helloworld-265b2.appspot.com",
  messagingSenderId: "95246432579"
};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// Initial Values
var name = "";
var role = "";
var startDate = 0;
var monthlyRate = "";

// Capture Button Click
$("#add-user").on("click", function (event) {
  event.preventDefault();
  console.log(event);
  // Grabbed values from text boxes
  name = $("#employee-name").val().trim();
  role = $("#role").val().trim();
  startDate = $("#start-date").val().trim();
  monthlyRate = $("#monthly-rate").val().trim();

  // Code for handling the push
  database.ref().push({
    name: name,
    role: role,
    startDate: startDate,
    monthlyRate: monthlyRate,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

});

// Firebase watcher + initial loader + order/limit HINT: .on("child_added"
database.ref().orderByChild("dateAdded").on("child_added", function (childSnapshot) {
    // Console.loging the last user's data
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().role);
    console.log(childSnapshot.val().startDate);
    console.log(childSnapshot.val().monthlyRate);

    console.log(moment().diff(moment(childSnapshot.val().startDate), "months"));
    var monthsWorked = moment().diff(moment(childSnapshot.val().startDate), "months");
    var totalBilled = monthsWorked * childSnapshot.val().monthlyRate;
    var tr = "<tr><td>" + childSnapshot.val().name + " </td><td>" + childSnapshot.val().role + " </td><td>" + childSnapshot.val().startDate + " </td><td>" + monthsWorked + " </td><td>" + childSnapshot.val().monthlyRate + " </td><td>" + totalBilled + " </td></tr>";
    console.log(tr);
    // Change the HTML to reflect
    $("employee-data").append(tr);

  // Handle the errors
}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});