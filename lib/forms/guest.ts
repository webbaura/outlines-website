import { defineForm } from './types';

export const guestForm = defineForm({
  endpoint: '/api/forms/house-party-guest',
  table: 'guests',
  recaptchaAction: 'house_party_guest',
  submitLabel: 'Get invited',
  successCopy: {
    title: "You're on the list",
    body: "We'll be in touch when the next one drops.",
  },
  fields: [
    { key: 'name',      column: 'Name',      label: 'Name',      kind: 'text',  autoComplete: 'name' },
    { key: 'phone',     column: 'Phone',     label: 'Mobile',    kind: 'phone', autoComplete: 'tel' },
    { key: 'email',     column: 'Email',     label: 'Email',     kind: 'email', autoComplete: 'email' },
    { key: 'instagram', column: 'Instagram', label: 'Instagram', kind: 'text',  placeholder: '@yourhandle' },
  ],
});
