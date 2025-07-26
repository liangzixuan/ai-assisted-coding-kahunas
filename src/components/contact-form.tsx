'use client';

import { useState, useTransition } from 'react';
import { sendContactEmail } from '@/actions/email-actions';
import ModernCard from '@/components/ui/modern-card';
import ModernButton from '@/components/ui/modern-button';
import ModernInput from '@/components/ui/modern-input';

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success: boolean; message?: string; error?: string } | null>(null);

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await sendContactEmail(formData);
      setResult(result);
      
      // Clear form on success
      if (result.success) {
        const form = document.getElementById('contact-form') as HTMLFormElement;
        form?.reset();
      }
    });
  }

  return (
    <div className="relative max-w-md mx-auto">
      {/* Background glow effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-orange-400 via-pink-500 to-red-500 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
      
      <ModernCard variant="glass" className="relative backdrop-blur-2xl bg-white/10 border-white/20">
        <div className="p-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
              Get Started Today
            </h3>
            <p className="text-white/80 text-sm">
              Join hundreds of coaches transforming their practice
            </p>
          </div>
          
          <form id="contact-form" action={handleSubmit} className="space-y-6">
            <ModernInput
              type="text"
              name="name"
              label="Full Name"
              placeholder=""
              required
              disabled={isPending}
              variant="floating"
              className="text-white placeholder-white/60"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
            />
            
            <ModernInput
              type="email"
              name="email"
              label="Email Address"
              placeholder=""
              required
              disabled={isPending}
              variant="floating"
              className="text-white placeholder-white/60"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
            />
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/90">
                Message
              </label>
              <textarea
                name="message"
                rows={4}
                required
                className="w-full px-4 py-3 border-2 border-white/30 rounded-xl focus:border-white/50 focus:ring-4 focus:ring-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 transition-all duration-300 resize-none focus:outline-none disabled:opacity-50"
                placeholder="Tell us about your coaching business..."
                disabled={isPending}
              />
            </div>
            
            <ModernButton
              type="submit"
              disabled={isPending}
              isLoading={isPending}
              variant="gradient"
              size="lg"
              className="w-full shadow-2xl hover:shadow-pink-500/25"
              icon={
                !isPending && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )
              }
            >
              {isPending ? 'Sending...' : 'Send Message'}
            </ModernButton>
          </form>
          
          {/* Success/Error Messages */}
          {result && (
            <div className={`mt-6 p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 animate-fade-in-up ${
              result.success 
                ? 'bg-green-500/20 border-green-400/50 text-green-100' 
                : 'bg-red-500/20 border-red-400/50 text-red-100'
            }`}>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {result.success ? (
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium">
                    {result.success ? 'Message sent successfully!' : 'Something went wrong'}
                  </p>
                  <p className="text-sm opacity-90">
                    {result.success ? result.message : result.error}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="space-y-2">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg mx-auto flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <p className="text-xs text-white/80 font-medium">Secure & Private</p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg mx-auto flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-xs text-white/80 font-medium">Quick Response</p>
              </div>
            </div>
          </div>
        </div>
      </ModernCard>
    </div>
  );
} 