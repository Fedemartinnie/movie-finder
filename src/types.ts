export type genre = 'Action' | 'Adventure' | 'Animation' | 'Biography' |
                     'Comedy' | 'Crime' | 'Documentary' | 'Drama' | 'Family' | 
                     'Fantasy' | 'Film Noir' | 'History' | 'Horror' | 'Music' |
                     'Musical' | 'Mystery' | 'Romance' | 'Sci-Fi' | 'Short Film' |
                     'Sport' | 'Superhero' | 'Thriller' | 'War' | 'Western'

export interface user {
    userId: string;
    name: string;
    lastname: string;
    alias: string; // Campo opcional
    email: string;
    profileImage?: string;
    accessToken?: string;
    refreshTokens?: string[];
    favorites?: string[];
    
}

export interface movie {
    _id: any,
    movieId: string,
    title: string,
    subtitle: string[],
    plot: string,
    genre: genre,// agregar --> genre[] //string[],
    releaseYear: string,
    duration: string,
    director: string[],
    cast: string [],
    images: string[],
    trailer: string,
    overallRating: number,
    ratingsCount: number,
    ratings: [
        {
            userId: string, 
            rate: number
        }
    ]
}


export type MovieSummary = Pick<movie, '_id' | 'title' | 'overallRating' | 'images' | 'genre' | 'releaseYear'>;
