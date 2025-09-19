import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Search, CheckCircle, XCircle } from 'lucide-react';

const foodData = {
  en: {
    safe: ['Well-cooked meat & poultry', 'Pasteurized dairy', 'Cooked eggs', 'Washed fruits & vegetables', 'Most fish (in moderation)'],
    avoid: ['Raw or undercooked meat/fish', 'Unpasteurized cheese/milk', 'Raw eggs', 'Deli meats', 'High-mercury fish (e.g., shark)', 'Alcohol'],
  },
  ar: {
    safe: ['اللحوم والدواجن المطهوة جيداً', 'منتجات الألبان المبسترة', 'البيض المطهو', 'الفواكه والخضروات المغسولة', 'معظم الأسماك (باعتدال)'],
    avoid: ['اللحوم/الأسماك النيئة أو غير المطهوة', 'الجبن/الحليب غير المبستر', 'البيض النيئ', 'اللحوم الباردة', 'الأسماك عالية الزئبق (مثل القرش)', 'الكحول'],
  },
};

const FoodGuide: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const data = currentLanguage.code === 'ar' ? foodData.ar : foodData.en;

  const allFoods = [...data.safe.map(f => ({ name: f, status: 'safe' })), ...data.avoid.map(f => ({ name: f, status: 'avoid' }))];
  const filteredFoods = searchTerm ? allFoods.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase())) : allFoods;

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder={currentLanguage.code === 'ar' ? 'ابحث عن طعام...' : 'Search for a food...'}
          className="w-full pl-9 p-2 border rounded-lg"
        />
      </div>
      <div className="max-h-80 overflow-y-auto space-y-2 pr-2">
        {filteredFoods.map(food => (
          <div key={food.name} className={`flex items-center p-3 rounded-lg ${food.status === 'safe' ? 'bg-green-50' : 'bg-red-50'}`}>
            {food.status === 'safe' ? <CheckCircle className="w-5 h-5 text-green-500 mr-3" /> : <XCircle className="w-5 h-5 text-red-500 mr-3" />}
            <span className="text-gray-800">{food.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodGuide;
