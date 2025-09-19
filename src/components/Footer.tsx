import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { AdSlot } from './AdSlot';
import { useLanguage } from '../contexts/LanguageContext';

export function Footer() {
  const { t, currentLanguage } = useLanguage();

  const footerSections = [
    {
      title: currentLanguage.code === 'ar' ? 'الأدوات' : 'Tools',
      links: [
        { name: currentLanguage.code === 'ar' ? 'حاسبة تاريخ الولادة' : 'Due Date Calculator', href: '#' },
        { name: currentLanguage.code === 'ar' ? 'متتبع الحمل' : 'Pregnancy Tracker', href: '#' },
        { name: currentLanguage.code === 'ar' ? 'مؤقت الانقباضات' : 'Contraction Timer', href: '#' },
        { name: currentLanguage.code === 'ar' ? 'عداد الركلات' : 'Kick Counter', href: '#' }
      ]
    },
    {
      title: currentLanguage.code === 'ar' ? 'الموارد' : 'Resources',
      links: [
        { name: currentLanguage.code === 'ar' ? 'دلائل الحمل' : 'Pregnancy Guides', href: '#' },
        { name: currentLanguage.code === 'ar' ? 'نصائح التغذية' : 'Nutrition Tips', href: '#' },
        { name: currentLanguage.code === 'ar' ? 'التمارين الآمنة' : 'Safe Exercises', href: '#' },
        { name: currentLanguage.code === 'ar' ? 'الأسئلة الشائعة' : 'FAQ', href: '#' }
      ]
    },
    {
      title: currentLanguage.code === 'ar' ? 'الشركة' : 'Company',
      links: [
        { name: currentLanguage.code === 'ar' ? 'عن الموقع' : 'About Us', href: '#about' },
        { name: currentLanguage.code === 'ar' ? 'اتصل بنا' : 'Contact', href: '#contact' },
        { name: currentLanguage.code === 'ar' ? 'الخصوصية' : 'Privacy Policy', href: '#' },
        { name: currentLanguage.code === 'ar' ? 'شروط الاستخدام' : 'Terms of Service', href: '#' }
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container">
        {/* Ad Slot - Footer */}
        <div className="py-8 border-b border-gray-800">
          <AdSlot position="footer" size="large" />
        </div>

        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white fill-current" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{t('site.title')}</h3>
                  <p className="text-gray-400 text-sm">{t('site.tagline')}</p>
                </div>
              </div>
              
              <p className="text-gray-400 mb-6 leading-relaxed">
                {currentLanguage.code === 'ar' 
                  ? 'ماميليا هو رفيقك الموثوق في رحلة الحمل، نقدم أدوات وموارد شاملة لدعمك في كل خطوة.'
                  : 'Mamilia is your trusted companion throughout your pregnancy journey, providing comprehensive tools and resources to support you every step of the way.'
                }
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Footer Sections */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="py-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <Mail className="w-5 h-5 text-primary-400" />
              <span className="text-gray-400">contact@mamilia.com</span>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <Phone className="w-5 h-5 text-primary-400" />
              <span className="text-gray-400">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <MapPin className="w-5 h-5 text-primary-400" />
              <span className="text-gray-400">
                {currentLanguage.code === 'ar' ? 'متاح عالمياً' : 'Available Worldwide'}
              </span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6 border-t border-gray-800 text-center text-gray-400">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
