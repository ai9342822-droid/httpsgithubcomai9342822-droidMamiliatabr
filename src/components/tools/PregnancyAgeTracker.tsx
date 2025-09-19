import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const PregnancyAgeTracker: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [lmp, setLmp] = useState('');

  const result = useMemo(() => {
    if (!lmp) return null;
    const lmpDate = new Date(lmp);
    const today = new Date();
    
    if (lmpDate > today) return { error: currentLanguage.code === 'ar' ? 'التاريخ يجب أن يكون في الماضي.' : 'Date must be in the past.' };

    const gestationDays = Math.floor((today.getTime() - lmpDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (gestationDays < 0) return { error: currentLanguage.code === 'ar' ? 'التاريخ يجب أن يكون في الماضي.' : 'Date must be in the past.' };

    const weeks = Math.floor(gestationDays / 7);
    const days = gestationDays % 7;
    const remainingWeeks = 40 - weeks;
    const trimester = weeks <= 13 ? 1 : weeks <= 27 ? 2 : 3;

    return {
      gestation: `${weeks} ${currentLanguage.code === 'ar' ? 'أسابيع' : 'weeks'}, ${days} ${currentLanguage.code === 'ar' ? 'أيام' : 'days'}`,
      remaining: `${remainingWeeks} ${currentLanguage.code === 'ar' ? 'أسابيع متبقية (تقريباً)' : 'weeks remaining (approx.)'}`,
      trimester: `${currentLanguage.code === 'ar' ? 'الثلث' : 'Trimester'} ${trimester}`,
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
            {currentLanguage.code === 'ar' ? 'تقدم حملك' : 'Your Pregnancy Progress'}
          </h3>
          {result.error ? (
             <p className="text-red-600">{result.error}</p>
          ) : (
            <div className="space-y-3">
              <div>
                <p className="text-sm text-pink-700">{currentLanguage.code === 'ar' ? 'عمر الحمل الحالي' : 'Current Gestational Age'}</p>
                <p className="text-xl font-bold text-pink-600">{result.gestation}</p>
              </div>
              <div>
                <p className="text-sm text-pink-700">{currentLanguage.code === 'ar' ? 'الثلث الحالي' : 'Current Trimester'}</p>
                <p className="text-lg font-semibold text-pink-600">{result.trimester}</p>
              </div>
              <div>
                <p className="text-sm text-pink-700">{currentLanguage.code === 'ar' ? 'الوقت المتبقي' : 'Time Remaining'}</p>
                <p className="text-lg font-semibold text-pink-600">{result.remaining}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PregnancyAgeTracker;
