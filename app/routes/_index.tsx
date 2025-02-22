import { useState, useEffect } from 'react';
import type { MetaFunction } from '@remix-run/node';
import CryptoInput from '~/components/CryptoInput';
import CategorySelector from '~/components/CategorySelector';
import ItemDisplay from '~/components/ItemDisplay';
import type { Category } from './categories';
import { getPrice } from '~/utils/chainlink';

export const meta: MetaFunction = () => {
  return [
    { title: "Crypto Reality Check" },
    { name: "description", content: "Compare crypto values to real-world items" },
  ];
};

export default function Index() {
  const [cryptoAmount, setCryptoAmount] = useState<number>(0);
  const [cryptoType, setCryptoType] = useState<'ETH' | 'BTC'>('ETH');
  const [usdValue, setUsdValue] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  useEffect(() => {
    async function updatePrice() {
      if (cryptoAmount <= 0) {
        setUsdValue(0);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        const price = await getPrice(cryptoType);
        setUsdValue(price * cryptoAmount);
      } catch (error) {
        setError('Failed to fetch price. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    updatePrice();
  }, [cryptoAmount, cryptoType]);

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Crypto Reality Check
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <CryptoInput 
              onValueChange={(amount, type) => {
                setCryptoAmount(amount);
                setCryptoType(type);
              }} 
            />
            
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">Current Value</h2>
              {loading ? (
                <div>Loading...</div>
              ) : error ? (
                <div className="text-red-500">{error}</div>
              ) : (
                <div className="text-2xl font-bold">
                  ${usdValue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <CategorySelector
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            <ItemDisplay
              usdValue={usdValue}
              selectedCategory={selectedCategory}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
