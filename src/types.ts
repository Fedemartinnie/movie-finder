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
    "movieId": "string",
    "title": "string",
    "releaseDate": "string",
    //"description": "string",
    "imageUrl": "string"
}
