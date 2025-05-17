
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';

interface RegistrationFormProps {
  onSubmit: (userData: any) => void;
  isLoading: boolean;
}

const RegistrationForm = ({ onSubmit, isLoading }: RegistrationFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Netherlands',
    companyName: '',
    websiteUrl: '',
    subscription: 'basic'
  });
  const [step, setStep] = useState(1);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };
  
  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const subscriptions = [
    { 
      id: 'basic', 
      name: 'Basic', 
      price: '€19/month', 
      features: [
        '1 SEO Blog Post',
        'Basic SEO Tips',
        'SEO Checklist'
      ] 
    },
    { 
      id: 'pro', 
      name: 'Pro', 
      price: '€39/month',
      features: [
        '3 SEO Blog Posts',
        'Advanced SEO Tips',
        'SEO Checklist',
        'Meta Tags Generation',
        'Small SEO Fixes'
      ]
    },
    { 
      id: 'ultimate', 
      name: 'Ultimate', 
      price: '€59/month',
      popular: true,
      features: [
        '9 SEO Blog Posts',
        'Advanced SEO Tips',
        'SEO Checklist',
        'Meta Tags Generation',
        'Monthly SEO Report',
        'GMB Post Suggestions',
        'Priority Website Scan',
        'Email Support'
      ]
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Personal Information</h2>
          
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">First Name</Label>
              <Input 
                id="name" 
                name="name"
                placeholder="John" 
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input 
                id="lastName" 
                name="lastName"
                placeholder="Doe" 
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email"
              type="email" 
              placeholder="john@example.com" 
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                name="password"
                type="password" 
                placeholder="••••••••" 
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                id="confirmPassword" 
                name="confirmPassword"
                type="password" 
                placeholder="••••••••" 
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              name="phone"
              type="tel" 
              placeholder="+31 6 12345678" 
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="pt-4 flex justify-end">
            <Button 
              type="button" 
              onClick={handleNext}
              className="bg-gradient-to-r from-brand-purple to-brand-blue text-white"
            >
              Next
            </Button>
          </div>
        </div>
      )}
      
      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Address & Website</h2>
          
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input 
              id="address" 
              name="address"
              placeholder="123 Main Street" 
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input 
                id="city" 
                name="city"
                placeholder="Amsterdam" 
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input 
                id="postalCode" 
                name="postalCode"
                placeholder="1234 AB" 
                value={formData.postalCode}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select 
              value={formData.country} 
              onValueChange={(value) => handleSelectChange("country", value)}
            >
              <SelectTrigger id="country">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Netherlands">Netherlands</SelectItem>
                <SelectItem value="Belgium">Belgium</SelectItem>
                <SelectItem value="Germany">Germany</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name (optional)</Label>
            <Input 
              id="companyName" 
              name="companyName"
              placeholder="Company Ltd." 
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="websiteUrl">Website URL</Label>
            <Input 
              id="websiteUrl" 
              name="websiteUrl"
              type="url" 
              placeholder="https://yourwebsite.com" 
              value={formData.websiteUrl}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="pt-4 flex justify-between">
            <Button 
              type="button" 
              onClick={handlePrevious}
              variant="outline"
            >
              Previous
            </Button>
            <Button 
              type="button" 
              onClick={handleNext}
              className="bg-gradient-to-r from-brand-purple to-brand-blue text-white"
            >
              Next
            </Button>
          </div>
        </div>
      )}
      
      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-2">Choose Your Subscription</h2>
          <p className="text-gray-600 mb-4">Select the subscription that best fits your needs.</p>
          
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            {subscriptions.map(sub => (
              <Card 
                key={sub.id} 
                className={`relative cursor-pointer hover:border-brand-purple transition-colors ${
                  formData.subscription === sub.id ? 'border-brand-purple ring-2 ring-brand-purple' : ''
                } ${sub.popular ? 'shadow-md' : ''}`}
                onClick={() => handleSelectChange("subscription", sub.id)}
              >
                {sub.popular && (
                  <div className="absolute top-0 right-0 bg-brand-purple text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                    POPULAR
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">{sub.name}</h3>
                    {formData.subscription === sub.id && (
                      <Check className="w-5 h-5 text-brand-purple" />
                    )}
                  </div>
                  <div className="mb-4">
                    <span className="text-2xl font-bold">{sub.price}</span>
                  </div>
                  <ul className="space-y-2">
                    {sub.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Check className="w-4 h-4 mr-2 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="pt-4">
            <h3 className="text-lg font-bold mb-3">Payment Method</h3>
            <div className="p-4 border rounded-lg bg-gray-50">
              <p className="text-center text-gray-600 mb-3">In a real implementation, this would include integration with a payment system like Mollie or Stripe for IDEAL, credit card, etc.</p>
              <div className="flex justify-center gap-3">
                <div className="p-2 border bg-white rounded">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/IDEAL_Logo.svg/640px-IDEAL_Logo.svg.png" alt="iDEAL" className="h-6" />
                </div>
                <div className="p-2 border bg-white rounded">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/640px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6" />
                </div>
                <div className="p-2 border bg-white rounded">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/640px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-4 flex justify-between">
            <Button 
              type="button" 
              onClick={handlePrevious}
              variant="outline"
            >
              Previous
            </Button>
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-brand-purple to-brand-blue text-white"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register & Pay"}
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};

export default RegistrationForm;
