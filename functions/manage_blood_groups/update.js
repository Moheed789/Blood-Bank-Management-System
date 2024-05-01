const AWS = require("aws-sdk");

const handler = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient()
  const {name, age, bloodgroup} = JSON.parse(event.body);
  const bloodGroupId = event.pathParameters?.id;

  await dynamodb.update({
    TableName: process.env.BLOOD_GROUP_DYNAMO_DB_TABLE,
    Key: {
        id: bloodGroupId
    },
    UpdateExpression: 'set #name = :name, #age = :age, #bloodgroup = :bloodgroup',
    ExpressionAttributeNames: {
      '#name': 'name',
      '#age': 'age',
      '#bloodgroup': 'bloodgroup',
  },
    ExpressionAttributeValues: {
        ':name': name,
        ':age': age,
        ':bloodgroup': bloodgroup,
    },
    ReturnValues: "ALL_NEW"
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
        message: "Blood Group Edit Successfully"
    }),
  };
};

module.exports = {
  handler
}