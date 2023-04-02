import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import connectMongo from '../../../database/conn.js'
import userSchema from '../../../model/schema'
import { compare } from 'bcryptjs'

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        //check connection to database
        connectMongo().catch(err => console.log(err));
        //check if user exists, this will be possible if we fetch the email/password object from the database and compare to what we have within the credentials object.
        //this would be something like result = user from database where email = credentials.email
        const result = await userSchema.findOne({
          email: credentials.email
        })
        if(!result){
          throw new Error('User does not exist')
        }
        const passwordMatch = await compare(credentials.password, result.password);
        console.log(passwordMatch)
        if(!passwordMatch){
          throw new Error('Invalid password')
        }

        //check if password and email are correct
        if (credentials.email !== result.email) {
          throw new Error('Invalid email')
        }

        return result;

      }
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
})