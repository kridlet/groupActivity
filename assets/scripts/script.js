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
    $("#add-user").on("click", function(event) {
      event.preventDefault();

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
    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
      // storing the snapshot.val() in a variable for convenience
      var sv = snapshot.val();

      // Console.loging the last user's data
      console.log(sv.name);
      console.log(sv.role);
      console.log(sv.startDate);
      console.log(sv.monthlyRate);

      // Change the HTML to reflect
      $("#employee-name").text(sv.name);
      $("#role").text(sv.role);
      $("#start-date").text(sv.startDate);
      $("#monthly-rate").text(sv.monthlyRate);

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });