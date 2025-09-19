import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const IdealWeightCalculator: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [week, setWeek] = useState('');

  const result = useMemo(() => {
    if (!height || !weight || !week) return null;
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    const bmi = w / (h * h);
    
    let recommendedGain: [number, number];
    if (bmi < 18.5) recommendedGain = [12.5, 18];
    else if (bmi < 25) recommendedGain = [11.5, 16];
    else if (bmi < 30) recommendedGain = [7, 11.5];
    else recommendedGain = [5, 9];

    const currentWeek = parseInt(week);
    const gainPerWeek = (recommendedGain[0] + recommendedGain[1]) / 2 / 40;
    const idealGain = gainPerWeek * currentWeek;

    return {
      bmi: bmi.toFixed(1),
      recommendedGain: `${recommendedGain[0]} - ${recommendedGain[1]}`,
      idealGain: idealGain.toFixed(1),
    };
  }, [height, weight, week]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{currentLanguage.code === 'ar' ? 'الطول (سم)' : 'Height (cm)'}</label>
          <input type="number" value={height} onChange={e => setHeight(e.target.value)} className="w-full px-3 py-2 border rounded-lg" placeholder="165" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{currentLanguage.code === 'ar' ? 'الوزن قبل الحمل (كجم)' : 'Pre-pregnancy Weight (kg)'}</label>
          <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="w-full px-3 py-2 border rounded-lg" placeholder="60" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{currentLanguage.code === 'ar' ? 'أسبوع الحمل الحالي' : 'Current Week of Pregnancy'}</label>
        <input type="number" value={week} onChange={e => setWeek(e.target.value)} className="w-full px-3 py-2 border rounded-lg" placeholder="20" />
      </div>
      
      {result && (
        <div className="bg-pink-50 p-4 rounded-lg mt-4">
          <h3 className="font-semibold text-pink-800 mb-2">{currentLanguage.code === 'ar' ? 'النتائج' : 'Results'}</h3>
          <p>{currentLanguage.code === 'ar' ? 'مؤشر كتلة الجسم قبل الحمل:' : 'Pre-pregnancy BMI:'} <strong>{result.bmi}</strong></p>
          <p>{currentLanguage.code === 'ar' ? 'زيادة الوزن الموصى بها:' : 'Recommended Total Gain:'} <strong>{result.recommendedGain} kg</strong></p>
          <p>{currentLanguage.code === 'ar' ? 'الزيادة المثالية حتى الآن:' : 'Ideal Gain So Far:'} <strong>~{result.idealGain} kg</strong></p>
        </div>
      )}
    </div>
  );
};

export default IdealWeightCalculator;
