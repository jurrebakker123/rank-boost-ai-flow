
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const faqs: FAQItem[] = [
    {
      question: "How does SEOHelper.ai create blog content?",
      answer: "Our AI technology analyzes your business, industry, and target keywords to generate unique, SEO-optimized blog posts tailored specifically to your needs. The content is written to be engaging for readers while including the right keywords and structure to help improve search rankings."
    },
    {
      question: "Do I need technical SEO knowledge to use this service?",
      answer: "Not at all! SEOHelper.ai is designed for business owners with no technical SEO expertise. Everything is automated and presented in an easy-to-understand format. You simply provide basic information about your business during setup, and our system handles the rest."
    },
    {
      question: "Can I edit the blog posts before publishing them?",
      answer: "Absolutely! All blog content is delivered through your dashboard where you can preview, download, and modify it before publishing. While the content is ready to use as-is, you always have the option to add your personal touch or specific details."
    },
    {
      question: "How often will I receive new content and reports?",
      answer: "Content delivery depends on your subscription plan. Basic plan subscribers receive 1 blog post monthly, while higher-tier plans receive multiple posts. SEO reports are delivered monthly to Pro plan subscribers and above. All content and reports are accessible through your dashboard as soon as they're ready."
    },
    {
      question: "Can I change my subscription plan later?",
      answer: "Yes, you can upgrade, downgrade, or cancel your subscription at any time through your dashboard. Changes to your plan will take effect at the start of your next billing cycle."
    },
    {
      question: "Is there a minimum contract period?",
      answer: "No, we don't lock you into long-term contracts. All plans are billed monthly and you can cancel anytime. We also offer a 14-day money-back guarantee if you're not satisfied with our service."
    },
    {
      question: "Will the content be original and unique to my business?",
      answer: "Yes, all content created by SEOHelper.ai is 100% original and specifically written for your business based on the information you provide during onboarding. Each piece of content is tailored to your industry, target keywords, and brand voice."
    },
    {
      question: "How long does it take to see results from SEO?",
      answer: "SEO is a long-term strategy that typically shows meaningful results within 3-6 months. While some improvements may be noticeable sooner, consistent content publishing and implementation of our recommendations over several months will yield the best results for your search rankings and traffic."
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about SEOHelper.ai and how it can help your business.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
