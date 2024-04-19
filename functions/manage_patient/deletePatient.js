const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

const handler = async (event) => {
    try {
        const deleteToItem = event.pathParameters?.id;

        const params = {
            TableName: 'moheedeventHandler',
            Key: {
                id: deleteToItem
            }
        };

        await dynamodb.delete(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Item Deleted Successfully"
            })
        };
    } catch (err) {
        console.error('Error processing request:', err);

        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Failed to process request',
                error: err
            })
        };
    }
};

module.exports = {
    handler
}