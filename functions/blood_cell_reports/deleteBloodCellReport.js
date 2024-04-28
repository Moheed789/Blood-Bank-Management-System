const AWS = require("aws-sdk");

const handler = async(event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const bloodCellId = event.pathParameters?.id;

    const deleteBloodCellReport = {
        TableName: "",
        Key:{
            id: bloodCellId
        }
    };

    await dynamodb.delete(deleteBloodCellReport).promise();

    return({
        statusCode: 200,
        body: JSON.stringify({message: "Blood Cell Report delete successfully"})
    });
};

module.exports = {
    handler
};