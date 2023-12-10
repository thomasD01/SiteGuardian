import nextAuth from "next-auth/next";

import credentialsProvider from "next-auth/providers/credentials";

const handler = nextAuth({
  providers: [
    credentialsProvider({
      name: "laravel",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        //TODO

        return null;
      }   
    })
  ]
});

export { handler as GET, handler as POST }
