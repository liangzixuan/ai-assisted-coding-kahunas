import {
  Html,
  Head,
  Font,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Button,
  Hr,
} from '@react-email/components';

interface WelcomeEmailProps {
  name?: string;
  email?: string;
  message?: string;
}

export const WelcomeEmail = ({ 
  name = 'Valued Customer', 
  email = '',
  message = ''
}: WelcomeEmailProps) => {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Welcome to Kahunas - Thank you for your interest!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <div style={logo}>
              <span style={logoText}>K</span>
            </div>
            <Heading style={heading}>Kahunas</Heading>
          </Section>
          
          <Section style={content}>
            <Heading style={title}>
              Welcome to Kahunas, {name}! 🎉
            </Heading>
            
            <Text style={paragraph}>
              Thank you for your interest in our all-in-one coaching platform! 
              We're excited to help you streamline your coaching business.
            </Text>

            {message && (
              <Section style={messageSection}>
                <Text style={messageLabel}>Your message:</Text>
                <Text style={messageText}>"{message}"</Text>
              </Section>
            )}
            
            <Text style={paragraph}>
              Here's what you can expect from Kahunas:
            </Text>
            
            <Section style={features}>
              <Text style={feature}>✅ Streamlined client management</Text>
              <Text style={feature}>✅ Smart scheduling with calendar sync</Text>
              <Text style={feature}>✅ Built-in secure video conferencing</Text>
              <Text style={feature}>✅ Integrated payment processing</Text>
            </Section>
            
            <Section style={ctaSection}>
              <Button 
                style={button} 
                href="https://kahunas.com/auth/signup"
              >
                Start Your Free Trial
              </Button>
            </Section>
            
            <Hr style={hr} />
            
            <Text style={footer}>
              Questions? Reply to this email or visit our support center.
              <br />
              <br />
              Best regards,<br />
              The Kahunas Team
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const logoSection = {
  padding: '20px 40px',
  textAlign: 'center' as const,
};

const logo = {
  width: '48px',
  height: '48px',
  background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
  borderRadius: '12px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
};

const logoText = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: '700',
};

const heading = {
  color: '#1f2937',
  fontSize: '28px',
  fontWeight: '700',
  margin: '16px 0 0 0',
  textAlign: 'center' as const,
};

const content = {
  padding: '0 40px',
};

const title = {
  color: '#1f2937',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '32px',
  margin: '16px 0',
  textAlign: 'center' as const,
};

const paragraph = {
  color: '#4b5563',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
};

const messageSection = {
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  padding: '16px',
  margin: '24px 0',
};

const messageLabel = {
  color: '#374151',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0 0 8px 0',
};

const messageText = {
  color: '#4b5563',
  fontSize: '16px',
  fontStyle: 'italic',
  margin: '0',
  lineHeight: '24px',
};

const features = {
  margin: '24px 0',
};

const feature = {
  color: '#4b5563',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '8px 0',
};

const ctaSection = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#2563eb',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '16px 32px',
};

const hr = {
  border: 'none',
  borderTop: '1px solid #e5e7eb',
  margin: '32px 0',
};

const footer = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '20px',
  textAlign: 'center' as const,
};

export default WelcomeEmail; 