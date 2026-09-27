import { defineForm } from './types';

export const cafeDiscoForm = defineForm({
  endpoint: '/api/forms/cafe-disco',
  table: 'cafeDisco',
  recaptchaAction: 'cafe_disco_rsvp',
  submitLabel: 'RSVP',
  successCopy: {
    title: 'See you on the dancefloor',
    body: "We'll drop the details before the next one.",
  },
  fields: [
    { key: 'name',      column: 'Name',      label: 'Name',      kind: 'text',  autoComplete: 'name' },
    { key: 'phone',     column: 'Phone',     label: 'Mobile',    kind: 'phone', autoComplete: 'tel' },
    { key: 'email',     column: 'Email',     label: 'Email',     kind: 'email', autoComplete: 'email' },
    { key: 'instagram', column: 'Instagram', label: 'Instagram', kind: 'instagram', placeholder: '@yourhandle' },
  ],
});
