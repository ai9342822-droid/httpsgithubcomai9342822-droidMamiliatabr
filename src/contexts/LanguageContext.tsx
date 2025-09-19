import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', direction: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', direction: 'rtl' }
];

const translations = {
  en: {
    'site.title': 'Mamilia',
    'site.tagline': 'Your Complete Pregnancy Journey Companion',
    'nav.home': 'Home',
    'nav.tools': 'Tools',
    'nav.tools.core': 'Core Tools',
    'nav.tools.advanced': 'Advanced Tools',
    'nav.tools.supplementary': 'Supplementary Tools',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'hero.title': 'Your Complete Pregnancy Journey Companion',
    'hero.subtitle': 'Track your pregnancy with 30+ professional tools, calculators, and expert guidance in both English and Arabic.',
    'hero.cta': 'Explore Tools',
    'tools.title': 'Pregnancy Tools & Calculators',
    'tools.subtitle': 'Professional tools to help you through every stage of pregnancy',
    'tools.featured': 'Featured Tools',
    'tools.all': 'All Tools',
    'tools.core': 'Core Tools',
    'tools.advanced': 'Advanced Tools',
    'tools.supplementary': 'Supplementary Tools',
    'blog.title': 'Pregnancy Blog & Guides',
    'blog.subtitle': 'Expert advice and comprehensive guides for your pregnancy journey',
    'blog.readMore': 'Read More',
    'blog.readTime': 'min read',
    'footer.copyright': '© 2025 Mamilia. All rights reserved.',
    'ads.placeholder': 'Advertisement Space'
  },
  ar: {
    'site.title': 'ماميليا',
    'site.tagline': 'رفيقك الكامل في رحلة الحمل',
    'nav.home': 'الرئيسية',
    'nav.tools': 'الأدوات',
    'nav.tools.core': 'الأدوات الأساسية',
    'nav.tools.advanced': 'الأدوات المتقدمة',
    'nav.tools.supplementary': 'الأدوات التكميلية',
    'nav.blog': 'المدونة',
    'nav.about': 'عن الموقع',
    'nav.contact': 'اتصل بنا',
    'hero.title': 'رفيقك الكامل في رحلة الحمل',
    'hero.subtitle': 'تابعي حملك مع أكثر من 30 أداة مهنية وحاسبات وإرشادات خبراء باللغتين العربية والإنجليزية.',
    'hero.cta': 'استكشف الأدوات',
    'tools.title': 'أدوات وحاسبات الحمل',
    'tools.subtitle': 'أدوات مهنية لمساعدتك في كل مرحلة من مراحل الحمل',
    'tools.featured': 'الأدوات المميزة',
    'tools.all': 'جميع الأدوات',
    'tools.core': 'الأدوات الأساسية',
    'tools.advanced': 'الأدوات المتقدمة',
    'tools.supplementary': 'الأدوات التكميلية',
    'blog.title': 'مدونة ودلائل الحمل',
    'blog.subtitle': 'نصائح الخبراء والأدلة الشاملة لرحلة حملك',
    'blog.readMore': 'اقرأ المزيد',
    'blog.readTime': 'دقيقة قراءة',
    'footer.copyright': '© 2025 ماميليا. جميع الحقوق محفوظة.',
    'ads.placeholder': 'مساحة إعلانية'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);

  useEffect(() => {
    const savedLang = localStorage.getItem('mamilia-language');
    if (savedLang) {
      const lang = languages.find(l => l.code === savedLang);
      if (lang) {
        setCurrentLanguage(lang);
      }
    }
  }, []);

  useEffect(() => {
    document.documentElement.dir = currentLanguage.direction;
    document.documentElement.lang = currentLanguage.code;
    localStorage.setItem('mamilia-language', currentLanguage.code);
  }, [currentLanguage]);

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
  };

  const t = (key: string): string => {
    return translations[currentLanguage.code][key as keyof typeof translations.en] || key;
  };

  const isRTL = currentLanguage.direction === 'rtl';

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export { languages };
