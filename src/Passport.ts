import Passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User, { IUser } from './models/User'; // Importar el modelo de usuario
import { Document } from 'mongoose';


//! cambiar IP segun rama
//const URI = 'http://192.168.0.73:8000' //! ip fede
// const URI = 'http://192.168.1.6:8000'     //! ip jere
const URI = 'http://18.188.246.231' //* AWS IP

type IUserDocument = IUser & Document; // Definir el tipo de documento de usuario

// Configurar Passport para usar la estrategia de Google OAuth 2.0
Passport.use(new GoogleStrategy({
  clientID: process.env.CLIENTE_ID || '', // ID del cliente proporcionado por Google
  clientSecret: process.env.SECRET_CLIENTE || '', // Clave secreta del cliente proporcionada por Google
  callbackURL: URI, // URL de redireccionamiento después de la autenticación exitosa
}, async (accessToken, refreshToken, profile, done) => { // Callback para manejar la autenticación exitosa
  try {
    console.log('Google profile received:', JSON.stringify(profile, null, 2)); // Mostrar el perfil de Google recibido

    // Buscar el usuario en la base de datos por su ID de Google
    let user = await User.findOne({ userId: profile.id });

    // Si el usuario no existe, crear uno nuevo con los datos del perfil de Google
    if (!user) {
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
      console.log('New user created:', user); // Mostrar el usuario creado en la consola
    } else {
      // Si el usuario ya existe, actualizar su token de acceso
      user.accessToken = accessToken;
      await user.save(); // Guardar los cambios en el usuario en la base de datos
      console.log('Existing user updated:', user); // Mostrar el usuario actualizado en la consola
    }

    return done(null, user); // Llamar a la función 'done' con el usuario como argumento para indicar éxito en la autenticación
  } catch (err) {
    console.error('Error during authentication:', err); // Manejar cualquier error durante la autenticación
    return done(err, false); // Llamar a la función 'done' con el error como argumento para indicar fallo en la autenticación
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
