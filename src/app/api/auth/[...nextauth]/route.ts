import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

const handler = NextAuth({
  pages: {
    signIn: '/',
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        login: {},
        senha: {}
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }

        try {
          const response = await fetch(`${process.env.API_URL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({
              login: credentials.login, //back usa login e nao email
              senha: credentials.senha,
            }),
            headers: { "Content-Type": "application/json" }
          });

          if (response.status !== 200) return null;

          const authData = await response.json();

          if (!authData.token || !authData.usuario) return null;

          cookies().set('token', authData.token);
          cookies().set('user', JSON.stringify(authData.usuario));
      
          return {
            id: authData.usuario.id,
            login: authData.usuario.login,
            email: authData.usuario.email,
          }

        } catch (error) {
          return null;
        }
      }
    })
  ],

  // pra aparecer o nome do nosso usuario, tem que configurar o callback

  // callbacks: {

  //   async signIn({ user, account, profile, email, credentials }) {
  //     // console.log(user);

  //     return true
  //   },
  //   async session({ session, user, token }) {
  //    // console.log('session:', session);

  //     return session

  //   },
  //   async jwt({ token, user, account, profile }) {
  //     // console.log(user);

  //     return token
  //   }

  // }

})

export { handler as GET, handler as POST }