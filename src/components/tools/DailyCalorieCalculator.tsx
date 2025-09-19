import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const DailyCalorieCalculator: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activity, setActivity] = useState('1.2');
  const [trimester, setTrimester] = useState('1');

  const result = useMemo(() => {
    if (!age || !height || !weight) return null;
    
    const bmr = 10 * parseFloat(weight) + 6.25 * parseFloat(height) - 5 * parseFloat(age) - 161;
    const tdee = bmr * parseFloat(activity);
    
    let trimesterBonus = 0;
    if (trimester === '2') trimesterBonus = 340;
    if (trimester === '3') trimesterBonus = 450;
    
    const totalCalories = tdee + trimesterBonus;

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      total: Math.round(totalCalories),
    };
  }, [age, height, weight, activity, trimester]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm mb-1">{currentLanguage.code === 'ar' ? 'العمر' : 'Age'}</label>
          <input type="number" value={age} onChange={e => setAge(e.target.value)} className="w-full p-2 border rounded-lg" placeholder="30" />
        </div>
        <div>
          <label className="block text-sm mb-1">{currentLanguage.code === 'ar' ? 'الطول (سم)' : 'Height (cm)'}</label>
          <input type="number" value={height} onChange={e => setHeight(e.target.value)} className="w-full p-2 border rounded-lg" placeholder="165" />
        </div>
        <div>
          <label className="block text-sm mb-1">{currentLanguage.code === 'ar' ? 'الوزن (كجم)' : 'Weight (kg)'}</label>
          <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="w-full p-2 border rounded-lg" placeholder="65" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">{currentLanguage.code === 'ar' ? 'مستوى النشاط' : 'Activity Level'}</label>
          <select value={activity} onChange={e => setActivity(e.target.value)} className="w-full p-2 border rounded-lg bg-white">
            <option value="1.2">{currentLanguage.code === 'ar' ? 'خامل' : 'Sedentary'}</option>
            <option value="1.375">{currentLanguage.code === 'ar' ? 'خفيف النشاط' : 'Lightly Active'}</option>
            <option value="1.55">{currentLanguage.code === 'ar' ? 'متوسط النشاط' : 'Moderately Active'}</option>
            <option value="1.725">{currentLanguage.code === 'ar' ? 'نشيط جدا' : 'Very Active'}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">{currentLanguage.code === 'ar' ? 'ثلث الحمل' : 'Trimester'}</label>
          <select value={trimester} onChange={e => setTrimester(e.target.value)} className="w-full p-2 border rounded-lg bg-white">
            <option value="1">{currentLanguage.code === 'ar' ? 'الأول' : 'First'}</option>
            <option value="2">{currentLanguage.code === 'ar' ? 'الثاني' : 'Second'}</option>
            <option value="3">{currentLanguage.code === 'ar' ? 'الثالث' : 'Third'}</option>
          </select>
        </div>
      </div>
      
      {result && (
        <div className="bg-pink-50 p-4 rounded-lg mt-4 text-center">
          <p className="text-sm text-pink-700">{currentLanguage.code === 'ar' ? 'احتياجك اليومي من السعرات الحرارية' : 'Estimated Daily Calorie Needs'}</p>
          <p className="text-3xl font-bold text-pink-600">{result.total} <span className="text-lg">kcal</span></p>
        </div>
      )}
    </div>
  );
};

export default DailyCalorieCalculator;
