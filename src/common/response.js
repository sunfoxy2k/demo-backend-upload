const { verifyToken, decodeToken } = require('./authentication');

module.exports.response_wrapper = async (config) => {
    const response = {
        statusCode: 500,
        headers: {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Content-Type": "application/json",
        },
        body: "Internal Server Error"
    }

    config.authentication = config.authentication === false ? false : true;
    config.body_data_type = config.body_data_type || 'json'
    
    try {
        let authenticated_user = null
        if (config.authentication) {
            const token = config.event.headers.Authorization || config.event.headers.authorization
            authenticated_user = decodeToken(token)

            if (!authenticated_user) {
                response.statusCode = 401
                response.body = "Unauthorized User"
                return response
            }
        }

        const result = await config.main(config.event, config.context, authenticated_user)
        response.statusCode = 200
        if (result) {
            response.statusCode = result.statusCode || 200;
            delete result.statusCode
        }

        switch (config.body_data_type) {
            case 'json':
                response.headers['Content-Type'] = 'application/json'
                response.body = JSON.stringify(result);
                break;
            default:
                response.headers['Content-Type'] = 'application/json'
                response.body = result;
        }
    } catch (e) {
        console.error(`ERROR: `, e)
    }

    return response
}
