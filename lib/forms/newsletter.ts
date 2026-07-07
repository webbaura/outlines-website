import { defineForm } from './types';

// Rendered by the bespoke EmailSignup component (not SchemaForm) because it
// lives inline in headers/footers as a single-row control. Both share this
// config so endpoint, action, and column names stay in one place.
export const newsletterForm = defineForm({
  endpoint: '/api/forms/newsletter',
  table: 'newsletter',
  recaptchaAction: 'newsletter',
  submitLabel: 'Stay in the loop',
  successCopy: {
    title: "You're in",
    body: "We'll be in touch.",
  },
  fields: [
    { key: 'email',  column: 'Email',  label: 'Email',  kind: 'email' },
    // Set by EmailSignup props (which page it fired from). Sanitised, never
    // rejected — falls back to 'unknown' if missing/oversized.
    {
      key: 'source', column: 'Source', label: 'Source', kind: 'text',
      hidden: true, required: false, maxLength: 64, defaultValue: 'unknown',
    },
  ],
});
