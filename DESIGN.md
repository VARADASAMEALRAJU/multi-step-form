# Project Design & Architecture

## State Management
I chose **Zustand** for state management because of its lightweight nature and built-in `persist` middleware. This allowed me to easily satisfy the requirement for **LocalStorage persistence** without writing complex manual logic to sync the form state.

## Form Handling & Validation
I used **React Hook Form** combined with **Zod** for schema-based validation. This ensures:
- **Real-time feedback**: Users see errors immediately.
- **Security**: Complex password requirements are enforced via regex.
- **Type Safety**: The form data structure is strictly defined.

## API Integration
The **REST Countries API** was used to populate the country selection. To ensure data persistence when navigating back from the Review screen, I implemented a manual sync using the `reset` method to ensure the asynchronous data matches the stored state.

## Accessibility
The form is designed with accessibility in mind, using semantic HTML, proper label-input associations, and focus management to ensure a good experience for keyboard and screen-reader users.