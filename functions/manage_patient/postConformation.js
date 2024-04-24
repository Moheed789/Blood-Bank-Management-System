const AWS = require("aws-sdk");

const handler = async(event) => {
  console.log("event", JSON.stringify(event));
    try {
        const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
        const params = {
          GroupName: 'patient',
          Username: event.userName,
          UserPoolId: event.userPoolId
        };
        let res =await cognitoIdentityServiceProvider.adminAddUserToGroup(params).promise();
        console.log('User added to group successfully.',res );
        return event
      } catch (err) {
        console.error('Error adding user to group:', err);
      }
};

module.exports = {
    handler
};