import React, { useState } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useLanguage, languages } from '../contexts/LanguageContext';
import { AdSlot } from './AdSlot';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isToolsMenuOpen, setIsToolsMenuOpen] = useState(false);
  const { currentLanguage, setLanguage, t } = useLanguage();

  const navigation = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.blog', href: '#blog' },
    { key: 'nav.about', href: '#about' },
    { key: 'nav.contact', href: '#contact' }
  ];

  const toolCategories = [
    { key: 'nav.tools.core', href: '#tools-core' },
    { key: 'nav.tools.advanced', href: '#tools-advanced' },
    { key: 'nav.tools.supplementary', href: '#tools-supplementary' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="container">
        <div className="py-2 border-b border-gray-200">
          <AdSlot position="header" size="small" />
        </div>
        
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
                {t('site.title')}
              </h1>
              <p className="text-xs text-gray-600">{t('site.tagline')}</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a key={item.key} href={item.href} className="text-gray-700 hover:text-pink-600 font-medium transition-colors">
                {t(item.key)}
              </a>
            ))}
            <div className="relative" onMouseEnter={() => setIsToolsMenuOpen(true)} onMouseLeave={() => setIsToolsMenuOpen(false)}>
              <button className="flex items-center text-gray-700 hover:text-pink-600 font-medium transition-colors">
                {t('nav.tools')}
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <AnimatePresence>
                {isToolsMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 w-48 bg-white rounded-lg shadow-lg border py-2"
                  >
                    {toolCategories.map((item) => (
                      <a key={item.key} href={item.href} className="block px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600">
                        {t(item.key)}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{currentLanguage.nativeName}</span>
              </button>
              
              {isLanguageMenuOpen && (
                <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border py-2 min-w-[120px]">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setLanguage(lang); setIsLanguageMenuOpen(false); }}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors ${currentLanguage.code === lang.code ? 'bg-pink-50 text-pink-600' : ''}`}
                    >
                      {lang.nativeName}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <a key={item.key} href={item.href} className="text-gray-700 hover:text-pink-600 font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>
                  {t(item.key)}
                </a>
              ))}
              <div className="border-t pt-4 mt-2">
                <p className="font-semibold text-gray-800 mb-2">{t('nav.tools')}</p>
                {toolCategories.map((item) => (
                  <a key={item.key} href={item.href} className="block py-2 text-gray-700 hover:text-pink-600" onClick={() => setIsMenuOpen(false)}>
                    {t(item.key)}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
