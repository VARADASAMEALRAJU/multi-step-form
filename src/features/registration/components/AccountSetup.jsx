import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { accountSchema } from '../schemas/validation';
import { useFormStore } from '../store/useFormStore';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';

export default function AccountSetup() {
  const { formData, updateFormData, nextStep, prevStep } = useFormStore();
  const [isValidating, setIsValidating] = useState(false);

  const { register, handleSubmit, watch, formState: { errors }, setFocus } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: formData,
    mode: 'onChange' 
  });

  // Watch both fields for real-time comparison
  const passwordValue = watch("password", "");
  const confirmPasswordValue = watch("confirmPassword", "");

  // 1. Password Strength Logic
  const hasMinLength = passwordValue.length >= 8;
  const hasUppercase = /[A-Z]/.test(passwordValue);
  const hasLowercase = /[a-z]/.test(passwordValue);
  const hasNumber = /[0-9]/.test(passwordValue);
  const hasSpecial = /[^A-Za-z0-9]/.test(passwordValue);

  const isStrong = hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecial;

  // 2. Confirm Match Logic
  const isMatch = confirmPasswordValue === passwordValue && confirmPasswordValue !== "" && isStrong;

  useEffect(() => { setFocus('username'); }, [setFocus]);

  const onSubmit = async (data) => {
    setIsValidating(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsValidating(false);
    updateFormData(data);
    nextStep();
  };

  // Helper component for the visible green tick
  const GreenTick = () => (
    <span className="absolute right-3 top-[38px] flex items-center justify-center pointer-events-none">
      <svg 
        className="w-5 h-5 text-green-500" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        strokeWidth="3.5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl font-bold mb-6 text-gray-800">Account Setup</h2>
      
      <Input label="Username" id="username" {...register('username')} error={errors.username} />
      
      {/* Password Field */}
      <div className="relative">
        <Input 
          label="Password" 
          id="password" 
          type="password" 
          {...register('password')} 
          error={errors.password} 
        />
        {isStrong && <GreenTick />}
      </div>

      {/* Confirm Password Field */}
      <div className="relative mt-2">
        <Input 
          label="Confirm Password" 
          id="confirmPassword" 
          type="password" 
          {...register('confirmPassword')} 
          error={errors.confirmPassword} 
        />
        {isMatch && <GreenTick />}
      </div>
      
      <div className="flex justify-between mt-8">
        <Button type="button" variant="secondary" onClick={prevStep}>Previous</Button>
        <Button type="submit" disabled={isValidating}>
          {isValidating ? "Checking..." : "Next Step"}
        </Button>
      </div>
    </form>
  );
}