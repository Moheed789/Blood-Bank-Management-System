const AWS = require("aws-sdk");

const handler = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient()
  const {name, age, gender} = JSON.parse(event.body);
  const patientId = event.pathParameters?.id;

  await dynamodb.update({
    TableName: "moheedeventHandler",
    Key: {
        id: patientId
    },
    UpdateExpression: 'set #name = :name, #age = :age, #gender = :gender',
    ExpressionAttributeNames: {
      '#name': 'name',
      '#age': 'age',
      '#gender': 'gender',
  },
    ExpressionAttributeValues: {
        ':name': name,
        ':age': age,
        ':gender': gender,
    },
    ReturnValues: "ALL_NEW"
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
        message: "Patient Edit Successfully"
    }),
  };
};

module.exports = {
  handler
}