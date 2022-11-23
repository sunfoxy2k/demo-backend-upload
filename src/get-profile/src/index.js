const { response_wrapper } = require('/opt/nodejs/response');

const { DocumentClient } = require('aws-sdk/clients/dynamodb');

const main = async (event, context, authenticated_user) => {
    const dynamoDb = new DocumentClient();
    const params = {
        TableName: process.env.TABLE_NAME,
        Key: {
            username: authenticated_user.username,
        },
    };
    const result = await dynamoDb.get(params).promise();

    return result.Item;
}

module.exports.handler = async (event, context) => {
    return await response_wrapper({ main, event, context });
}
