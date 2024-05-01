const AWS = require("aws-sdk");

const handler = async(event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const patientId = event.pathParameters?.id;

    const deletePatientReport = {
        TableName: process.env.REPORTS_DYNAMO_DB_TABLE,
        Key: {
            id: patientId
        }
    };

    await dynamodb.delete(deletePatientReport).promise();

    return({
        statusCode: 200,
        body: JSON.stringify({message: "Patient Report delete successfully"})
    });
};

module.exports = {
    handler
};