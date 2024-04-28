const AWS = require("aws-sdk");

const handler = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const {name, age, gender} = JSON.parse(event.body);
    const patientId = event.pathParameters?.id;

    const updatePatientReport = {
        TableName: "moheedpatientreport",
        Key: {
            id: patientId
        },
        UpdateExpression: 'set #name = :name, #age = :age, #gender = :gender',
        ExpressionAttributeNames: {
            '#name': 'name',
            '#age': 'age',
            '#gender': 'gender',
        },
        ExpressionAttributeValues: {
            ':name': name,
            ':age': age,
            ':gender': gender,
        },
        ReturnValues: "ALL_NEW"
    };

    await dynamodb.update(updatePatientReport).promise();

    return({
        statusCode: 200,
        body: JSON.stringify({message: "Patient Report Update Successfully."})
    })
};

module.exports = {
    handler
};