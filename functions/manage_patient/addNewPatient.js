const AWS = require("aws-sdk");
const {v4: uuidv4} = require("uuid");

const handler= async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient()
  const {name, age, gender, phoneNumber, address} = JSON.parse(event.body);
  const id = uuidv4();

  const newPatient = {
    id,
    name,
    age,
    gender,
    phoneNumber,
    address
  };

  try {
    const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
    const params = {
      GroupName: 'patient',
      Username: 'user1',
      UserPoolId: 'us-east-1_haE3aDuSN'
    };
    let res =await cognitoIdentityServiceProvider.adminAddUserToGroup(params).promise();
    console.log('User added to group successfully.',res );
  } catch (err) {
    console.error('Error adding user to group:', err);
  }
  
  await dynamodb.put({
    TableName: "moheedeventHandler",
    Item: newPatient
  }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(newPatient),
  }
};

module.exports = {
  handler
}