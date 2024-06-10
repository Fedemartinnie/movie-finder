var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
//const z = require('zod') // agregarlo al movieSchema

const imagesSchema = new mongoose.Schema({
    backdrops: [String],
    logos: [String],
    posters: [String]
})

const castSchema = new mongoose.Schema({
    name: String,
    photo: String,
    // _id: String
})

const moviesSchema = new mongoose.Schema({
    movieId: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    subtitle: [String],
    plot: String,
    genres: [String],
    releaseYear: String,
    duration: String,
    director: [castSchema],    
    cast: [castSchema],
    images: imagesSchema,
    trailer: [String], //debe ser un Array => varios trailers
    overallRating: Number,
    ratingsCount: Number,
    ratings: [
        {
            userId: String,
            rate: Number
        }
    ]
})


moviesSchema.plugin(mongoosePaginate)  

const Movie = mongoose.model('Movie', moviesSchema)

module.exports = Movie