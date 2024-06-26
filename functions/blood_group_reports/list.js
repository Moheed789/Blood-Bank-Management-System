const AWS = require("aws-sdk");

const handler = async(event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    try {
        const getAllBloodGroupReports = await dynamodb.scan({TableName: process.env.REPORTS_DYNAMO_DB_TABLE}).promise();

        return({
            statusCode: 200,
            body: JSON.stringify({getAllBloodGroupReports})
        });
    } catch (error) {
        console.log("error", JSON.stringify(error.message));
        return({
            statusCode: 500,
            body: JSON.stringify({message: "Internal Server Error"})
        });
    };
};

module.exports = {
    handler
};