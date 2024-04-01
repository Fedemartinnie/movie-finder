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
    subtitle: [String],
    plot: String,
    genre: [String],
    releaseYear: Number, //debe ser año o fecha completa?
    duration: String,
    director: String,
    cast: [String] || null,
    images: [String],
    trailer: String, //debe ser un Array => varios trailers
    overallRating: Number,
    ratingsCount: Number,
    ratings: [
        {
            userId: String,
            rating: Number
        }
    ]
})


moviesSchema.plugin(mongoosePaginate)  

const Movie = mongoose.model('Movie', moviesSchema)

module.exports = Movie