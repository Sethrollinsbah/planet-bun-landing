// /api/auth/login/+server.ts
import { json } from '@sveltejs/kit';
import { Resend } from 'resend';
import jwt from 'jsonwebtoken';

// Initialize Resend
const resend = new Resend(import.meta.env.RESEND_API_KEY);

// POST handler for `/api/auth/login`
export async function POST({ request }: { request: Request }) {
  try {
    // Parse the request body
    const { email } = await request.json();

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Generate JWT token with 1-hour expiry
    const token = jwt.sign({ email }, import.meta.env.JWT_SECRET, { expiresIn: '1h' });

    // Login link
    const loginLink = import.meta.env.APP_URL + `/api/auth/verify?token=${token}`;

    // Send email with Resend
    await resend.emails.send({
      from: 'Planet Bun <leadmagnet@cobrainsure.org>',
      to: email,
      subject: 'Login to Your Account',
      html: `
        <p>Hello,</p>
        <p>Click the link below to log in to your account:</p>
        <p><a href="${loginLink}">${loginLink}</a></p>
        <p>This link will expire in 1 hour. If you didn't request this, please ignore this email.</p>
      `
    });

    // Return success response
    return json({ message: 'Login link sent successfully' });
  } catch (error) {
    console.error('Error in /api/auth/login:', error);
    return json({ error: 'Failed to process login request' }, { status: 500 });
  }
}
