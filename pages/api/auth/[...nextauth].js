import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'


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

        //check if user exists, this will be possible if we fetch the email/password object from the database and compare to what we have within the credentials object.
        //this would be something like result = user from database where email = credentials.email
        
        const result = {
          email: 'test@test.com',
          password: 'test'
        }
        //check validations
        if(credentials.email == null || credentials.password == null){
          throw new Error('Please enter an email and password')
        }

        //check if password and email are correct
        if (credentials.email != result.email || credentials.password != result.password) {
          throw new Error('Invalid email or password')
        }

        return result;

      }
    }),
  ]
})