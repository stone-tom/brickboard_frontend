import { faCookie } from '@fortawesome/free-solid-svg-icons';
import  Cookies  from 'cookies';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

let authCookie="";

const options = {

    providers: [
        Providers.Credentials({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
              email: { label: "Email", type: "text", placeholder: "jsmith" },
              password: {  label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
              
                let data={
                    user:{
                        email: credentials.email,
                        password: credentials.password
                    }
                }; 
                // let publicJWT="";
                
            
                const result = await fetch(
                    "https://brickboard.herokuapp.com/login",
                    {
                      method: "POST",
                      credentials: 'include',
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(data),
                    }
                  ).then((response) => {
                    console.log("THE RESPONSE")
                    // console.log(response);
                    console.log(response.headers);
                    // console.log("THE JWT")
                    // console.log("WE GOT OUR ORIGINAL JWT");
                    // console.log(response.headers.get("authorization"));
                    authCookie=(response.headers.get('set-cookie'));
                    // publicJWT=response.headers.get("authorization");
                    // console.log("------------------------------------");
                    return response.json() ;
                  });
                 console.log("THE COOKIE")
                 let indexOfValue=authCookie.indexOf("=");
                 authCookie=authCookie.substring(indexOfValue+1);
                  console.log(authCookie);
                
    //               console.log("THE DATA:");
    //               console.log(result.data);'
                
            const {id}=result.data;
            const{email,admin,display_name}=result.data.attributes;
              const user = {email: email, name: display_name };
              // console.log("PUBLIC JWT",publicJWT);
              
              if (user) {
                // Any user object returned here will be saved in the JSON Web Token
                return Promise.resolve(user)
              } else {
                return Promise.resolve(null)
              }
            }
          })
          //add more Providers here
    ],
    callbacks: {
        // jwt: async (token, user, account, profile, isNewUser) => {
        //     //  "user" parameter is the object received from "authorize"
        //     //  "token" is being send below to "session" callback...
        //     //  ...so we set "user" param of "token" to object from "authorize"...
        //     //  ...and return it...
        //     // console.log("THE TOKEN");
        //     // console.log(token);
        //     if(user){
        //         token={...token,admin: user.admin,id: user.id};
        //     }
        //     return Promise.resolve(token)   // ...here
        // },
        session: async (session, user, sessionToken) => {
            //  "session" is current session object
            //  below we set "user" param of "session" to value received from "jwt" callback
            // console.log("THE SESSION CALLBACK");
            // console.log(user);
            session.user = user;
            return Promise.resolve(session)
        }
    },
    secret: process.env.JWT_SECRET,
    pages: {
        // signIn: '/login',
        // signOut: '/logout',
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: null // If set, new users will be directed here on first sign in
      },
      cookies:{
        sessionToken: {
          name: `_brickboard`,
          options: {
            httpOnly: true,
            path: '/',
            secure: true,
            value: authCookie
          }
         
        },
      }
  }

export default (req, res) => NextAuth(req, res, options)