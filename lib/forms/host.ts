import { defineForm } from './types';

export const hostForm = defineForm({
  endpoint: '/api/forms/house-party-host',
  table: 'hosts',
  recaptchaAction: 'house_party_host',
  submitLabel: 'Apply to host',
  successCopy: {
    title: 'Application received',
    body: "We'll reach out to talk through hosting.",
  },
  fields: [
    { key: 'name',  column: 'Name',  label: 'Name',   kind: 'text',  autoComplete: 'name' },
    { key: 'phone', column: 'Phone', label: 'Mobile', kind: 'phone', autoComplete: 'tel' },
    { key: 'email', column: 'Email', label: 'Email',  kind: 'email', autoComplete: 'email' },
  ],
});
