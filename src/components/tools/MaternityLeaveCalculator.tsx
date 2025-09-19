import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const MaternityLeaveCalculator: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [startDate, setStartDate] = useState('');
  const [duration, setDuration] = useState('12');

  const result = useMemo(() => {
    if (!startDate || !duration) return null;
    const start = new Date(startDate);
    const leaveWeeks = parseInt(duration);
    const endDate = new Date(start.getTime() + leaveWeeks * 7 * 24 * 60 * 60 * 1000);
    
    const formatDate = (date: Date) => date.toLocaleDateString(currentLanguage.code === 'ar' ? 'ar-EG' : 'en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });

    return {
      endDate: formatDate(endDate),
    };
  }, [startDate, duration, currentLanguage.code]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {currentLanguage.code === 'ar' ? 'تاريخ بدء الإجازة' : 'Leave Start Date'}
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {currentLanguage.code === 'ar' ? 'مدة الإجازة (أسابيع)' : 'Leave Duration (weeks)'}
          </label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg"
            placeholder="12"
          />
        </div>
      </div>
      
      {result && (
        <div className="bg-pink-50 p-6 rounded-lg text-center">
          <p className="text-sm text-pink-700">{currentLanguage.code === 'ar' ? 'تاريخ العودة المقدر للعمل' : 'Estimated Return to Work Date'}</p>
          <p className="text-2xl font-bold text-pink-600">{result.endDate}</p>
        </div>
      )}
    </div>
  );
};

export default MaternityLeaveCalculator;
