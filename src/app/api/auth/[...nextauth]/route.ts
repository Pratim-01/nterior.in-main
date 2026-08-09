import NextAuth from "next-auth";

const handler = NextAuth({
  providers: [
    // your providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };