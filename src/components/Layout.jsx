import React from 'react';

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-slate-200">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-extrabold text-slate-900">Create Your Account</h1>
          <p className="text-slate-500 text-sm mt-1">Join our community in just a few steps.</p>
        </div>
        {children}
      </div>
      <footer className="mt-8 text-slate-400 text-xs">
        &copy; 2025 Registration Portal. Accessible & Secure.
      </footer>
    </div>
  );
};