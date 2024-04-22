const AWS = require("aws-sdk");

const handler = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient()
  const {name, age, bloodcell} = JSON.parse(event.body);
  const bloodCellId = event.pathParameters?.id;

  await dynamodb.update({
    TableName: "moheedbloodcells",
    Key: {
        id: bloodCellId
    },
    UpdateExpression: 'set #name = :name, #age = :age, #bloodcell = :bloodcell',
    ExpressionAttributeNames: {
      '#name': 'name',
      '#age': 'age',
      '#bloodcell': 'bloodcell',
  },
    ExpressionAttributeValues: {
        ':name': name,
        ':age': age,
        ':bloodcell': bloodcell,
    },
    ReturnValues: "ALL_NEW"
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
        message: "BloodCell Edit Successfully"
    }),
  };
};

module.exports = {
  handler
}