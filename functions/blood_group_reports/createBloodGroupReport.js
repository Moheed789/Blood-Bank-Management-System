const AWS = require("aws-sdk");
const {v4: uuidv4} = require("uuid");

const handler = async(event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const {name, age} = JSON.parse(event.body);
    const bloodGroupId = uuidv4();

    const addBloodGroupReport = {
        id: bloodGroupId,
        name,
        age
    };

    await dynamodb.put({
        TableName: "",
        Item: addBloodGroupReport
    });

    return({
        statusCode: 201,
        body: JSON.stringify({addBloodGroupReport})
    });
};

module.exports = {
    handler
};