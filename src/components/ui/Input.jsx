import React from 'react';

export const Input = React.forwardRef(({ label, error, id, ...props }, ref) => {
  const errorId = `${id}-error`;

  return (
    <div className="mb-4 w-full text-left">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        {...props}
        id={id}
        ref={ref}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? errorId : undefined}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500'}`}
      />
      {error && (
        <p id={errorId} className="mt-1 text-xs text-red-600 font-semibold" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";