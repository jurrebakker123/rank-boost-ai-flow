
import React from 'react';

interface Testimonial {
  quote: string;
  author: string;
  title: string;
  company: string;
}

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <div className="flex items-center space-x-1 text-yellow-400 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
    <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
    <div>
      <p className="font-semibold">{testimonial.author}</p>
      <p className="text-sm text-gray-600">{testimonial.title}, {testimonial.company}</p>
    </div>
  </div>
);

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      quote: "SEOHelper.ai has transformed our online presence. We're ranking for keywords we never imagined, and the quality of the blog content is exceptional.",
      author: "Sarah Thompson",
      title: "Marketing Director",
      company: "GreenTech Solutions"
    },
    {
      quote: "As a small business owner, I don't have time for SEO. This tool does everything automatically and I've seen my website traffic increase by 85% in just three months.",
      author: "Michael Chen",
      title: "Owner",
      company: "Urban Fitness Studio"
    },
    {
      quote: "The monthly reports are detailed yet easy to understand. I finally feel like I have control over my website's SEO without needing to become an expert.",
      author: "Jessica Rivera",
      title: "E-commerce Manager",
      company: "Boutique Fashions"
    },
    {
      quote: "Worth every penny. The blog posts are well-researched and the SEO recommendations have been spot-on. Our organic traffic is up 62% since we started.",
      author: "David Parker",
      title: "CEO",
      company: "Parker Financial Group"
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            What Our <span className="gradient-text">Customers Say</span>
          </h2>
          <p className="text-lg text-gray-600">
            Join hundreds of businesses already improving their SEO with our automated solution.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
