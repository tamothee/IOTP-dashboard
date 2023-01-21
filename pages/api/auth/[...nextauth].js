import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER,
      idToken: true,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      console.log("here");
      console.log(token);
      console.log(user);
      const isSignIn = account ? true : false;
      // Add auth_time to token on signin in
      if (isSignIn) {
        token.auth_time = Math.floor(Date.now() / 1000);
      }
      return Promise.resolve(token);
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      console.log("here2");
      console.log(token);
      console.log(session);
      if (!session?.user || !token?.account) {
        return session;
      }

      session.user.id = token.account.id;
      session.accessToken = token.account.accessToken;

      return session;
    },
  },
};
export default NextAuth(authOptions);
