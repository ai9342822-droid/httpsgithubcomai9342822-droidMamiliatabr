import React, { useState } from 'react';
import { Calendar, Clock, Tag } from 'lucide-react';
import { AdSlot } from './AdSlot';
import { blogPosts } from '../data/blogPosts';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';

interface BlogSectionProps {
  onReadBlog: (blogId: string) => void;
}

export function BlogSection({ onReadBlog }: BlogSectionProps) {
  const [selectedTag, setSelectedTag] = useState('all');
  const { t, currentLanguage } = useLanguage();

  const allTags = ['all', 'core', 'advanced', 'supplementary', 'guide', 'health'];
  
  const filteredPosts = selectedTag === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.tags.includes(selectedTag));

  const featuredPosts = filteredPosts.slice(0, 6);

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
            {t('blog.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                selectedTag === tag
                  ? 'bg-pink-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
              }`}
            >
              {tag === 'all' ? (currentLanguage.code === 'ar' ? 'الكل' : 'All') : tag}
            </button>
          ))}
        </motion.div>

        <div className="mb-12 lg:hidden">
          <AdSlot position="sidebar" size="medium" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPosts.map((post, index) => {
                const title = currentLanguage.code === 'ar' ? post.titleAr : post.titleEn;
                const content = currentLanguage.code === 'ar' ? post.contentAr : post.contentEn;
                
                return (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="card group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden"
                    onClick={() => onReadBlog(post.id)}
                  >
                    <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                      <img src={post.image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-pink-600 transition-colors line-clamp-2">
                        {title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {content.substring(0, 150)}...
                      </p>

                      <div className="flex items-center space-x-4 text-xs text-gray-500 pt-2">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime} {t('blog.readTime')}</span>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <AdSlot position="sidebar" size="medium" />
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">
                  {currentLanguage.code === 'ar' ? 'المقالات الشائعة' : 'Popular Posts'}
                </h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 5).map((post) => {
                    const title = currentLanguage.code === 'ar' ? post.titleAr : post.titleEn;
                    return (
                      <div
                        key={post.id}
                        onClick={() => onReadBlog(post.id)}
                        className="flex items-start space-x-3 cursor-pointer group"
                      >
                        <img src={post.image} alt={title} className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
                        <div>
                           <h4 className="text-sm font-medium line-clamp-2 mb-1 group-hover:text-pink-600 transition-colors">{title}</h4>
                           <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{post.readTime} {t('blog.readTime')}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
