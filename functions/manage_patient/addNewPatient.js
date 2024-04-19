const AWS = require("aws-sdk");
const {v4: uuidv4} = require("uuid");

const handler= async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient()
  const {name, age, gender} = JSON.parse(event.body);
  const id = uuidv4();

  const newPatient = {
    id,
    name,
    age,
    gender
  };
  
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