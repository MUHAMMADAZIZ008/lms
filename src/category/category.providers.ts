import { Category } from './entities/category.entity';

export const CategoryProviders = [
  {
    provide: 'CATEGORY_REPOSITORY',
    useValue: Category,
  },
];
