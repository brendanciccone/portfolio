import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with API key
// You'll need to add RESEND_API_KEY to your environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { firstName, lastName, email, company, message } = await request.json();

    // Validate the data
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create email content
    const emailContent = `
Name: ${firstName} ${lastName}
Email: ${email}
Company: ${company || 'Not provided'}
Message: ${message}
    `;

    // Send the email using Resend
    const data = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', // Update this with your verified domain
      to: ['brendan@fourpixels.xyz'], // Your email address
      subject: 'New Contact Form (Portfolio)',
      text: emailContent,
      reply_to: email,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 