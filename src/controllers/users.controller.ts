//import {Request, Response, NextFunction } from "express"
const usersService = require('../services/users.services')
// const {OAuth2Client} = require('google-auth-library');

// const client = new OAuth2Client();

// exports.onSignIn = (googleUser: any) => {
//   var profile = googleUser.getBasicProfile();
//   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//   console.log('Name: ' + profile.getName());
//   console.log('Image URL: ' + profile.getImageUrl());
//   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
//   //ID TOKEN
//   const id_token = googleUser.getAuthResponse().id_token
//   console.log("User TOken: ",id_token)
// }

// exports.verifyUser = async (token: string) => {
//   const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
//       // Or, if multiple clients access the backend:
//       //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
//   });
//   const payload = ticket.getPayload();
//   const userId = payload['sub'];
//   console.log(userId)
//   console.log("payload: ",payload)
//   // If request specified a G Suite domain:
//   // const domain = payload['hd'];
// }
//verify().catch(console.error);
/*

exports.register = async (req: Request, res: Response, next: Function) => {

}

*/