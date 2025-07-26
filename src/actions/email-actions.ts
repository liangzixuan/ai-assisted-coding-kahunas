'use server';

import { resend } from '@/lib/resend';
import { WelcomeEmail } from '../../emails/welcome-email';
import { render } from '@react-email/render';

export async function sendContactEmail(formData: FormData) {
  try {
    // Extract form data
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    console.log('📧 Email form data received:', { name, email, message: message.substring(0, 50) + '...' });

    // Validate required fields
    if (!name || !email || !message) {
      console.log('❌ Validation failed: Missing required fields');
      return {
        success: false,
        error: 'All fields are required'
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Validation failed: Invalid email format');
      return {
        success: false,
        error: 'Please enter a valid email address'
      };
    }

    // Get admin email from environment variables
    const adminEmail = process.env.ADMIN_EMAIL || 'cary.wheatman@gmail.com';
    console.log('📬 Admin email:', adminEmail);
    console.log('🔑 API Key present:', !!process.env.RESEND_API_KEY);

    // Send email to admin (notification)
    console.log('📤 Attempting to send admin notification email...');
    const adminEmailHtml = await render(WelcomeEmail({ name, email, message }));
    
    const adminEmailResult = await resend.emails.send({
      from: 'Kahunas <noreply@resend.dev>', // For development - change to your domain in production
      to: [adminEmail],
      subject: `New contact form submission from ${name}`,
      html: adminEmailHtml,
      replyTo: email,
    });

    console.log('📧 Admin email result:', adminEmailResult);

    if (adminEmailResult.error) {
      console.error('❌ Admin email failed:', adminEmailResult.error);
      return {
        success: false,
        error: 'Failed to send notification email: ' + adminEmailResult.error
      };
    }

    // Send confirmation email to user
    console.log('📤 Attempting to send user confirmation email...');
    const userConfirmationHtml = await render(WelcomeEmail({ name }));
    
    const userEmailResult = await resend.emails.send({
      from: 'Kahunas <noreply@resend.dev>', // For development - change to your domain in production
      to: [email],
      subject: 'Thank you for contacting Kahunas!',
      html: userConfirmationHtml,
    });

    console.log('📧 User email result:', userEmailResult);

    if (userEmailResult.error) {
      console.error('❌ User email failed:', userEmailResult.error);
      // Don't fail completely if user email fails, admin notification is more important
    }

    console.log('✅ Email sending process completed successfully');
    return {
      success: true,
      message: 'Email sent successfully! We\'ll get back to you soon.'
    };
  } catch (error) {
    console.error('💥 Unexpected error sending email:', error);
    
    return {
      success: false,
      error: 'Failed to send email. Please try again later.'
    };
  }
} 