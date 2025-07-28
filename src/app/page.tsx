import Link from "next/link";
import { auth } from "@/lib/auth";
import ContactForm from "@/components/contact-form";
import UserMenu from "@/components/auth/user-menu";
import EnhancedPricingSection from "@/components/ui/enhanced-pricing-section";

export default async function Home() {
  // Check if user is authenticated
  const session = await auth();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <span className="text-2xl font-bold text-foreground">Kahunas</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">Reviews</a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
          </div>

          <div className="flex items-center space-x-4">
            {session?.user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  href={session.user.role === "COACH" ? "/coach" : "/client"}
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  {session.user.role === "COACH" ? "Dashboard" : "Portal"}
                </Link>
                <UserMenu />
              </div>
            ) : (
              <>
                <Link 
                  href="/auth/login" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  href="/auth/signup"
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/30 via-amber-50/20 to-orange-50/30 dark:from-yellow-950/10 dark:via-amber-950/5 dark:to-orange-950/10">
          {/* Floating elements */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-200/20 dark:bg-yellow-900/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-amber-200/20 dark:bg-amber-900/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-pulse animation-delay-4000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-orange-200/20 dark:bg-orange-900/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="space-y-8">
            {/* Announcement badge */}
            <div className="inline-flex items-center px-4 py-2 bg-muted/50 backdrop-blur-xl rounded-full border border-border/50">
              <span className="text-sm font-medium text-muted-foreground">
                ✨ Transform your coaching practice today
              </span>
            </div>

            {session?.user ? (
              /* Personalized Welcome for Logged In Users */
              <>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-none tracking-tight">
                  <span className="block text-foreground mb-4">
                    Welcome back,
                  </span>
                  <span className="block bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
                    {session.user.name?.split(' ')[0] || "there"}!
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                  Ready to continue your {session.user.role === "COACH" ? "coaching practice" : "coaching journey"}?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                  <Link
                    href={session.user.role === "COACH" ? "/coach" : "/client"}
                    className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-2xl hover:from-yellow-700 hover:to-amber-700 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-yellow-300/50"
                  >
                    <span className="relative z-10">{session.user.role === "COACH" ? "Go to Dashboard" : "Go to Portal"}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                  </Link>
                  {session.user.role === "COACH" && (
                    <Link
                      href="/coach/clients"
                      className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-muted-foreground transition-all duration-300 bg-muted/50 backdrop-blur-xl border border-border/50 rounded-2xl hover:bg-muted/70 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-muted/50"
                    >
                      Manage Clients
                    </Link>
                  )}
                </div>
              </>
            ) : (
              /* Default Hero for Non-Logged In Users */
              <>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-none tracking-tight">
                  <span className="block text-foreground mb-4">
                    The AI-Powered Platform for
                  </span>
                  <span className="block bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
                    Modern Coaches
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                  Streamline client management, automate scheduling, and scale your coaching business with intelligent insights. 
                  Focus on what matters most: transforming lives.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                  <Link
                    href="/auth/signup"
                    className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-2xl hover:from-yellow-700 hover:to-amber-700 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-yellow-300/50"
                  >
                    <span className="relative z-10">Start Free Trial</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                  </Link>
                  <Link
                    href="#features"
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-muted-foreground transition-all duration-300 bg-muted/50 backdrop-blur-xl border border-border/50 rounded-2xl hover:bg-muted/70 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-muted/50"
                  >
                    Explore Features <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </>
            )}

            {/* Trust indicators */}
            <div className="pt-12">
              <p className="text-sm text-muted-foreground mb-6">Trusted by 1000+ coaches worldwide</p>
              <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-60">
                <div className="text-2xl font-semibold text-muted-foreground">ICF</div>
                <div className="text-2xl font-semibold text-muted-foreground">EMCC</div>
                <div className="text-2xl font-semibold text-muted-foreground">CCE</div>
                <div className="text-2xl font-semibold text-muted-foreground">AC</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-2 text-muted-foreground animate-bounce">
            <span className="text-sm">Scroll to explore</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6">
              <span className="text-primary text-sm font-medium">Powerful Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Everything You Need to Scale Your Practice
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From client management to automated workflows, our platform helps you focus on coaching while we handle the operations.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "👥",
                title: "Smart Client Management",
                description: "Organize clients with AI-powered insights, progress tracking, and automated follow-ups.",
                color: "bg-blue-500/10 text-blue-600 dark:text-blue-400"
              },
              {
                icon: "📅",
                title: "Intelligent Scheduling",
                description: "Auto-scheduling with calendar sync, timezone handling, and smart availability detection.",
                color: "bg-green-500/10 text-green-600 dark:text-green-400"
              },
              {
                icon: "💬",
                title: "Secure Communication",
                description: "Built-in messaging, video calls, and session recordings with end-to-end encryption.",
                color: "bg-purple-500/10 text-purple-600 dark:text-purple-400"
              },
              {
                icon: "📊",
                title: "Progress Analytics",
                description: "Visual progress tracking, goal setting, and outcome measurement tools.",
                color: "bg-orange-500/10 text-orange-600 dark:text-orange-400"
              },
              {
                icon: "💳",
                title: "Payment Automation",
                description: "Integrated billing, subscription management, and automated invoicing.",
                color: "bg-pink-500/10 text-pink-600 dark:text-pink-400"
              },
              {
                icon: "🤖",
                title: "AI Assistant",
                description: "Smart session notes, action item generation, and coaching insights powered by AI.",
                color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative bg-background/50 backdrop-blur-xl border border-border/50 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center text-2xl mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Built for Modern Coaching
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Whether you're a life coach, business mentor, or wellness practitioner, our platform adapts to your unique coaching style and business needs.
              </p>
              <div className="space-y-6">
                {[
                  "Save 15+ hours per week on administrative tasks",
                  "Increase client retention by 40% with better engagement",
                  "Scale to 100+ clients without hiring additional staff",
                  "Generate actionable insights from every coaching session"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <svg className="w-4 h-4 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-lg text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              {/* Placeholder for demo video or image */}
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center border border-border/50">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p className="text-muted-foreground">Watch 2-minute demo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 md:py-32 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6">
              <span className="text-primary text-sm font-medium">Success Stories</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Loved by Coaches Worldwide
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how Kahunas has transformed coaching practices across the globe.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Mitchell",
                role: "Executive Coach",
                company: "Leadership Dynamics",
                content: "Kahunas transformed my practice completely. I went from managing 20 clients manually to serving 80+ clients effortlessly. The AI insights have made my coaching more effective than ever.",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
                rating: 5
              },
              {
                name: "Marcus Chen",
                role: "Business Mentor",
                company: "Scale Ventures",
                content: "The automation features are incredible. Client onboarding, scheduling, and follow-ups all happen seamlessly. I can focus purely on coaching while the platform handles everything else.",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
                rating: 5
              },
              {
                name: "Dr. Emily Rodriguez",
                role: "Wellness Coach",
                company: "Mindful Living Institute",
                content: "The analytics and progress tracking have revolutionized how I measure client outcomes. Both my clients and I love seeing the visual progress and celebrating achievements together.",
                avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-background/50 backdrop-blur-xl border border-border/50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Pricing Section */}
      <EnhancedPricingSection />

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-primary via-primary to-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
                {session?.user ? 
                  `Ready to Accelerate Your ${session.user.role === "COACH" ? "Practice" : "Growth"}?` :
                  "Ready to Transform Your Coaching Business?"
                }
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-8">
                {session?.user ? 
                  "Explore advanced features and take your coaching to the next level." :
                  "Join thousands of coaches who've already scaled their practice with Kahunas. Start your free trial today and experience the difference."
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                {session?.user ? (
                  <>
                    <Link 
                      href={session.user.role === "COACH" ? "/coach/clients" : "/client"}
                      className="bg-background text-foreground px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-background/90 transition-colors"
                    >
                      {session.user.role === "COACH" ? "Manage Clients" : "Continue Journey"}
                    </Link>
                    <Link 
                      href="/contact"
                      className="border-2 border-background text-primary-foreground px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-background/10 transition-colors"
                    >
                      Get Support
                    </Link>
                  </>
                ) : (
                  <>
                    <Link 
                      href="/auth/signup"
                      className="bg-background text-foreground px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-background/90 transition-colors"
                    >
                      Start Free Trial
                    </Link>
                    <Link 
                      href="#features"
                      className="border-2 border-background text-primary-foreground px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-background/10 transition-colors"
                    >
                      Learn More
                    </Link>
                  </>
                )}
              </div>
            </div>
            
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">K</span>
                </div>
                <span className="text-2xl font-bold text-foreground">Kahunas</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                The AI-powered platform that helps coaches scale their practice and transform more lives.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Security</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">API Docs</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © 2024 Kahunas. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Terms of Service</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
