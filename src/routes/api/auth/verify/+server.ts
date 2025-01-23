// /api/auth/verify/+server.ts
import { redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

export async function GET({ url }: { url: URL }) {
  try {
    // Extract the token from query parameters
    const token = url.searchParams.get('token');
    if (!token) {
      return new Response('Invalid or missing token', { status: 400 });
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, import.meta.env.JWT_SECRET);

    // Redirect the user to the dashboard or another secure area
    return redirect(302, '/dashboard');
  } catch (error) {
    console.error('Error verifying token:', error);
    return new Response('Invalid or expired token', { status: 401 });
  }
}
