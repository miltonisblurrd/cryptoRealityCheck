import { useState } from 'react';

interface CryptoInputProps {
  onValueChange: (value: number, crypto: 'ETH' | 'BTC') => void;
}

export default function CryptoInput({ onValueChange }: CryptoInputProps) {
  const [amount, setAmount] = useState<string>('');
  const [selectedCrypto, setSelectedCrypto] = useState<'ETH' | 'BTC'>('ETH');

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    onValueChange(Number(value), selectedCrypto);
  };

  const handleCryptoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCrypto = e.target.value as 'ETH' | 'BTC';
    setSelectedCrypto(newCrypto);
    onValueChange(Number(amount), newCrypto);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex gap-4">
        <select
          className="p-2 border rounded"
          value={selectedCrypto}
          onChange={handleCryptoChange}
        >
          <option value="ETH">ETH</option>
          <option value="BTC">BTC</option>
        </select>
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter amount"
          className="p-2 border rounded flex-1"
          step="any"
        />
      </div>
    </div>
  );
}