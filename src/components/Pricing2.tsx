
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Pricing2 = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Plan</h2>
          <p className="text-xl text-muted-foreground">
            Select the perfect plan for your SEO needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="relative">
            <CardHeader>
              <CardTitle>Starter</CardTitle>
              <CardDescription>Perfect for beginners</CardDescription>
              <div className="text-3xl font-bold">$29<span className="text-sm font-normal">/month</span></div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">✓ 10 Keywords tracked</li>
                <li className="flex items-center">✓ Basic SEO analysis</li>
                <li className="flex items-center">✓ Monthly reports</li>
              </ul>
              <Button className="w-full">Get Started</Button>
            </CardContent>
          </Card>
          
          <Card className="relative border-primary">
            <CardHeader>
              <CardTitle>Professional</CardTitle>
              <CardDescription>Most popular choice</CardDescription>
              <div className="text-3xl font-bold">$79<span className="text-sm font-normal">/month</span></div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">✓ 100 Keywords tracked</li>
                <li className="flex items-center">✓ Advanced SEO analysis</li>
                <li className="flex items-center">✓ Weekly reports</li>
                <li className="flex items-center">✓ Competitor analysis</li>
              </ul>
              <Button className="w-full">Get Started</Button>
            </CardContent>
          </Card>
          
          <Card className="relative">
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
              <CardDescription>For large organizations</CardDescription>
              <div className="text-3xl font-bold">$199<span className="text-sm font-normal">/month</span></div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">✓ Unlimited keywords</li>
                <li className="flex items-center">✓ Advanced SEO analysis</li>
                <li className="flex items-center">✓ Daily reports</li>
                <li className="flex items-center">✓ Priority support</li>
              </ul>
              <Button className="w-full">Get Started</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Pricing2;
