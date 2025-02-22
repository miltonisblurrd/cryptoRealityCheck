import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '~/routes/categories';

interface ItemDisplayProps {
  usdValue: number;
  selectedCategory: string | null;
}

export default function ItemDisplay({ usdValue, selectedCategory }: ItemDisplayProps) {
  const [itemCounts, setItemCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!selectedCategory || !usdValue) return;
    
    const category = categories[selectedCategory as keyof typeof categories];
    const newItemCounts: Record<string, number> = {};
    
    category.items.forEach(item => {
      newItemCounts[item.name] = Math.floor(usdValue / item.price);
    });
    
    setItemCounts(newItemCounts);
  }, [usdValue, selectedCategory]);

  if (!selectedCategory) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-8 text-center text-gray-500"
      >
        Select a category to see what you could buy
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 space-y-4"
    >
      <h2 className="text-xl font-bold">
        You could buy:
      </h2>
      <AnimatePresence>
        <div className="space-y-3">
          {categories[selectedCategory as keyof typeof categories].items.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
            >
              <span className="font-medium">{item.name}</span>
              <motion.div 
                className="flex items-center gap-2"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
              >
                <motion.span 
                  className="text-lg font-bold"
                  animate={{ opacity: [0, 1], y: [20, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  {itemCounts[item.name] || 0}x
                </motion.span>
                <span className="text-sm text-gray-500">
                  (${item.price.toLocaleString()}/each)
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </motion.div>
  );
}