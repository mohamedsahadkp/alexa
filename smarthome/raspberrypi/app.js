

var gpio = require("gpio");
var firebase = require('firebase')

var config = {
    apiKey: "AIzaSyBYfciw7MfCGyhkapZuNQkvhxWVNaB9sCg",
    authDomain: "myapp-cd853.firebaseapp.com",
    databaseURL: "https://myapp-cd853.firebaseio.com",
    storageBucket: "myapp-cd853.appspot.com",
    messagingSenderId: "915249587360"
};

//Firebase real-time database initialization
firebase.initializeApp(config);

//database connection
var rootObject  = firebase.database().ref('data');
var msgRef = rootObject.child('smarthome').child('LED');

var gpio4 = gpio.export(4, {
   direction: "out",
   ready: function() {
   }
});

msgRef.on("value", function(snapshot) {
    console.log(snapshot.val());
    if(snapshot.val() == "true") {
        // sets pin to high 
        gpio4.set();
    } else if (snapshot.val() == "false") {
        // sets pin to low (can also call gpio4.reset()) 
        gpio4.set(0);
    } else {
        console.log("Invalid Entry");
    }
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

// msgRef.on("value", function(snapshot) {
//     console.log(snapshot.val());
// }, function (errorObject) {
//     console.log("The read failed: " + errorObject.code);
// });