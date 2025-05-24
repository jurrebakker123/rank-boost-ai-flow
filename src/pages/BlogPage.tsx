
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BlogPage = () => {
  const blogPosts = [
    {
      title: "10 SEO Tips die je Google Rankings direct verbeteren",
      excerpt: "Ontdek de meest effectieve SEO-strategieën die je vandaag nog kunt implementeren om hoger te ranken in Google.",
      author: "SEO Expert Team",
      date: "15 maart 2024",
      readTime: "5 min lezen",
      category: "SEO Tips"
    },
    {
      title: "Hoe AI de toekomst van content marketing verandert",
      excerpt: "AI-tools revolutioneren de manier waarop we content creëren. Leer hoe je AI kunt gebruiken voor betere SEO-resultaten.",
      author: "Content Specialist",
      date: "12 maart 2024",
      readTime: "7 min lezen",
      category: "AI & Content"
    },
    {
      title: "Lokale SEO: Zo word je gevonden in je buurt",
      excerpt: "Praktische tips om je lokale zichtbaarheid te vergroten en meer klanten uit je omgeving aan te trekken.",
      author: "Lokale SEO Expert",
      date: "8 maart 2024",
      readTime: "6 min lezen",
      category: "Lokale SEO"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-brand-purple to-brand-blue py-20">
          <div className="container mx-auto px-4">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                SEO Knowledge Hub
              </h1>
              <p className="text-xl max-w-3xl mx-auto">
                Ontdek de nieuwste SEO-trends, tips en strategieën om je online zichtbaarheid te vergroten
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <article key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-brand-purple/20 to-brand-blue/20"></div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="bg-brand-purple/10 text-brand-purple px-2 py-1 rounded text-xs">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {post.date}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <User size={14} />
                        {post.author}
                      </div>
                      <Button variant="ghost" size="sm" className="text-brand-purple hover:text-brand-purple/80">
                        Lees meer <ArrowRight size={14} className="ml-1" />
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
