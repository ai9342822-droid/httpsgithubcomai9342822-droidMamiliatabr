import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const FetalMovementCounter: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [kicks, setKicks] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => setTimer(t => t + 1), 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive]);
  
  const handleStart = () => {
    setKicks(0);
    setTimer(0);
    setIsActive(true);
  };

  const handleKick = () => {
    if (isActive) setKicks(k => k + 1);
  };

  const handleReset = () => {
    setIsActive(false);
    setKicks(0);
    setTimer(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-center space-y-6">
      <div className="w-48 h-48 mx-auto rounded-full bg-pink-100 flex flex-col justify-center items-center">
        <p className="text-5xl font-bold text-pink-600">{kicks}</p>
        <p className="text-pink-700">{currentLanguage.code === 'ar' ? 'ركلات' : 'Kicks'}</p>
      </div>
      <p className="text-2xl font-mono text-gray-700">{formatTime(timer)}</p>
      
      <div className="space-y-3">
        {!isActive ? (
          <button onClick={handleStart} className="btn-primary w-full py-4">
            {currentLanguage.code === 'ar' ? 'بدء الجلسة' : 'Start Session'}
          </button>
        ) : (
          <button onClick={handleKick} className="bg-gradient-to-r from-green-500 to-green-600 text-white font-medium px-6 py-4 rounded-lg shadow-md w-full">
            {currentLanguage.code === 'ar' ? 'تسجيل ركلة' : 'Log a Kick'}
          </button>
        )}
        <button onClick={handleReset} className="btn-secondary w-full">
          {currentLanguage.code === 'ar' ? 'إعادة تعيين' : 'Reset'}
        </button>
      </div>
    </div>
  );
};

export default FetalMovementCounter;
