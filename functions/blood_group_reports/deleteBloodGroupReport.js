const AWS = require("aws-sdk");

const handler = async(event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const bloodGroupId = event.pathParameters?.id;

    const deleteBloodGroupReport = {
        TableName: "",
        Key:{
            id: bloodGroupId
        }
    };

    await dynamodb.delete(deleteBloodGroupReport).promise();

    return({
        statusCode: 200,
        body: JSON.stringify({message: "Blood Group Report delete successfully"})
    });
};

module.exports = {
    handler
};