import Passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User, { IUser } from './models/User'; // Importar el modelo de usuario
import { Document } from 'mongoose';

type IUserDocument = IUser & Document; // Definir el tipo de documento de usuario

// const URI = 'http://192.168.0.73:8000' //! ip fede
// const URI = 'http://192.168.1.6:8000'     //! ip jere
const URI = 'http://18.221.46.103:8000' //* AWS ip

// Configurar Passport para usar la estrategia de Google OAuth 2.0
Passport.use(new GoogleStrategy({
  clientID: process.env.CLIENTE_ID || '',
  clientSecret: process.env.SECRET_CLIENTE || '',
  callbackURL: URI,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('Google profile received:', JSON.stringify(profile, null, 2));

    // Verificar si el usuario ya existe por su correo electrónico
    let user = await User.findOne({ email: profile.emails?.[0]?.value });

    if (!user) {
      // Si el usuario no existe, crear uno nuevo
      user = new User({
        userId: profile.id,
        name: profile.name?.givenName || '',
        lastname: profile.name?.familyName || '',
        email: profile.emails?.[0]?.value || '',
        profileImage: profile.photos?.[0]?.value || '',
        accessToken: accessToken,
        refreshTokens: []
      });

      await user.save(); // Guardar el nuevo usuario en la base de datos
      console.log('New user created:', user);
    } else {
      // Si el usuario ya existe, actualizar su token de acceso
      user.accessToken = accessToken;
      await user.save(); // Guardar los cambios en el usuario en la base de datos
      console.log('Existing user updated:', user);
    }

    return done(null, user);
  } catch (err) {
    console.error('Error during authentication:', err);
  }
}));


// Configurar la serialización del usuario para almacenar solo su ID en la sesión
Passport.serializeUser((user, done) => {
  console.log('usuario: ', user); // Mostrar el usuario serializado en la consola
  done(null, user); // Llamar a la función 'done' con el usuario como argumento para serializarlo
});

// Configurar la deserialización del usuario para recuperarlo a partir de su ID
Passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id); // Buscar el usuario en la base de datos por su ID
    console.log('Deserialized user:', user); // Mostrar el usuario deserializado en la consola
    done(null, user); // Llamar a la función 'done' con el usuario como argumento para deserializarlo
  } catch (error) {
    console.error('Error during deserialization:', error); // Manejar cualquier error durante la deserialización
    done(error); // Llamar a la función 'done' con el error como argumento para indicar un error en la deserialización
  }
});

export default Passport; // Exportar Passport para su uso en otras partes de la aplicación
