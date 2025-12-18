import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addressSchema } from '../schemas/validation';
import { useFormStore } from '../store/useFormStore';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';

export default function AddressInfo() {
  const { formData, updateFormData, nextStep, prevStep } = useFormStore();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { register, handleSubmit, formState: { errors }, setFocus, setValue, reset } = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: formData,
    mode: 'onBlur'
  });

  useEffect(() => {
    // We only fetch if the list is empty to prevent unnecessary re-renders
    fetch('https://restcountries.com/v3.1/all?fields=name,cca2')
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        setCountries(sorted);
        setLoading(false);
        
        // CRITICAL: Use reset to re-apply ALL formData once the dropdown options exist
        // This is more reliable than setValue for complex forms
        reset({ ...formData }); 
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [reset]); // Only depend on reset to avoid loops

  useEffect(() => { setFocus('address'); }, [setFocus]);

  const onSubmit = (data) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl font-bold mb-6 text-gray-800">Address Information</h2>
      
      <Input label="Street Address" id="address" {...register('address')} error={errors.address} />

      <div className="mb-4">
        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
        <select
          id="country"
          {...register('country')}
          disabled={loading} // Disable while loading to prevent user interaction before data is ready
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 
            ${errors.country ? 'border-red-500' : 'border-gray-300'} ${loading ? 'bg-gray-100' : 'bg-white'}`}
        >
          <option value="">{loading ? 'Loading Countries...' : 'Select a country'}</option>
          {countries.map((c) => (
            <option key={c.cca2} value={c.name.common}>
              {c.name.common}
            </option>
          ))}
        </select>
        {errors.country && <p className="mt-1 text-xs text-red-600 font-semibold">{errors.country.message}</p>}
      </div>

      <Input label="City" id="city" {...register('city')} error={errors.city} />
      <Input label="Zip Code" id="zipCode" {...register('zipCode')} error={errors.zipCode} />
      
      <div className="flex justify-between mt-8">
        <Button type="button" variant="secondary" onClick={prevStep}>Previous</Button>
        <Button type="submit">Next Step</Button>
      </div>
    </form>
  );
}