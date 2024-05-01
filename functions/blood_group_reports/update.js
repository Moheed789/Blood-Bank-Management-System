const AWS = require("aws-sdk");

const handler = async(event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const {bloodGroupType, reportDate, description, createdBy} = JSON.parse(event.body);
    const bloodGroupId = event.pathParameters?.id;

    const updateBloodGroupReport = {
        TableName: process.env.REPORTS_DYNAMO_DB_TABLE,
        Key:{
            id: bloodGroupId
        },
        UpdateExpression: 'set #bloodGroupType = :bloodGroupType, #reportDate = :reportDate, #description = :description, #createdBy = :createdBy',
        ExpressionAttributeNames: {
            '#bloodGroupType': 'bloodGroupType',
            '#reportDate': 'reportDate',
            '#description': 'description',
            '#createdBy': 'createdBy',
        },
        ExpressionAttributeValues: {
            ':bloodGroupType': bloodGroupType,
            ':reportDate': reportDate,
            ':description': description,
            ':createdBy': createdBy,
        },
        ReturnValues: "ALL_NEW"
    };

    await dynamodb.update(updateBloodGroupReport).promise();

    return({
        statusCode: 200,
        body: JSON.stringify({message: "Blood Group Report update succesfully"})
    });
};

module.exports = {
    handler
};