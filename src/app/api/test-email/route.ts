import { resend } from '@/lib/resend';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('🧪 Testing Resend configuration...');
    
    // Check if API key is present
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ 
        success: false, 
        error: 'RESEND_API_KEY not found in environment variables' 
      }, { status: 500 });
    }

    // Get admin email
    const adminEmail = process.env.ADMIN_EMAIL || 'cary.wheatman@gmail.com';
    
    // Send a simple test email
    const result = await resend.emails.send({
      from: 'Test <noreply@resend.dev>',
      to: [adminEmail],
      subject: 'Resend Test Email from Kahunas',
      html: `
        <h1>Test Email</h1>
        <p>If you're reading this, your Resend integration is working!</p>
        <p><strong>Admin Email:</strong> ${adminEmail}</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
      `,
    });

    console.log('🧪 Test email result:', result);

    if (result.error) {
      return NextResponse.json({ 
        success: false, 
        error: result.error,
        details: 'Resend API returned an error'
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Test email sent successfully!',
      emailId: result.data?.id,
      adminEmail: adminEmail
    });

  } catch (error) {
    console.error('🧪 Test email error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      details: 'Unexpected error occurred'
    }, { status: 500 });
  }
} 