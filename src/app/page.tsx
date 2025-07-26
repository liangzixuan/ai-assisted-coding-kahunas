import Link from "next/link";
import { auth } from "@/lib/auth";
import ContactForm from "@/components/contact-form";
import UserMenu from "@/components/auth/user-menu";

export default async function Home() {
  // Check if user is authenticated
  const session = await auth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-zinc-900 dark:to-zinc-800">
      {/* Navigation */}
      <nav className="px-6 py-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border-b border-yellow-100 dark:border-zinc-700">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-zinc-100">Kahunas</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 dark:text-zinc-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">Features</a>
            <a href="#pricing" className="text-gray-600 dark:text-zinc-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">Pricing</a>
            <a href="#about" className="text-gray-600 dark:text-zinc-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">About</a>
            {session?.user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  href={session.user.role === "COACH" ? "/coach" : "/client"}
                  className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 font-medium transition-colors"
                >
                  {session.user.role === "COACH" ? "Coach Dashboard" : "Client Portal"}
                </Link>
                <UserMenu />
              </div>
            ) : (
              <Link 
                href="/auth/login" 
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          {session?.user ? (
            /* Personalized Welcome for Logged In Users */
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-zinc-100 mb-4">
                Welcome back, {session.user.name?.split(' ')[0] || "there"}!
              </h1>
              <p className="text-xl text-gray-600 dark:text-zinc-400 mb-8">
                Ready to continue your {session.user.role === "COACH" ? "coaching practice" : "coaching journey"}?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  href={session.user.role === "COACH" ? "/coach" : "/client"}
                  className="bg-yellow-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition-colors shadow-lg"
                >
                  {session.user.role === "COACH" ? "Go to Dashboard" : "Go to Portal"}
                </Link>
                {session.user.role === "COACH" && (
                  <Link 
                    href="/coach/clients"
                    className="bg-white dark:bg-zinc-800 text-yellow-600 dark:text-yellow-400 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-yellow-500 hover:bg-yellow-50 dark:hover:bg-zinc-700 transition-colors"
                  >
                    Manage Clients
                  </Link>
                )}
              </div>
            </div>
          ) : (
            /* Default Hero for Non-Logged In Users */
            <>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-zinc-100 mb-6">
                The All-in-One Platform for
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-500"> Coaches</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-zinc-400 mb-8 max-w-3xl mx-auto">
                Streamline client management, scheduling, and communication in one seamless platform. 
                Focus on what you do best: coaching. Let us handle the rest.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  href="/auth/signup"
                  className="bg-yellow-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition-colors shadow-lg"
                >
                  Start Free Trial
                </Link>
                <Link 
                  href="/auth/login"
                  className="bg-white dark:bg-zinc-800 text-yellow-600 dark:text-yellow-400 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-yellow-500 hover:bg-yellow-50 dark:hover:bg-zinc-700 transition-colors"
                >
                  Sign In
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-zinc-100 mb-16">
            Everything You Need to Run Your Coaching Business
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-zinc-100 mb-2">Client Management</h3>
              <p className="text-gray-600 dark:text-zinc-400">Organize all your clients in one place with detailed records and session history.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-zinc-100 mb-2">Smart Scheduling</h3>
              <p className="text-gray-600 dark:text-zinc-400">Automated booking with calendar sync, reminders, and rescheduling options.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-zinc-100 mb-2">Video Sessions</h3>
              <p className="text-gray-600 dark:text-zinc-400">Built-in secure video conferencing - no external tools needed.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-zinc-100 mb-2">Secure Payments</h3>
              <p className="text-gray-600 dark:text-zinc-400">Integrated payment processing with invoicing and subscription management.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-6 py-20 bg-gray-50 dark:bg-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-zinc-100 mb-6">
                For Coaches: Focus on Coaching, Not Admin
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-lg text-gray-700 dark:text-zinc-300">Streamline client onboarding with automated invitations</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-lg text-gray-700 dark:text-zinc-300">Sync with Google Calendar for real-time availability</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-lg text-gray-700 dark:text-zinc-300">Track client progress with session notes and action plans</span>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-zinc-100 mb-6">
                For Clients: Simple, Professional Experience
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-lg text-gray-700 dark:text-zinc-300">One-click booking with real-time availability</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-lg text-gray-700 dark:text-zinc-300">Access session history and shared resources anytime</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-lg text-gray-700 dark:text-zinc-300">Secure messaging and easy rescheduling options</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-yellow-500 to-amber-500 dark:from-yellow-600 dark:to-amber-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              <h2 className="text-4xl font-bold text-white mb-6">
                {session?.user ? 
                  `Ready to Take Your ${session.user.role === "COACH" ? "Coaching" : "Journey"} Further?` :
                  "Ready to Transform Your Coaching Business?"
                }
              </h2>
              <p className="text-xl text-yellow-100 mb-8">
                {session?.user ? 
                  "Explore all the features and tools available to help you succeed." :
                  "Join hundreds of coaches who've streamlined their practice with Kahunas. Get started today and see the difference our platform can make."
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                {session?.user ? (
                  <>
                    <Link 
                      href={session.user.role === "COACH" ? "/coach/clients" : "/client/booking"}
                      className="bg-white text-yellow-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                      {session.user.role === "COACH" ? "Manage Clients" : "Book Session"}
                    </Link>
                    <Link 
                      href={session.user.role === "COACH" ? "/coach/settings" : "/client/history"}
                      className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-yellow-600 transition-colors"
                    >
                      {session.user.role === "COACH" ? "Settings" : "View History"}
                    </Link>
                  </>
                ) : (
                  <>
                    <Link 
                      href="/auth/signup"
                      className="bg-white text-yellow-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Start Free Trial
                    </Link>
                    <Link 
                      href="/demo"
                      className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-yellow-600 transition-colors"
                    >
                      Watch Demo
                    </Link>
                  </>
                )}
              </div>
            </div>
            
            {/* Right Column - Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-zinc-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <span className="text-2xl font-bold">Kahunas</span>
          </div>
          <p className="text-zinc-400 mb-4">The digital home for your coaching business.</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
