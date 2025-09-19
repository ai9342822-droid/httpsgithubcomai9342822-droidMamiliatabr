import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Plus, Trash2 } from 'lucide-react';

interface Reading {
  id: number;
  date: string;
  systolic: string;
  diastolic: string;
  glucose?: string;
}

const BloodPressureTracker: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [readings, setReadings] = useState<Reading[]>(() => {
    const saved = localStorage.getItem('bpReadings');
    return saved ? JSON.parse(saved) : [];
  });
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [glucose, setGlucose] = useState('');

  useEffect(() => {
    localStorage.setItem('bpReadings', JSON.stringify(readings));
  }, [readings]);

  const addReading = () => {
    if (!systolic || !diastolic) return;
    const newReading: Reading = {
      id: Date.now(),
      date: new Date().toISOString(),
      systolic,
      diastolic,
      glucose: glucose || undefined,
    };
    setReadings([newReading, ...readings]);
    setSystolic('');
    setDiastolic('');
    setGlucose('');
  };
  
  const deleteReading = (id: number) => {
    setReadings(readings.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="p-4 border rounded-lg space-y-3">
        <h3 className="font-semibold">{currentLanguage.code === 'ar' ? 'إضافة قراءة جديدة' : 'Add New Reading'}</h3>
        <div className="grid grid-cols-2 gap-3">
          <input type="number" value={systolic} onChange={e => setSystolic(e.target.value)} placeholder={currentLanguage.code === 'ar' ? 'الانقباضي' : 'Systolic'} className="w-full p-2 border rounded" />
          <input type="number" value={diastolic} onChange={e => setDiastolic(e.target.value)} placeholder={currentLanguage.code === 'ar' ? 'الانبساطي' : 'Diastolic'} className="w-full p-2 border rounded" />
        </div>
        <input type="number" value={glucose} onChange={e => setGlucose(e.target.value)} placeholder={currentLanguage.code === 'ar' ? 'الجلوكوز (اختياري)' : 'Glucose (optional)'} className="w-full p-2 border rounded" />
        <button onClick={addReading} className="btn-primary w-full flex items-center justify-center"><Plus className="w-4 h-4 mr-2" />{currentLanguage.code === 'ar' ? 'إضافة' : 'Add'}</button>
      </div>
      <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
        {readings.map(r => (
          <div key={r.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold">{r.systolic}/{r.diastolic} <span className="text-sm text-gray-500">mmHg</span></p>
              {r.glucose && <p className="text-sm text-gray-600">{currentLanguage.code === 'ar' ? 'الجلوكوز:' : 'Glucose:'} {r.glucose} mg/dL</p>}
              <p className="text-xs text-gray-400">{new Date(r.date).toLocaleString()}</p>
            </div>
            <button onClick={() => deleteReading(r.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BloodPressureTracker;
