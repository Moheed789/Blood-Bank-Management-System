const AWS = require("aws-sdk");
const {v4: uuidv4} = require("uuid");

const handler = async(event) => {
    console.log("event", JSON.stringify(event));
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const {bloodGroupType, reportDate, description, createdBy} = JSON.parse(event.body);
    const id = uuidv4();
    const bloodGroupId = event.pathparameter?.id;

    const bloodGroupReport = {
        id,
        bloodGroupType,
        reportDate,
        description,
        createdBy
    };
    
    await dynamodb.put({
        TableName: process.env.REPORTS_DYNAMO_DB_TABLE,
        Item: bloodGroupReport,
        Key: {
            id: bloodGroupId
        }
    }).promise();

    return({
        statusCode: 201,
        body: JSON.stringify(bloodGroupReport)
    });
};

module.exports = {
    handler
};