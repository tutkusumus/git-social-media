import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
    // Get the token from the request
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    // Check if the token exists 
    if (token) {
        return NextResponse.next();
    }
    // Redirect to the sign-in page if not authenticated
    return NextResponse.redirect(new URL('/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2FsignIn', request.url));
}

export const config = {
    matcher: ['/profile','/settings'],
};
