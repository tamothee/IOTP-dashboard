import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

// export const authOptions = {
//   // Configure one or more authentication providers
//   providers: [
//     Auth0Provider({
//       clientId: process.env.AUTH0_CLIENT_ID,
//       clientSecret: process.env.AUTH0_CLIENT_SECRET,
//       issuer: process.env.AUTH0_ISSUER,
      
//     }),

//     // ...add more providers here
//   ],
// };
// export default NextAuth(authOptions);

const authOptions = {
    providers: [
      Auth0Provider({
        clientId: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        issuer: process.env.AUTH0_ISSUER,
        idToken: true,
      }),
    ],

    // Configure callbacks 👉 https://next-auth.js.org/configuration/callbacks
    callbacks: {
      // The JWT callback is called any time a token is written to
      jwt: ({ token, user, account, profile, isNewUser }) => {
        if (account) {
          token.access_token = account.access_token;
          token.id_token = account.id_token;
          token.auth0_id = token.sub;
          token.type = account.token_type;
        }
        delete token.name;
        delete token.picture;
        delete token.sub;
        return token;
      },

      // The session callback is called before a session object is returned to the client
      session: ({ session, user, token }) => {
        const newSession = {
          user: {
            auth0_id: token.auth0_id,
            email: token.email,
          },
          token: {
            access_token: token.access_token,
            id_token: token.id_token,
            token_type: token.type,
          },
        };
        return newSession;
      },
    },

    secret: process.env.NEXTAUTH_SECRET,
  };

export default NextAuth(authOptions);
