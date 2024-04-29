const AWS = require("aws-sdk");

const handler = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const {reportType, reportDate, description, createdBy} = JSON.parse(event.body);
    const patientId = event.pathParameters?.id;

    const updatePatientReport = {
        TableName: "moheedPatientRports",
        Key: {
            id: patientId
        },
        UpdateExpression: 'set #reportType = :reportType, #reportDate = :reportDate, #description = :description, #createdBy = :createdBy',
        ExpressionAttributeNames: {
            '#reportType': 'reportType',
            '#reportDate': 'reportDate',
            '#description': 'description',
            '#createdBy': 'createdBy',
        },
        ExpressionAttributeValues: {
            ':reportType': reportType,
            ':reportDate': reportDate,
            ':description': description,
            ':createdBy': createdBy,
        },
        ReturnValues: "ALL_NEW"
    };

    await dynamodb.update(updatePatientReport).promise();

    return({
        statusCode: 200,
        body: JSON.stringify({message: "Patient Report Update Successfully."})
    })
};

module.exports = {
    handler
};