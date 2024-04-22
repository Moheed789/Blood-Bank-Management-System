const AWS = require("aws-sdk");

const handler = async(event) => {
    try {
        const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
        const params = {
          GroupName: 'patient',
          Username: event.userName,
          UserPoolId: event.userpoolId
        };
        let res =await cognitoIdentityServiceProvider.adminAddUserToGroup(params).promise();
        console.log('User added to group successfully.',res );
      } catch (err) {
        console.error('Error adding user to group:', err);
      }
};

module.exports = {
    handler
};