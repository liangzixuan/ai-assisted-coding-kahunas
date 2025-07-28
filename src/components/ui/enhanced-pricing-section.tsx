'use client';

import Link from 'next/link';

interface PricingFeature {
  name: string;
  included: boolean;
  description?: string;
}

interface PricingPlan {
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: PricingFeature[];
  highlighted?: boolean;
  buttonText: string;
  buttonLink: string;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    description: "Perfect for new coaches getting started",
    price: {
      monthly: 29,
      yearly: 290, // 2 months free
    },
    features: [
      { name: "Up to 5 active clients", included: true },
      { name: "Basic scheduling", included: true },
      { name: "Email notifications", included: true },
      { name: "Session notes", included: true },
      { name: "Mobile app access", included: true },
      { name: "Advanced analytics", included: false },
      { name: "Client portal", included: false },
      { name: "Video calling", included: false },
      { name: "Custom branding", included: false },
      { name: "Priority support", included: false },
    ],
    buttonText: "Start Free Trial",
    buttonLink: "/auth/signup",
  },
  {
    name: "Professional",
    description: "For established coaches who need more power",
    price: {
      monthly: 79,
      yearly: 790, // 2 months free
    },
    highlighted: true,
    features: [
      { name: "Up to 25 active clients", included: true },
      { name: "Advanced scheduling", included: true },
      { name: "Email & SMS notifications", included: true },
      { name: "Detailed session notes", included: true },
      { name: "Mobile app access", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Client portal", included: true },
      { name: "Built-in video calling", included: true },
      { name: "Custom branding", included: false },
      { name: "Priority support", included: true },
    ],
    buttonText: "Get Started",
    buttonLink: "/auth/signup",
  },
  {
    name: "Enterprise",
    description: "For coaching organizations and teams",
    price: {
      monthly: 149,
      yearly: 1490, // 2 months free
    },
    features: [
      { name: "Unlimited clients", included: true },
      { name: "Enterprise scheduling", included: true },
      { name: "All notification types", included: true },
      { name: "Advanced session management", included: true },
      { name: "Mobile app access", included: true },
      { name: "Enterprise analytics", included: true },
      { name: "White-label client portal", included: true },
      { name: "HD video calling", included: true },
      { name: "Full custom branding", included: true },
      { name: "24/7 priority support", included: true },
    ],
    buttonText: "Contact Sales",
    buttonLink: "/contact",
  },
];

export default function EnhancedPricingSection() {
  return (
    <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-full mb-6">
            <span className="text-yellow-700 dark:text-yellow-400 text-sm font-medium">Pricing Plans</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Simple, transparent pricing that grows with your coaching practice. 
            Start free and upgrade when you're ready.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-2 border-yellow-300 dark:border-yellow-600 shadow-xl scale-105'
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg'
              } transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{plan.description}</p>
                
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-5xl font-bold text-gray-900 dark:text-white">${plan.price.monthly}</span>
                  <span className="text-gray-600 dark:text-gray-400 ml-2">/month</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  or ${plan.price.yearly}/year (save 2 months)
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                      feature.included
                        ? 'bg-green-100 dark:bg-green-900/20'
                        : 'bg-gray-100 dark:bg-gray-800'
                    }`}>
                      {feature.included ? (
                        <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-sm ${
                      feature.included 
                        ? 'text-gray-900 dark:text-white' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Link
                href={plan.buttonLink}
                className={`block w-full text-center py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white hover:from-yellow-600 hover:to-amber-600 shadow-lg hover:shadow-xl'
                    : 'bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-800 dark:hover:bg-gray-600'
                }`}
              >
                {plan.buttonText}
              </Link>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
              Compare All Features
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left p-6 text-gray-900 dark:text-white font-semibold">Features</th>
                  {pricingPlans.map((plan, index) => (
                    <th key={index} className="text-center p-6 text-gray-900 dark:text-white font-semibold">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pricingPlans[0].features.map((_, featureIndex) => (
                  <tr key={featureIndex} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="p-6 text-gray-900 dark:text-white font-medium">
                      {pricingPlans[0].features[featureIndex].name}
                    </td>
                    {pricingPlans.map((plan, planIndex) => (
                      <td key={planIndex} className="p-6 text-center">
                        {plan.features[featureIndex].included ? (
                          <div className="inline-flex items-center justify-center w-6 h-6 bg-green-100 dark:bg-green-900/20 rounded-full">
                            <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        ) : (
                          <div className="inline-flex items-center justify-center w-6 h-6 bg-gray-100 dark:bg-gray-800 rounded-full">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Questions about pricing?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We're here to help you find the perfect plan for your coaching practice.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-yellow-500 text-white rounded-xl font-semibold hover:bg-yellow-600 transition-colors"
          >
            Contact Sales
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
} 