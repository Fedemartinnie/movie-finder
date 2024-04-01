var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

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
    releaseYear: Number,
    images: [String]
    /*movieId: {
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
    genre: String,
    releaseDate: Number,
    duration: String,
    director: String,
    cast: [String] || null,
    images: [String],
    trailer: String,
    overallRating: Number,
    ratingsCount: Number,
    ratings: [
        {
            userId: String,
            rating: Number
        }
    ]*/
})


moviesSchema.plugin(mongoosePaginate)  

const Movie = mongoose.model('Movie', moviesSchema)

module.exports = Movie