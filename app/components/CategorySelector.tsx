import { categories, Category } from '~/routes/categories';

interface CategorySelectorProps {
  selectedCategory: Category | null;
  onSelectCategory: (category: Category) => void;
}

export default function CategorySelector({ selectedCategory, onSelectCategory }: CategorySelectorProps) {
  return (
    <div className="flex gap-2 p-4 overflow-x-auto">
      {Object.entries(categories).map(([key, category]) => (
        <button
          key={key}
          onClick={() => onSelectCategory(key as Category)}
          className={`
            px-4 py-2 rounded-full whitespace-nowrap
            ${selectedCategory === key 
              ? 'bg-blue-600 text-white' 
              : 'bg-white hover:bg-gray-100'}
          `}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
