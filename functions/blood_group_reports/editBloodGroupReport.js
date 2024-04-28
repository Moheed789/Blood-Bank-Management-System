const AWS = require("aws-sdk");

const handler = async(event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const {name, age} = JSON.parse(event.body);
    const bloodGroupId = event.pathParameters?.id;

    const updateBloodGroupReport = {
        TableName: "",
        Key:{
            id: bloodGroupId
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

    await dynamodb.update(updateBloodGroupReport).promise();

    return({
        statusCode: 200,
        body: JSON.stringify({message: "Blood Group Report update succesfully"})
    });
};

module.exports = {
    handler
};