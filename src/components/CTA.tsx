
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CTA = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Submitted email:', email);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail('');
      
      // Reset form state after showing success message
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1000);
  };

  return (
    <section id="cta" className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-brand-purple/90 to-brand-blue/90 rounded-2xl p-10 text-white text-center relative overflow-hidden shadow-xl">
          {/* Background elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to boost your website's SEO on autopilot?
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
              Get started with SEOHelper.ai today and receive your first AI-generated blog post and SEO recommendations within 48 hours.
            </p>
            
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              {!isSubmitted ? (
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Input 
                      type="email" 
                      placeholder="Enter your email address" 
                      className="bg-white text-gray-800 border-0 h-12" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {error && <p className="text-red-200 text-left text-sm mt-1">{error}</p>}
                  </div>
                  <Button 
                    type="submit" 
                    className="bg-white text-brand-purple hover:bg-gray-100 h-12" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Get Started'}
                  </Button>
                </div>
              ) : (
                <div className="bg-white/20 rounded-md p-4">
                  <p className="text-white">
                    Thank you! We've sent more information to your email. Check your inbox to complete your registration.
                  </p>
                </div>
              )}
            </form>
            
            <p className="text-sm text-white/80 mt-6">
              No credit card required to get started. 14-day money-back guarantee.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
