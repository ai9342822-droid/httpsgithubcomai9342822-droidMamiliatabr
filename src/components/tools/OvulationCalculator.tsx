import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const OvulationCalculator: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [lmp, setLmp] = useState('');
  const [cycleLength, setCycleLength] = useState('28');

  const result = useMemo(() => {
    if (!lmp || !cycleLength) return null;
    const lmpDate = new Date(lmp);
    const ovulationDay = 14;
    const estimatedOvulation = new Date(lmpDate.getTime() + (parseInt(cycleLength) - ovulationDay) * 24 * 60 * 60 * 1000);
    const fertileStart = new Date(estimatedOvulation.getTime() - 5 * 24 * 60 * 60 * 1000);
    const fertileEnd = new Date(estimatedOvulation.getTime() + 1 * 24 * 60 * 60 * 1000);
    
    const formatDate = (date: Date) => date.toLocaleDateString(currentLanguage.code === 'ar' ? 'ar-EG' : 'en-US', { month: 'long', day: 'numeric' });

    return {
      ovulationDate: formatDate(estimatedOvulation),
      fertileWindow: `${formatDate(fertileStart)} - ${formatDate(fertileEnd)}`,
    };
  }, [lmp, cycleLength, currentLanguage.code]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{currentLanguage.code === 'ar' ? 'تاريخ آخر دورة' : 'Last Period Date'}</label>
          <input type="date" value={lmp} onChange={(e) => setLmp(e.target.value)} className="w-full px-4 py-3 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{currentLanguage.code === 'ar' ? 'طول الدورة (أيام)' : 'Cycle Length (days)'}</label>
          <input type="number" value={cycleLength} onChange={(e) => setCycleLength(e.target.value)} className="w-full px-4 py-3 border rounded-lg" />
        </div>
      </div>
      
      {result && (
        <div className="bg-pink-50 p-6 rounded-lg">
          <p>{currentLanguage.code === 'ar' ? 'يوم الإباضة المقدر:' : 'Estimated Ovulation Day:'} <strong className="text-pink-600">{result.ovulationDate}</strong></p>
          <p>{currentLanguage.code === 'ar' ? 'نافذة الخصوبة:' : 'Fertile Window:'} <strong className="text-pink-600">{result.fertileWindow}</strong></p>
        </div>
      )}
    </div>
  );
};

export default OvulationCalculator;
