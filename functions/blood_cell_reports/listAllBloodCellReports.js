const AWS = require("aws-sdk");

const handler = async(event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    try {
        const params = await dynamodb.scan({TableName: ""}).promise();

        return({
            statusCode: 200,
            body: JSON.stringify({params})
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