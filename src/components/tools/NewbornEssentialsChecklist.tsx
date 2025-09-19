import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const checklistData = {
  en: {
    'Feeding': ['Bottles', 'Formula (if using)', 'Burp cloths', 'Nursing pillow'],
    'Diapering': ['Diapers (newborn size)', 'Wipes', 'Diaper rash cream', 'Changing pad'],
    'Clothing': ['Onesies (5-7)', 'Sleepers (5-7)', 'Socks or booties', 'Hats', 'Swaddles'],
    'Bathing': ['Infant tub', 'Baby soap/shampoo', 'Soft towels', 'Lotion'],
    'Nursery': ['Crib or bassinet', 'Fitted sheets', 'Baby monitor', 'White noise machine'],
  },
  ar: {
    'التغذية': ['زجاجات الرضاعة', 'حليب صناعي (إذا لزم الأمر)', 'فوط التجشؤ', 'وسادة الرضاعة'],
    'تغيير الحفاض': ['حفاضات (مقاس حديثي الولادة)', 'مناديل مبللة', 'كريم طفح الحفاض', 'وسادة تغيير'],
    'الملابس': ['ملابس داخلية (5-7)', 'ملابس نوم (5-7)', 'جوارب', 'قبعات', 'قماطات'],
    'الاستحمام': ['حوض استحمام للرضع', 'صابون/شامبو أطفال', 'مناشف ناعمة', 'لوشن'],
    'غرفة الطفل': ['سرير أو مهد', 'شراشف ملائمة', 'جهاز مراقبة الطفل', 'جهاز الضوضاء البيضاء'],
  },
};

const NewbornEssentialsChecklist: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('newbornChecklist');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('newbornChecklist', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const handleToggle = (item: string) => {
    setCheckedItems(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const data = currentLanguage.code === 'ar' ? checklistData.ar : checklistData.en;

  return (
    <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
      {Object.entries(data).map(([category, items]) => (
        <div key={category}>
          <h3 className="text-lg font-semibold mb-2 text-pink-700">{category}</h3>
          <ul className="space-y-2">
            {items.map(item => (
              <li key={item}>
                <label className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!checkedItems[item]}
                    onChange={() => handleToggle(item)}
                    className="h-5 w-5 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                  />
                  <span className={`text-gray-700 ${checkedItems[item] ? 'line-through text-gray-400' : ''}`}>{item}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default NewbornEssentialsChecklist;
