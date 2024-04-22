const AWS = require("aws-sdk");
const {v4: uuidv4} = require("uuid");

const handler= async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient()
  const {name, age, bloodcell} = JSON.parse(event.body);
  const id = uuidv4();

  const newBloodCells = {
    id,
    name,
    age,
    bloodcell
  };
  
  await dynamodb.put({
    TableName: "moheedbloodcells",
    Item: newBloodCells
  }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(newBloodCells),
  }
};

module.exports = {
  handler
}