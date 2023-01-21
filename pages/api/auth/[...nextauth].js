//import NextAuth from "next-auth";
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

import NextAuth from "next-auth";
const nextOptions = {
  site: process.env.NEXTAUTH_URL,
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      domain: process.env.AUTH0_ISSUER,
      audience: process.env.AUTH0_API_AUDIENCE,
      scope: "openid profile email",
      protection: "pkce",
      idToken: true,
      authorizationUrl: `https://${
        process.env.AUTH0_ISSUER
      }/authorize?response_type=code&audience=${encodeURI(
        process.env.AUTH0_API_AUDIENCE
      )}`,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },

    async session(session, token) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

export default (req, res) => NextAuth(req, res, nextOptions);
