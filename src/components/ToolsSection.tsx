import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { ToolCard } from './ToolCard';
import { AdSlot } from './AdSlot';
import { pregnancyTools } from '../data/tools';
import { Tool } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';

interface ToolsSectionProps {
  onOpenTool: (tool: Tool) => void;
  onReadBlog: (toolId: string) => void;
}

const ToolCategorySection = ({
  title,
  tools,
  onOpenTool,
  onReadBlog,
  anchorId,
}: {
  title: string;
  tools: Tool[];
  onOpenTool: (tool: Tool) => void;
  onReadBlog: (toolId: string) => void;
  anchorId: string;
}) => (
  <motion.div
    id={anchorId}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="mb-16 scroll-mt-24"
  >
    <h3 className="text-2xl font-bold mb-8 text-center text-gray-800">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool, index) => (
        <motion.div
          key={tool.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.5 }}
        >
          <ToolCard tool={tool} onOpenTool={onOpenTool} onReadBlog={onReadBlog} />
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export function ToolsSection({ onOpenTool, onReadBlog }: ToolsSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const { t, currentLanguage } = useLanguage();

  const filterTools = (tools: Tool[]) => {
    if (!searchTerm) return tools;
    return tools.filter(tool => {
      const name = currentLanguage.code === 'ar' ? tool.nameAr : tool.nameEn;
      const description = currentLanguage.code === 'ar' ? tool.descriptionAr : tool.descriptionEn;
      return (
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };

  const coreTools = filterTools(pregnancyTools.filter(t => t.categoryEn === 'Core'));
  const advancedTools = filterTools(pregnancyTools.filter(t => t.categoryEn === 'Advanced'));
  const supplementaryTools = filterTools(pregnancyTools.filter(t => t.categoryEn === 'Supplementary'));

  const allFilteredTools = [...coreTools, ...advancedTools, ...supplementaryTools];

  return (
    <section id="tools" className="py-20 bg-white/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
            {t('tools.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('tools.subtitle')}</p>
        </motion.div>

        <div className="mb-12 sticky top-20 z-40 bg-white/80 backdrop-blur-sm py-4 rounded-xl shadow-sm">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={currentLanguage.code === 'ar' ? 'ابحث في جميع الأدوات...' : 'Search all tools...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {allFilteredTools.length > 0 ? (
          <>
            {coreTools.length > 0 && (
              <ToolCategorySection
                title={t('tools.core')}
                tools={coreTools}
                onOpenTool={onOpenTool}
                onReadBlog={onReadBlog}
                anchorId="tools-core"
              />
            )}

            <div className="my-16">
              <AdSlot position="content" size="large" />
            </div>

            {advancedTools.length > 0 && (
              <ToolCategorySection
                title={t('tools.advanced')}
                tools={advancedTools}
                onOpenTool={onOpenTool}
                onReadBlog={onReadBlog}
                anchorId="tools-advanced"
              />
            )}
            
            {supplementaryTools.length > 0 && (
              <ToolCategorySection
                title={t('tools.supplementary')}
                tools={supplementaryTools}
                onOpenTool={onOpenTool}
                onReadBlog={onReadBlog}
                anchorId="tools-supplementary"
              />
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {currentLanguage.code === 'ar' ? 'لم يتم العثور على أدوات' : 'No tools found'}
            </h3>
            <p className="text-gray-500">
              {currentLanguage.code === 'ar' ? 'جرب البحث بكلمات مختلفة' : 'Try searching with different keywords'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
