import React from 'react';
import { Tool } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

interface ComingSoonToolProps {
  tool: Tool;
}

const ComingSoonTool: React.FC<ComingSoonToolProps> = ({ tool }) => {
  const { currentLanguage } = useLanguage();

  return (
    <div className="text-center py-12 flex flex-col items-center justify-center h-full">
      <div className="text-6xl mb-4">{tool.icon}</div>
      <h3 className="text-xl font-semibold text-gray-600 mb-2">
        {currentLanguage.code === 'ar' ? 'قريباً' : 'Coming Soon'}
      </h3>
      <p className="text-gray-500 max-w-sm">
        {currentLanguage.code === 'ar' 
          ? 'هذه الأداة قيد التطوير وستكون متاحة قريباً. نحن نعمل بجد لإطلاقها!'
          : 'This tool is under development and will be available soon. We are working hard to launch it!'
        }
      </p>
    </div>
  );
};

export default ComingSoonTool;
