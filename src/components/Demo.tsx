
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';

const Demo = () => {
  const [selectedTab, setSelectedTab] = useState("blog");

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="demo" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            See <span className="gradient-text">SEOHelper.ai</span> in Action
          </h2>
          <p className="text-lg text-gray-600">
            Preview what our platform delivers each month to help boost your search rankings.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="blog" className="w-full" onValueChange={setSelectedTab}>
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="blog">Blog Content</TabsTrigger>
              <TabsTrigger value="report">SEO Report</TabsTrigger>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            </TabsList>
            
            <TabsContent value="blog" className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-2xl font-semibold mb-4">Sample AI-Generated Blog Post</h3>
              <div className="bg-gray-50 p-6 rounded-md mb-6">
                <h4 className="text-xl font-medium mb-2">10 Essential SEO Strategies for Small Business Growth in 2025</h4>
                <div className="flex items-center gap-3 mb-4 text-sm text-gray-600">
                  <span>Reading time: 6 min</span>
                  <span>•</span>
                  <span>SEO, Small Business, Marketing</span>
                </div>
                <p className="text-gray-700 mb-4">
                  In today's digital landscape, standing out online is more crucial than ever for small businesses. 
                  With the right SEO strategies, even modest-sized companies can achieve impressive visibility 
                  on search engines without breaking the bank.
                </p>
                <p className="text-gray-700 mb-4">
                  This comprehensive guide explores the 10 most effective SEO techniques that small businesses 
                  should implement in 2025 to boost their organic traffic, improve rankings, and ultimately 
                  drive more conversions...
                </p>
                <div className="text-brand-purple font-medium">Read more →</div>
              </div>
              <div className="text-sm text-gray-600">
                <p>
                  <strong>Note:</strong> Each blog post is uniquely generated for your business, optimized for your target keywords, 
                  and formatted to be ready for immediate publishing. We'll deliver fresh content directly 
                  to your dashboard every month.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="report" className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-2xl font-semibold mb-4">Monthly SEO Report Preview</h3>
              <div className="bg-gray-50 p-6 rounded-md mb-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="text-xl font-medium">May 2025 SEO Performance</h4>
                    <p className="text-gray-600 text-sm">Report for example-business.com</p>
                  </div>
                  <div className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
                    +12% Improvement
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h5 className="font-medium mb-2">Traffic Overview</h5>
                    <div className="h-16 bg-gray-200 rounded-md overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center text-xs">Graph visualization</div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium mb-2">Top Performing Keywords</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>"small business marketing"</span>
                        <span className="text-green-600">Position #4 (+2)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>"local SEO services"</span>
                        <span className="text-green-600">Position #6 (+5)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>"digital marketing tips"</span>
                        <span className="text-amber-600">Position #12 (-1)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium mb-2">Recommended Actions</h5>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      <li>Update meta descriptions on your service pages</li>
                      <li>Add more internal links to your "SEO services" page</li>
                      <li>Improve page loading speed on mobile devices</li>
                      <li>Add FAQ schema to your top 3 landing pages</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p>
                  <strong>Note:</strong> Each monthly report includes detailed metrics, keyword rankings, 
                  traffic analysis, and actionable recommendations customized for your website. Reports are 
                  delivered as downloadable PDFs.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="dashboard" className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-2xl font-semibold mb-4">Customer Dashboard Preview</h3>
              <div className="bg-gray-50 p-6 rounded-md mb-6">
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-medium">Welcome back, Business Owner</h4>
                    <div className="bg-brand-purple/10 text-brand-purple text-xs px-3 py-1 rounded-full font-medium">
                      Ultimate Plan
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-md border border-gray-200">
                      <h5 className="font-medium mb-2">Latest Blog Posts</h5>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span>"How to Optimize Your Website for Voice Search"</span>
                          <span className="text-brand-purple">View</span>
                        </li>
                        <li className="flex justify-between">
                          <span>"Local SEO Strategies That Drive Foot Traffic"</span>
                          <span className="text-brand-purple">View</span>
                        </li>
                        <li className="flex justify-between">
                          <span>"The Ultimate Guide to On-Page SEO"</span>
                          <span className="text-brand-purple">View</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-md border border-gray-200">
                      <h5 className="font-medium mb-2">Keywords</h5>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">seo services</span>
                        <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">small business marketing</span>
                        <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">website traffic</span>
                        <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">digital marketing</span>
                        <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">local business</span>
                        <span className="text-brand-purple text-xs">+ Edit Keywords</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-md border border-gray-200">
                      <h5 className="font-medium mb-2">Recent SEO Reports</h5>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span>May 2025 SEO Report</span>
                          <span className="text-brand-purple">Download</span>
                        </li>
                        <li className="flex justify-between">
                          <span>April 2025 SEO Report</span>
                          <span className="text-brand-purple">Download</span>
                        </li>
                        <li className="flex justify-between">
                          <span>March 2025 SEO Report</span>
                          <span className="text-brand-purple">Download</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-md border border-gray-200">
                      <h5 className="font-medium mb-2">Account Settings</h5>
                      <div className="space-y-2 text-sm">
                        <div>Subscription: Ultimate Plan</div>
                        <div>Next billing date: Jun 15, 2025</div>
                        <div className="pt-2">
                          <span className="text-brand-purple">Manage Subscription</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p>
                  <strong>Note:</strong> Your personalized dashboard gives you easy access to all your SEO content, 
                  reports, and account settings in one place. You can view and download all resources or make changes 
                  to your preferences anytime.
                </p>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 text-center">
            <Button 
              onClick={() => scrollToSection('cta')}
              className="bg-gradient-to-r from-brand-purple to-brand-blue text-white hover:opacity-90 transition-opacity px-8 py-6 text-lg"
            >
              Start Boosting Your SEO Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
