import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { faker } from '@faker-js/faker';
import { Search } from 'lucide-react';

const babyNames = Array.from({ length: 200 }, () => faker.person.firstName());

const BabyNamesGuide: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNames = useMemo(() => {
    if (!searchTerm) return babyNames.slice(0, 50);
    return babyNames.filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder={currentLanguage.code === 'ar' ? 'ابحث عن اسم...' : 'Search for a name...'}
          className="w-full pl-9 p-2 border rounded-lg"
        />
      </div>
      <ul className="max-h-80 overflow-y-auto grid grid-cols-2 md:grid-cols-3 gap-2 pr-2">
        {filteredNames.map(name => (
          <li key={name} className="p-2 bg-gray-50 rounded text-center text-gray-700">{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default BabyNamesGuide;
