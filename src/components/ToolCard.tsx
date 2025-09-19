import React from 'react';
import { ExternalLink, BookOpen } from 'lucide-react';
import { Tool } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';

interface ToolCardProps {
  tool: Tool;
  onOpenTool: (tool: Tool) => void;
  onReadBlog: (blogId: string) => void;
}

export function ToolCard({ tool, onOpenTool, onReadBlog }: ToolCardProps) {
  const { currentLanguage, t, isRTL } = useLanguage();

  const name = currentLanguage.code === 'ar' ? tool.nameAr : tool.nameEn;
  const description = currentLanguage.code === 'ar' ? tool.descriptionAr : tool.descriptionEn;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      {/* Featured Badge */}
      {tool.featured && (
        <div className="absolute -top-2 -right-2 bg-gradient-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          ⭐ {isRTL ? 'مميز' : 'Featured'}
        </div>
      )}

      {/* Icon */}
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {tool.icon}
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-secondary-600 transition-colors">
        {name}
      </h3>
      
      <p className="text-gray-600 mb-6 leading-relaxed">
        {description}
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => onOpenTool(tool)}
          className="btn-primary flex-1 flex items-center justify-center space-x-2"
        >
          <ExternalLink className="w-4 h-4" />
          <span>{isRTL ? 'افتح الأداة' : 'Open Tool'}</span>
        </button>
        
        <button
          onClick={() => onReadBlog(`blog-${tool.id}`)}
          className="btn-secondary flex items-center justify-center space-x-2"
        >
          <BookOpen className="w-4 h-4" />
          <span>{t('blog.readMore')}</span>
        </button>
      </div>
    </motion.div>
  );
}
