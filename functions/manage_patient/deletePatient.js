const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

const handler = async (event) => {
    console.log("event", JSON.stringify(event))
    console.log("eventGroup", JSON.stringify(event.requestContext.authorizer?.claims?.['cognito:username']))

    try {
        const userGroups = event.requestContext.authorizer?.claims?.['cognito:groups'] || [];
        if (!userGroups.includes('patient')) {
            return {
                statusCode: 403,
                body: JSON.stringify({ message: 'User is not authorized to perform this action' })
            };
        }
        const params = {
            TableName: "moheedeventHandler",
            Key: {
                id: event.pathParameters?.id
            }
        };

        await dynamodb.delete(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Record deleted successfully' })
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error' })
        };
    }
};

module.exports = {
    handler
}