import { useState } from 'react';

export default function FilterControls({
    minAttempts,
    maxAttempts,
    onMinChange,
    onMaxChange,
  }: {
    minAttempts: number;
    maxAttempts: number;
    onMinChange: (value: number) => void;
    onMaxChange: (value: number) => void;
  }) {
    const [minInput, setMinInput] = useState(minAttempts.toString());
    const [maxInput, setMaxInput] = useState(maxAttempts.toString());
    const [errors, setErrors] = useState({
      min: '',
      max: '',
      general: ''
    });
  
    const validateAndUpdateMin = (value: string) => {
      setMinInput(value);
      const newErrors = { ...errors, min: '', general: '' };

      const numValue = parseInt(value);
  
      if (isNaN(numValue)) {
        newErrors.min = 'Please enter a valid number';
        setErrors(newErrors);
        return;
      }
  
      if (numValue > 1000) {
        newErrors.min = 'Minimum attempts cannot exceed 1000';
        setErrors(newErrors);
        return;
      }
  
      if (numValue > maxAttempts) {
        newErrors.general = 'Minimum attempts cannot be greater than maximum attempts';
        setErrors(newErrors);
        return;
      }
  
      setErrors(newErrors);
      onMinChange(numValue);
    };
  
    const validateAndUpdateMax = (value: string) => {
      setMaxInput(value);
      const newErrors = { ...errors, max: '', general: '' };
      
      const numValue = parseInt(value);
  
      if (isNaN(numValue)) {
        newErrors.max = 'Please enter a valid number';
        setErrors(newErrors);
        return;
      }
  
      if (numValue < minAttempts) {
        newErrors.general = 'Maximum attempts cannot be less than minimum attempts';
        setErrors(newErrors);
        return;
      }
  
      if (numValue > 1000) {
        newErrors.max = 'Maximum attempts cannot exceed 1000';
        setErrors(newErrors);
        return;
      }
  
      setErrors(newErrors);
      onMaxChange(numValue);
    };
    return (
      <div className="flex gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-500">
            Min Attempts
          </label>
          <input
            type="number"
            value={minInput}
            onChange={(e) => validateAndUpdateMin(e.target.value)}
            className="mt-1 p-2 border rounded bg-black"
          />
          {errors.min && (
            <p className="text-sm text-red-500 mt-1">{errors.min}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">
            Max Attempts
          </label>
          <input
            type="number"
            value={maxInput}
            onChange={(e) => validateAndUpdateMax(e.target.value)}
            className="mt-1 p-2 border rounded bg-black"
          />
          {errors.max && (
            <p className="text-sm text-red-500 mt-1">{errors.max}</p>
          )}
        </div>
        {errors.general && (
          <p className="text-sm text-red-500">{errors.general}</p>
        )}
      </div>
    );
  }