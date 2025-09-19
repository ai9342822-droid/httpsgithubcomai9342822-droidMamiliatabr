export interface Tool {
  id: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  categoryEn: 'Core' | 'Advanced' | 'Supplementary';
  categoryAr: 'أساسية' | 'متقدمة' | 'تكميلية';
  icon: string;
  featured: boolean;
}

export interface BlogPost {
  id: string;
  titleEn: string;
  titleAr: string;
  contentEn: string;
  contentAr: string;
  toolId: string;
  publishDate: string;
  readTime: number;
  tags: string[];
  image: string;
}

export interface Language {
  code: 'en' | 'ar';
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
}

export interface CalculatorResult {
  value: number | string;
  unit?: string;
  description?: string;
  advice?: string;
}
