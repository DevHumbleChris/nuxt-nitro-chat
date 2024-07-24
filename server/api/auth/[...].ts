import { NuxtAuthHandler } from "#auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
export default NuxtAuthHandler({
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: process.env.NUXT_OAUTH_GITHUB_CLIENT_ID,
      clientSecret: process.env.NUXT_OAUTH_GITHUB_CLIENT_SECRET,
    }),
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GoogleProvider.default({
      clientId: process.env.NUXT_OAUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NUXT_OAUTH_GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/",
  },
});
