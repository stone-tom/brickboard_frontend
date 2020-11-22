import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

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
                const result = await fetch(
                    "http://brickboard.herokuapp.com/login",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(data),
                    }
                  ).then((response) => {
                    console.log("THE RESPONSE")
                    console.log(response);
                    return response.json();
                  });
    //              console.log("THE RESULT")
    //               console.log(result);
    //               console.log("THE DATA:");
    //               console.log(result.data);'
                
                const {id}=result.data;
                const{email,admin,display_name}=result.data.attributes;;
              const user = {email: email, name: display_name };
              user.id=id;
              Object.assign(user,{admin: admin});

              console.log("IS THE USER MODIEFIED?");
              console.log(user);
              
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
        jwt: async (token, user, account, profile, isNewUser) => {
            //  "user" parameter is the object received from "authorize"
            //  "token" is being send below to "session" callback...
            //  ...so we set "user" param of "token" to object from "authorize"...
            //  ...and return it...
            console.log("THE TOKEN");
            console.log(token);
            if(user){
                token={...token,admin: user.admin,id: user.id};
            }
            return Promise.resolve(token)   // ...here
        },
        session: async (session, user, sessionToken) => {
            //  "session" is current session object
            //  below we set "user" param of "session" to value received from "jwt" callback
            console.log("THE SESSION CALLBACK");
            console.log(user);
            session.user = user;
            return Promise.resolve(session)
        }
    },
    pages: {
        // signIn: '/login',
        // signOut: '/logout',
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: null // If set, new users will be directed here on first sign in
      },
  }

export default (req, res) => NextAuth(req, res, options)