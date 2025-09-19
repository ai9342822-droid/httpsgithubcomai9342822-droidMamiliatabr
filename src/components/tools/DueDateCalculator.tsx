import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const DueDateCalculator: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [lmp, setLmp] = useState('');

  const result = useMemo(() => {
    if (!lmp) return null;
    const lmpDate = new Date(lmp);
    const dueDate = new Date(lmpDate.getTime() + 280 * 24 * 60 * 60 * 1000);
    const today = new Date();
    const gestationDays = Math.floor((today.getTime() - lmpDate.getTime()) / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(gestationDays / 7);
    const days = gestationDays % 7;
    return {
      dueDate: dueDate.toLocaleDateString(currentLanguage.code === 'ar' ? 'ar-EG' : 'en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      }),
      gestation: `${weeks} ${currentLanguage.code === 'ar' ? 'أسابيع' : 'weeks'} ${days} ${currentLanguage.code === 'ar' ? 'أيام' : 'days'}`,
    };
  }, [lmp, currentLanguage.code]);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {currentLanguage.code === 'ar' ? 'تاريخ أول يوم من آخر دورة شهرية' : 'First Day of Last Menstrual Period'}
        </label>
        <input
          type="date"
          value={lmp}
          onChange={(e) => setLmp(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        />
      </div>
      
      {result && (
        <div className="bg-pink-50 p-6 rounded-lg border border-pink-200">
          <h3 className="text-lg font-semibold mb-4 text-pink-800">
            {currentLanguage.code === 'ar' ? 'نتائجك' : 'Your Results'}
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-pink-700">{currentLanguage.code === 'ar' ? 'التاريخ المتوقع للولادة' : 'Estimated Due Date'}</p>
              <p className="text-2xl font-bold text-pink-600">{result.dueDate}</p>
            </div>
            <div>
              <p className="text-sm text-pink-700">{currentLanguage.code === 'ar' ? 'عمر الحمل الحالي' : 'Current Gestational Age'}</p>
              <p className="text-lg font-semibold text-pink-600">{result.gestation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DueDateCalculator;
