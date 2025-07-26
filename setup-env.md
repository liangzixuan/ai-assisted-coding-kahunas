# Environment Setup for Resend Integration

## Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Resend API Key
RESEND_API_KEY=your_resend_api_key_here

# Email Configuration
ADMIN_EMAIL=admin@yourdomain.com
```

## Getting Your Resend API Key

1. **Sign up for Resend**: Go to [resend.com](https://resend.com) and create a free account
2. **Navigate to API Keys**: In your Resend dashboard, go to the "API Keys" section
3. **Create a new API key**: Click "Create API Key" and give it a name like "Kahunas Production"
4. **Copy the key**: Copy the generated API key (it starts with `re_`)
5. **Add to .env.local**: Replace `your_resend_api_key_here` with your actual API key

## Development vs Production

### Development
- Use `noreply@resend.dev` as the sender email (no domain verification needed)
- Free tier includes 3,000 emails/month
- Perfect for testing

### Production
- Set up a custom domain in Resend dashboard
- Verify your domain with DNS records (SPF, DKIM, DMARC)
- Change sender email from `noreply@resend.dev` to `noreply@yourdomain.com`

## Domain Setup (Production)

1. **Add Domain**: In Resend dashboard, go to "Domains" and add your domain
2. **DNS Records**: Add the provided DNS records to your domain provider:
   - SPF record
   - DKIM record  
   - DMARC record (optional but recommended)
3. **Verify**: Wait for DNS propagation and verify in Resend dashboard
4. **Update Code**: Change the sender email in `src/actions/email-actions.ts`

## Testing the Integration

1. **Start Development Server**: `npm run dev`
2. **Visit the Landing Page**: Go to `http://localhost:3000`
3. **Fill Out Contact Form**: Scroll to the CTA section and test the form
4. **Check Resend Dashboard**: View sent emails in your Resend dashboard
5. **Check Email Inbox**: Verify emails are delivered to the specified addresses

## Email Template Preview

To preview your email templates during development:

1. **Add Script**: Add this to your `package.json` scripts:
   ```json
   {
     "scripts": {
       "email:dev": "email dev --dir ./emails --port 4000"
     }
   }
   ```

2. **Run Preview Server**: `npm run email:dev`
3. **View Templates**: Open `http://localhost:4000` to see your email templates

## Troubleshooting

### Common Issues:

1. **"API Key not found" error**:
   - Check your `.env.local` file exists
   - Verify the API key is correct
   - Restart your development server

2. **Emails not sending**:
   - Check your Resend dashboard for error logs
   - Verify your API key has the correct permissions
   - Check your account's email sending limits

3. **Emails going to spam**:
   - Set up proper domain verification
   - Add SPF, DKIM, and DMARC records
   - Use a verified sender domain

### Support

- **Resend Documentation**: [resend.com/docs](https://resend.com/docs)
- **React Email Documentation**: [react.email](https://react.email)
- **Next.js Server Actions**: [nextjs.org/docs/app/api-reference/functions/server-actions](https://nextjs.org/docs/app/api-reference/functions/server-actions) 