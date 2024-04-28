const AWS = require("aws-sdk");

const handler = async(event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const {name, age} = JSON.parse(event.body);
    const bloodCellId = event.pathParameters?.id;

    const updateBloodCellReport = {
        TableName: "",
        Key:{
            id: bloodCellId
        },
        UpdateExpression: 'set #name = :name, #age = :age',
        ExpressionAttributeNames: {
            '#name': 'name',
            '#age': 'age',
        },
        ExpressionAttributeValues: {
            ':name': name,
            ':age': age,
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