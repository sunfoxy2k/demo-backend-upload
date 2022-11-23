const { verify, decode } = require('jsonwebtoken')
// import { keys } from './jwks.json'
const jwt_convert = require('jwk-to-pem')

const public_jwks = {
    "keys": [
        {
            "alg": "RS256",
            "e": "AQAB",
            "kid": "1lkUHNS5XJnR1N+Wz90V0DkOb2m5ETCH6YmCX9hioKE=",
            "kty": "RSA",
            "n": "0whqQMHSxL7Gf5qJ3DolzM8Tj4frdwTE-moGUDj39bk6k8raICw_rH-smxJXV39KMTWLM5_aaboJY561o225I953Ionbf3i8bNdIqtoO4sm651VXsMK10Ups7v_m0UHS_mvx5aYCtoskxXVmIOLhgadIOpQq65kgvRA9ks-E3pAU46D-z7prW0WKO86WEHiMIfaZ0Pjp1TJPWvS44DdxMZsDepljJA_28JqmGvjwvMTLrk_Xb75uN2WarKD8Jjlip6hbg2Z4ZkOLZ4bOkh_nE27wMB8Sp4xK_uc_tAyOSHvMDnhPdQ2qjuKq-RF9A24JFQ2DzdWDa9oEKUBDj_RWnQ",
            "use": "sig"
        },
        {
            "alg": "RS256",
            "e": "AQAB",
            "kid": "P/0MzkrAdeBewPFCBgxuA/P0IjUJS0U1BrocTw/Mux8=",
            "kty": "RSA",
            "n": "vWkscyeODJyEzsIU90znTs7Nwy4A1SmqPHUinEPlr1R9VqYrFjOGtkscE8d8d3M7bGX4d0fPr4KVZ_aZcZBv7mU8AvJfPESQEedYNuBZiz-i0xq2tHnSR--LM2AuhcuVGFhnaSmBaLAmNPYq4NKpRBy_vJR98WleYgfc3lcCpJhQjByTJxXBYvKnIpStVtdEsU8G227I7lfQ9d-RORklRq80YX9LSAQTaTgwAt0oK-PWC641778saJzOW0ZNjf_vFKfKGqJbluewjMBwabJc_6moBczamGu3sfQ-5xApdmypqkKIcAYKGMPFFJ_JOt1Dj6jcESazbeTdV48awAWRSw",
            "use": "sig"
        }
    ]
}
verifyToken = (payload) => {
    // const public_key_0 = jwt_convert(keys[0])
    try {
        const decoded = decode(payload, { complete: true })
        const kid = decoded.header.kid
        const public_jwk = public_jwks.find(key => key.kid === kid)
        if (!public_jwk) {
            return null
        }
        const public_key = jwt_convert(public_jwk)
        return verify(payload, public_key)
    } catch (error) {
        return null
    }
}

decodeToken = (payload) => {
    try {
        return decode(payload)
    } catch (error) {
        return null
    }
}

module.exports = {
    verifyToken,
    decodeToken,
}