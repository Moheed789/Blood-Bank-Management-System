const AWS = require("aws-sdk");

const handler = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    try {
        const res = await dynamodb.scan({TableName: "moheedeventHandler"}).promise();
    
        return {
            statusCode: 200,
            body: JSON.stringify(res)
        };
    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error" })
        };
    }    
};

module.exports = {
    handler
}