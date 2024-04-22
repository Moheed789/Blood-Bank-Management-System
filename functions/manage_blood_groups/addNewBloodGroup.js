const AWS = require("aws-sdk");
const {v4: uuidv4} = require("uuid");

const handler= async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient()
  const {name, age, bloodgroup} = JSON.parse(event.body);
  const id = uuidv4();

  const newBloodGroups = {
    id,
    name,
    age,
    bloodgroup
  };
  
  await dynamodb.put({
    TableName: "moheeddonor",
    Item: newBloodGroups
  }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(newBloodGroups),
  }
};

module.exports = {
  handler
}