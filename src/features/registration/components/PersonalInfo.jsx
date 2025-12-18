import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { personalSchema } from '../schemas/validation';
import { useFormStore } from '../store/useFormStore';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';

export default function PersonalInfo() {
  const { formData, updateFormData, nextStep } = useFormStore();
  
  const { register, handleSubmit, formState: { errors }, setFocus } = useForm({
    resolver: zodResolver(personalSchema),
    defaultValues: formData,
    mode: 'onBlur' // Real-time validation on blur
  });

  // Focus first field on mount (A11y requirement)
  useEffect(() => {
    setFocus('firstName');
  }, [setFocus]);

  const onSubmit = (data) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className="text-xl font-bold mb-6 text-gray-800">Personal Details</h2>
      <Input label="First Name" id="firstName" {...register('firstName')} error={errors.firstName} />
      <Input label="Last Name" id="lastName" {...register('lastName')} error={errors.lastName} />
      <Input label="Email Address" id="email" type="email" {...register('email')} error={errors.email} />
      <Input label="Phone Number" id="phone" {...register('phone')} error={errors.phone} placeholder="1234567890" />
      <Input label="Age" id="age" type="number" {...register('age')} error={errors.age} />
      
      <div className="flex justify-end mt-8">
        <Button type="submit">Next Step</Button>
      </div>
    </form>
  );
}