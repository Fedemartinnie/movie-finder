export type genre = 'Action' | 'Adventure' | 'Animation' | 'Biography' |
                     'Comedy' | 'Crime' | 'Documentary' | 'Drama' | 'Family' | 
                     'Fantasy' | 'Film Noir' | 'History' | 'Horror' | 'Music' |
                     'Musical' | 'Mystery' | 'Romance' | 'Sci-Fi' | 'Short Film' |
                     'Sport' | 'Superhero' | 'Thriller' | 'War' | 'Western'

export interface User {
    name: string;
    lastname: string;
    alias: string; // Campo opcional
    email: string;
    profileImage?: string;
    accessToken?: string;
    refreshTokens?: string[];
}


export interface Images {
    backdrops: string[];
    logos: string[];
    posters: string[];
}

export interface Cast{
    name: string,
    photo: string,
    _id: string
}


export interface Images {
    backdrops: string[];
    logos: string[];
    posters: string[];
}

export interface Cast{
    name: string,
    photo: string,
    _id: string
}

export interface movie {
    _id: any,
    title: string,
    subtitle: string[],
    plot: string,
    // genre: genre[],//string[],
    genres: [string],
    releaseYear: string,
    duration: string,
    director: string[],
    // cast: string [],
    cast: Cast[],
    // images: string[],
    images: Images,
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


export type MovieSummary = Pick<movie, '_id' | 'title' | 'overallRating' | 'images' | 'genres' | 'releaseYear'>;
