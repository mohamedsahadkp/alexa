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
    "LeaveIntent": function (intent, session, response) {
        console.log("Leave Started");
        var leave = "OK, When you plan to take your leave";
        response.ask(leave, leave);
    },
    "LeaveDateIntent": function (intent, session, response) {
        console.log("Ask Leave Date");
        var leaveDate = "Good, Which type of leave would you like to take";
        response.ask(leaveDate, leaveDate)
    },
    "LeaveTypeIntent": function (intent, session, response) {
        console.log("Ask Leave Type");
        var leaveType = "Can i confirm your leave application";
        response.ask(leaveType, leaveType);
    },
    "LeaveYesIntent": function (intent, session, response) {
        console.log("Ask Leave Confirmation (Yes)");
        var leaveConfirm = "Congratulations your leave application submitted successfully, Have a great time"
        response.tellWithCard(leaveConfirm, leaveConfirm, leaveConfirm);
    },
    "LeaveNoIntent": function (intent, session, response) {
        console.log("Ask Leave Confirmation (No)");
        var leaveConfirm = "You application is not submitted, Have a great time."
        response.tellWithCard(leaveConfirm, leaveConfirm, leaveConfirm);
    },
    "AMAZON.HelpIntent": function (intent, session, response) {
        console.log("Help");
        response.tell("You can ask me to i would like to take a leave");
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
