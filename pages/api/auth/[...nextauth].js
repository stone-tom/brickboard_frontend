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
                console.log("CREDENTIALS:")
                console.log(credentials);
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
                  );
                  console.log(result);

              const user = null;
              
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
    pages: {
        signIn: '/login',
        signOut: '/logout',
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: null // If set, new users will be directed here on first sign in
      },
  }

export default (req, res) => NextAuth(req, res, options)