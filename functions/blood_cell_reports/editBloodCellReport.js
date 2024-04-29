const AWS = require("aws-sdk");

const handler = async(event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const {reportDate, redBloodCells, whiteBloodCells, platelets} = JSON.parse(event.body);
    const bloodCellId = event.pathParameters?.id;

    const updateBloodCellReport = {
        TableName: "moheedPatientRports",
        Key:{
            id: bloodCellId
        },
        UpdateExpression: 'set #reportDate = :reportDate, #redBloodCells = :redBloodCells, #whiteBloodCells = :whiteBloodCells, #platelets = :platelets',
        ExpressionAttributeNames: {
            '#reportDate': 'reportDate',
            '#redBloodCells': 'redBloodCells',
            '#whiteBloodCells': 'whiteBloodCells',
            '#platelets': 'platelets',
        },
        ExpressionAttributeValues: {
            ':reportDate': reportDate,
            ':redBloodCells': redBloodCells,
            ':whiteBloodCells': whiteBloodCells,
            ':platelets': platelets,
        },
        ReturnValues: "ALL_NEW"
    };

    await dynamodb.update(updateBloodCellReport).promise();

    return({
        statusCode: 200,
        body: JSON.stringify({message: "Blood Cell Report update successfully"})
    });
};

module.exports = {
    handler
};