/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

var config = require('config.json')('./config/config.json');
var AlexaSkill = require('./AlexaSkill');

//Set App ID for the skill
var LeaveLetter = function () {
    AlexaSkill.call(this, config.alexa.AppId);
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
    var speechOutput = "Welcome to the Leave Letter App, You can say i need a leave";
    var repromptText = "You can say i need a leave";
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
        var leave = "OK, Turning Off the light";
        response.ask(leave, leave);
    },
    "TURNONLIGHT": function (intent, session, response) {
        console.log("Turn on light");
        var leaveConfirm = "OK, Turning on the light"
        response.tellWithCard(leaveConfirm, leaveConfirm, leaveConfirm);
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
