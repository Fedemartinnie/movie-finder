const jwt = require('jsonwebtoken')
// const config = require('../config/config')

const generateToken = (user) => {
    
    if (!user) {
        return ('User data is required')
    }

  // Define the payload and secret
    const payload = {
    id: user.userId, // Assuming user object has an id property
    email: user.email // Assuming user object has an email property
    }

    const secret = process.env.JWT_SECRET || 'your_jwt_secret'
    const options = {
    expiresIn: '1h' // Token expiration time
    }

    // Generate the token
    const token = jwt.sign(payload, secret, options)
    console.log('TOKEN ********---> ',token)
    // Attach the token to the response
    // res.locals.token = token
    
    return token
    next()
}

module.exports = generateToken
