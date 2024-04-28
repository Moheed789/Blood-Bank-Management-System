const AWS = require("aws-sdk");
const {v4: uuidv4} = require("uuid");

const handler = async(event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const {name, age} = JSON.parse(event.body);
    const bloodCellId = uuidv4();

    const createBloodCellReport = {
        id: bloodCellId,
        name,
        age
    };

    await dynamodb.put({
        TableName: "",
        Item: createBloodCellReport
    }).promise();

    return({
        statusCode: 201,
        body: JSON.stringify(createBloodCellReport)
    });
};

module.exports = {
    handler
};