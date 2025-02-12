import { useState } from 'react';

export default function SearchBar({ 
    value, 
    onChange 
  }: { 
    value: string; 
    onChange: (value: string) => void 
  }) {
    const [error, setError] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      
      if (/[<>{}@]/.test(newValue)) {
        setError('Special characters <>{}@ are not allowed');
        return;
      }
  
      setError('');
      onChange(newValue);
    };
    return (
      <div className="space-y-2">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search by name..."
        className={`w-full p-2 border rounded bg-black ${
          error ? 'border-red-500' : 'border-gray-600'
        }`}
      />
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
    );
  }