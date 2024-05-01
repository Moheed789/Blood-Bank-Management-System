const AWS = require("aws-sdk");
const {v4: uuidv4} = require("uuid");

const handler = async(event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const {reportDate, redBloodCells, whiteBloodCells, platelets} = JSON.parse(event.body);
    const id = uuidv4();
    const bloodCellId = event.pathparameter?.id;

    const createBloodCellReport = {
        id,
        reportDate,
        redBloodCells,
        whiteBloodCells,
        platelets
    };

    await dynamodb.put({
        TableName: process.env.REPORTS_DYNAMO_DB_TABLE,
        Item: createBloodCellReport,
        Key: {
            id: bloodCellId
        }
    }).promise();

    return({
        statusCode: 201,
        body: JSON.stringify(createBloodCellReport)
    });
};

module.exports = {
    handler
};