import React, { lazy, Suspense } from 'react';
import { X } from 'lucide-react';
import { Tool } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

interface ToolModalProps {
  tool: Tool | null;
  isOpen: boolean;
  onClose: () => void;
}

const toolComponentMap: { [key: string]: React.LazyExoticComponent<React.FC<any>> } = {
  'due-date-calculator': lazy(() => import('./tools/DueDateCalculator')),
  'ideal-weight-calculator': lazy(() => import('./tools/IdealWeightCalculator')),
  'fetal-movement-counter': lazy(() => import('./tools/FetalMovementCounter')),
  'hospital-bag-checklist': lazy(() => import('./tools/HospitalBagChecklist')),
  'ovulation-days-counter': lazy(() => import('./tools/OvulationCalculator')),
  'blood-pressure-tracker': lazy(() => import('./tools/BloodPressureTracker')),
  'food-guide': lazy(() => import('./tools/FoodGuide')),
  'baby-names-guide': lazy(() => import('./tools/BabyNamesGuide')),
  'pregnancy-age-tracker': lazy(() => import('./tools/PregnancyAgeTracker')),
  'daily-calorie-calculator': lazy(() => import('./tools/DailyCalorieCalculator')),
  'newborn-essentials-checklist': lazy(() => import('./tools/NewbornEssentialsChecklist')),
  'maternity-leave-calculator': lazy(() => import('./tools/MaternityLeaveCalculator')),
};

const ComingSoonTool = lazy(() => import('./tools/ComingSoonTool'));

export function ToolModal({ tool, isOpen, onClose }: ToolModalProps) {
  const { currentLanguage } = useLanguage();

  if (!tool) return null;

  const name = currentLanguage.code === 'ar' ? tool.nameAr : tool.nameEn;
  const description = currentLanguage.code === 'ar' ? tool.descriptionAr : tool.descriptionEn;

  const ToolComponent = toolComponentMap[tool.id] || ComingSoonTool;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={onClose}
          />

          <div className="min-h-screen px-4 text-center">
            <div className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{tool.icon}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
                    <p className="text-gray-600">{description}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="min-h-[300px]">
                <Suspense fallback={<div className="flex justify-center items-center h-full"><p>Loading tool...</p></div>}>
                  <ToolComponent tool={tool} />
                </Suspense>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-center">
                  {currentLanguage.code === 'ar' 
                    ? 'تذكري أن هذه الأدوات للمساعدة فقط ولا تغني عن استشارة الطبيب'
                    : 'Remember that these tools are for assistance only and do not replace medical consultation'
                  }
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
