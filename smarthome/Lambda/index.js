/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

var config = require('./config.json');
var AlexaSkill = require('./AlexaSkill');
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
var msgRef = rootObject.child('smarthome');

//Set App ID for the skill
var LeaveLetter = function () {
    AlexaSkill.call(this, "amzn1.ask.skill.baf5a3c7-8254-45ac-bb92-efed3cbeebd3");
};

function askAlexaTurnOnlight() {
    msgRef.update({
        LED : true,
    });
};

function askAlexaTurnOfflight() {
    msgRef.update({
        LED : false,
    });
};

// Extend AlexaSkill
LeaveLetter.prototype = Object.create(AlexaSkill.prototype);
LeaveLetter.prototype.constructor = LeaveLetter;


//Initialization
LeaveLetter.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("LeaveLetter onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
};

//App Open
LeaveLetter.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("LeaveLetter onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = "Welcome to the Home App, You can say turn on or off the light";
    var repromptText = "You can say turn on or off the light";
    response.ask(speechOutput, repromptText);
};

//Cleanup
LeaveLetter.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("HelloWorld onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
};

//App Request
LeaveLetter.prototype.intentHandlers = {
    // register custom intent handlers
    "TURNOFFLIGHT": function (intent, session, response) {
        console.log("Turn Off light");
        askAlexaTurnOfflight();
        var turnOfflight = "OK, Turning Off the light";
        response.ask(turnOfflight, turnOfflight);
    },
    "TURNONLIGHT": function (intent, session, response) {
        console.log("Turn on light");
        askAlexaTurnOnlight();
        var turnOnlight = "OK, Turning on the light";
        response.ask(turnOnlight, turnOnlight);
        //response.tellWithCard(leaveConfirm, leaveConfirm, leaveConfirm);
    },
    "AMAZON.HelpIntent": function (intent, session, response) {
        console.log("Help");
        response.tell("You can ask me to turn on or off the light");
    },
    "AMAZON.CancelIntent": function (intent, session, response) {
        console.log("Cancel");
        var speechOutput = "Ok, See you again";
        response.tell(speechOutput);
    },
    "AMAZON.StopIntent": function (intent, session, response) {
        console.log("Stop");
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};




// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    
    // Create an instance of the LeaveLetter skill.
    var leaveLetter = new LeaveLetter();
    leaveLetter.execute(event, context);
};
