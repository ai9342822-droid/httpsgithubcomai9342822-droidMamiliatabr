import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const checklistData = {
  en: {
    'For Mom': ['ID and insurance card', 'Birth plan', 'Comfortable clothes', 'Nursing bra', 'Toiletries', 'Phone and charger'],
    'For Baby': ['Going-home outfit', 'Car seat', 'Baby blanket', 'Socks and mittens', 'Diapers and wipes'],
    'For Partner': ['Snacks and water', 'Change of clothes', 'Camera', 'Entertainment (book, tablet)'],
  },
  ar: {
    'للأم': ['بطاقة الهوية والتأمين', 'خطة الولادة', 'ملابس مريحة', 'حمالة صدر للرضاعة', 'أدوات النظافة', 'الهاتف والشاحن'],
    'للطفل': ['ملابس الخروج من المستشفى', 'مقعد السيارة', 'بطانية للطفل', 'جوارب وقفازات', 'حفاضات ومناديل مبللة'],
    'للشريك': ['وجبات خفيفة وماء', 'ملابس للتغيير', 'كاميرا', 'وسائل ترفيه (كتاب، جهاز لوحي)'],
  },
};

const HospitalBagChecklist: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('hospitalBagChecklist');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('hospitalBagChecklist', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const handleToggle = (item: string) => {
    setCheckedItems(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const data = currentLanguage.code === 'ar' ? checklistData.ar : checklistData.en;

  return (
    <div className="space-y-6">
      {Object.entries(data).map(([category, items]) => (
        <div key={category}>
          <h3 className="text-lg font-semibold mb-2 text-pink-700">{category}</h3>
          <ul className="space-y-2">
            {items.map(item => (
              <li key={item}>
                <label className="flex items-center space-x-3 cursor-pointer">
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

export default HospitalBagChecklist;
