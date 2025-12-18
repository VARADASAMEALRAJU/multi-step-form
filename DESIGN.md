# Project Design & Architecture

## State Management Approach
I chose **Zustand** for state management because of its lightweight nature and built-in `persist` middleware. This approach allowed me to:
- **Fulfill LocalStorage Persistence**: Successfully save user progress across page reloads without manual sync logic.
- **Manage Multi-step Flow**: Maintain a clean global state that is accessible by all steps (Personal, Address, Account) and the final Review screen.
- **Efficient Reset**: Clear all stored data immediately upon final submission to ensure a clean session for the next user.

## Form Handling & Validation
I utilized **React Hook Form** combined with **Zod** for a schema-driven validation architecture. This ensures:
- **Real-time Feedback**: Users receive immediate error messages (e.g., minimum age of 18, phone number format).
- **Complex Security Policies**: Enforced a strong password policy using regex (uppercase, lowercase, numbers, and special characters).
- **Step-level Blocking**: The form logic prevents users from advancing to the next step until all current fields are valid according to the schema.

## API Integration & State Sync
The **REST Countries API** was integrated to provide a dynamic and searchable list of countries. 
- **The Challenge**: Asynchronous API calls often cause dropdowns to reset to a default "empty" state when navigating backward or forward.
- **The Solution**: I implemented a custom synchronization logic within the Address step's `useEffect` hook. By using the `reset()` method after the API fetch completes, I ensured the dropdown options are populated before the stored form value is re-applied, successfully preserving the user's selection.

## Accessibility & User Experience
The application is designed to be fully navigable and operable for all users:
- **Semantic HTML**: Used proper label-input associations with `id` and `htmlFor` for screen-reader compatibility.
- **Focus Management**: Implemented `setFocus` from React Hook Form within a `useEffect` hook to automatically move focus to the first field of each new step.
- **Visual Feedback**: Added real-time "Green Tick" indicators for password complexity and matching to provide positive reinforcement.
- **Responsive Layout**: Leveraged Tailwind CSS for a mobile-first design that remains functional on tablet and desktop viewports.