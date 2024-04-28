const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require("uuid");

const handler = async (event) => {
  console.log("event", JSON.stringify(event));
  const id = uuidv4();
  const userCreate = {
    id,
    name: event.userName,
    fatherName: event.request.userAttributes.family_name,
    email: event.request.userAttributes.email
  };
  await dynamodb.put({
    TableName: "moheedeventHandler",
    Item: userCreate
  }).promise();
  try {
    const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
    const params = {
      GroupName: 'patient',
      Username: event.userName,
      UserPoolId: event.userPoolId
    };
    let res = await cognitoIdentityServiceProvider.adminAddUserToGroup(params).promise();
    console.log('User added to group successfully.', res);
    return event
  } catch (err) {
    console.error('Error adding user to group:', err);
  }
};

module.exports = {
  handler
};