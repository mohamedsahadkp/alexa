# Amazon Alexa

Here i created two amazon alexa skill

# 1) Hello World 
 This simple HelloWorld for Amazon Alexa. I implemented a Lambda function using NodeJS for handling Alexa Skill requests,
 It has no external dependencies or session management.

 Examples (One-shot model)
 
 User: "Alexa, tell Hello World to say hello" <br />
 Alexa: "Hello World!" <br />
 
 
# 2) Leave Letter 
 LeaveLetter alexa skill is usefull to plan to your leave. 
 I created a Lambda function using NodeJS for handling Alexa Skill leave requests, 
 It is using 'config.json'(https://www.npmjs.com/package/config.json) external dependencies.
 
 Examples (conversational model)
 
 User: "Alexa, tell Experion to say i need a leave" <br />
 Alexa: "OK, When you plan to take your leave"
 User: "today"
 Alexa: "Good, Which type of leave would you like to take?"
 User: "sick leave"
 Alexa: "Can i confirm your leave application"
 User: "sure"
 Alexa: "Congratulations your leave application submitted successfully, Have a great time"
