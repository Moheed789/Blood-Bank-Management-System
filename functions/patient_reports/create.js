const AWS = require("aws-sdk");
const {v4: uuidv4} = require("uuid");

const handler = async(event) => {
    console.log("event", JSON.stringify(event));
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const {reportType, reportDate, description, createdBy} = JSON.parse(event.body);
    const id = uuidv4();
    const patientId = event.pathparameter?.id;

    const patientReport = {
        id,
        reportType,
        reportDate,
        description,
        createdBy
    };
    
    await dynamodb.put({
        TableName: process.env.REPORTS_DYNAMO_DB_TABLE,
        Item: patientReport,
        Key: {
            id: patientId
        }
    }).promise();

    return({
        statusCode: 201,
        body: JSON.stringify(patientReport)
    });
};

module.exports = {
    handler
};