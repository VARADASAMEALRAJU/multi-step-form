import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useFormStore = create(
  persist(
    (set) => ({
      currentStep: 0,
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        age: '',
        address: '',
        country: '', // Added for REST Countries API integration
        city: '',
        zipCode: '',
        username: '',
        password: '',
        confirmPassword: '',
      },

      // Actions
      setStep: (step) => set({ currentStep: step }),
      
      nextStep: () => set((state) => ({ 
        currentStep: state.currentStep + 1 
      })),
      
      prevStep: () => set((state) => ({ 
        currentStep: Math.max(0, state.currentStep - 1) 
      })),
      
      updateFormData: (data) => set((state) => ({
        formData: { ...state.formData, ...data }
      })),

      resetForm: () => {
        // Clear localStorage and reset state to initial values
        set({
          currentStep: 0,
          formData: {
            firstName: '', 
            lastName: '', 
            email: '', 
            phone: '', 
            age: '',
            address: '', 
            country: '', // Added reset logic
            city: '', 
            zipCode: '', 
            username: '', 
            password: '', 
            confirmPassword: ''
          }
        });
        localStorage.removeItem('registration-storage');
      },
    }),
    {
      name: 'registration-storage', // Key in localStorage
    }
  )
);