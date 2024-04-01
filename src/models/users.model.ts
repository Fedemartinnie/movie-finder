var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

const usersSchema = new mongoose.Schema ({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    alias: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    profileImage: String,
    accessToken: String,
    refreshTokens: [String],
    favorites: [String]    
})

usersSchema.plugin(mongoosePaginate)

const user = mongoose.model('Users', usersSchema)