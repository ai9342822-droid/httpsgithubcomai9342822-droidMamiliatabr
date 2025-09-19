import { faker } from '@faker-js/faker';
import { BlogPost } from '../types';
import { pregnancyTools } from './tools';

export const blogPosts: BlogPost[] = pregnancyTools.map(tool => ({
  id: `blog-${tool.id}`,
  titleEn: `The Ultimate Guide to Using the ${tool.nameEn}`,
  titleAr: `الدليل النهائي لاستخدام ${tool.nameAr}`,
  contentEn: `${faker.lorem.paragraphs(3, '\n\n')}\n\nThis comprehensive guide covers everything you need to know about ${tool.nameEn.toLowerCase()}. ${faker.lorem.paragraphs(4, '\n\n')}`,
  contentAr: `هذا الدليل الشامل يغطي كل ما تحتاجين لمعرفته حول ${tool.nameAr}. \n\n${faker.lorem.paragraphs(3, '\n\n')}\n\n${faker.lorem.paragraphs(4, '\n\n')}`,
  toolId: tool.id,
  publishDate: faker.date.recent({ days: 90 }).toISOString(),
  readTime: faker.number.int({ min: 4, max: 15 }),
  tags: [tool.categoryEn.toLowerCase(), 'pregnancy', 'guide', 'health'],
  image: `https://img-wrapper.vercel.app/image?url=https://placehold.co/600x400/${faker.color.rgb({ prefix: '' })}/FFFFFF?text=${encodeURIComponent(tool.nameEn)}`,
}));
