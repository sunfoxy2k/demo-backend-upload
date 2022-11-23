const { response_wrapper } = require('/opt/nodejs/response');
const { DocumentClient } = require('aws-sdk/clients/dynamodb');

const main = async (event, context, authenticated_user) => {
    const { profileImageUrl } = JSON.parse(event.body);
    const dynamoDb = new DocumentClient();
    const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            username: authenticated_user.username,
            profileImageUrl: profileImageUrl
        }
    }
    const result = await dynamoDb.put(params).promise();
    return { 
        code: 'SUCCESS',
        message: 'Profile image updated successfully',
    }
}

module.exports.handler = async (event, context) => {
    return await response_wrapper({ main, event, context });
}
