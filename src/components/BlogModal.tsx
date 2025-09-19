import React from 'react';
import { X, Calendar, Clock, Tag, Share2 } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import { pregnancyTools } from '../data/tools';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Tool } from '../types';

interface BlogModalProps {
  blogId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenTool: (tool: Tool) => void;
}

export function BlogModal({ blogId, isOpen, onClose, onOpenTool }: BlogModalProps) {
  const { currentLanguage, t } = useLanguage();

  const post = blogPosts.find(p => p.id === blogId);

  if (!post) return null;

  const tool = pregnancyTools.find(t => t.id === post.toolId);

  const handleOpenToolClick = () => {
    if (tool) {
      onClose();
      onOpenTool(tool);
    }
  };

  const title = currentLanguage.code === 'ar' ? post.titleAr : post.titleEn;
  const content = currentLanguage.code === 'ar' ? post.contentAr : post.contentEn;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={onClose}
          />

          <div className="min-h-screen px-4 text-center">
            <div className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="inline-block w-full max-w-4xl p-0 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
            >
              <div className="relative">
                <div className="h-64 w-full">
                  <img src={post.image} alt={title} className="h-full w-full object-cover" />
                </div>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="p-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime} {t('blog.readTime')}</span>
                  </div>
                  <button className="flex items-center space-x-2 hover:text-pink-600 transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span>{currentLanguage.code === 'ar' ? 'مشاركة' : 'Share'}</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-pink-100 text-pink-700 capitalize"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="prose prose-lg max-w-none prose-p:text-gray-700 prose-p:leading-relaxed">
                  {content.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-12 p-6 bg-gradient-to-r from-pink-50 to-pink-100 rounded-xl text-center">
                  <h3 className="text-xl font-bold text-pink-800 mb-2">
                    {currentLanguage.code === 'ar' ? 'جربي الأداة الآن' : 'Try the Tool Now'}
                  </h3>
                  <p className="mb-4 text-pink-700">
                    {currentLanguage.code === 'ar' 
                      ? 'استخدمي الأداة المرتبطة بهذا المقال لتحصلي على نتائج مخصصة لك'
                      : 'Use the tool associated with this article to get personalized results'
                    }
                  </p>
                  <button onClick={handleOpenToolClick} className="btn-primary">
                    {currentLanguage.code === 'ar' ? 'افتح الأداة' : 'Open Tool'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
