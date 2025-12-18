import React from 'react';
import { useFormStore } from '../store/useFormStore';
import { Button } from '../../../components/ui/Button';

export default function ReviewSummary() {
  const { formData, setStep, prevStep, resetForm } = useFormStore();

  const handleFinalSubmit = () => {
    // Log data to console to prove storage worked before clearing
    console.log("Final Submitted Data:", formData);
    alert("Form Submitted Successfully!");
    resetForm(); // Clears Zustand state and LocalStorage
    window.location.reload();
  };

  const Section = ({ title, data, stepIndex }) => (
    <div className="mb-6 p-4 border rounded-lg bg-gray-50 relative group">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-blue-800">{title}</h3>
        <button 
          onClick={() => setStep(stepIndex)}
          className="text-sm text-blue-600 hover:underline font-medium"
        >
          Edit
        </button>
      </div>
      {Object.entries(data).map(([key, value]) => (
        <p key={key} className="text-sm text-gray-700 capitalize">
          <span className="font-semibold">{key.replace(/([A-Z])/g, ' $1')}:</span> {value || "Not provided"}
        </p>
      ))}
    </div>
  );

  return (
    <div>
      <h2 className="text-xl font-bold mb-6 text-gray-800">Review Your Information</h2>
      
      <Section title="Personal" stepIndex={0} data={{
        "Name": `${formData.firstName} ${formData.lastName}`,
        "Email": formData.email,
        "Phone": formData.phone,
        "Age": formData.age
      }} />

      {/* UPDATED ADDRESS SECTION */}
      <Section title="Address" stepIndex={1} data={{
        "Street Address": formData.address,
        "Country": formData.country, // <-- ADD THIS LINE
        "City": formData.city,
        "Zip Code": formData.zipCode
      }} />

      <Section title="Account" stepIndex={2} data={{
        "Username": formData.username
      }} />

      <div className="flex justify-between mt-8 pt-4 border-t">
        <Button type="button" variant="secondary" onClick={prevStep}>Previous</Button>
        <Button onClick={handleFinalSubmit} className="bg-green-600 hover:bg-green-700 text-white">
          Submit Registration
        </Button>
      </div>
    </div>
  );
}