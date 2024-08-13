import NextAuth from "next-auth";
import GitHubProvider from 'next-auth/providers/github';

const handler = NextAuth({
    providers:[
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
   
    callbacks:{
        async session ({session,token}){
            session.user.username = session.user.name.split(' ').join('').toLocaleLowerCase();
            session.user.uid = token.sub;
            return session;
        }
    }
});

export {handler as GET, handler as POST};