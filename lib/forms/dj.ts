import { defineForm } from './types';

export const djForm = defineForm({
  endpoint: '/api/forms/dj',
  table: 'djs',
  recaptchaAction: 'dj_application',
  submitLabel: 'Submit interest',
  gap: 'lg',
  successCopy: {
    title: 'Submitted',
    body: "Thanks for putting your name forward. If you're a fit, we'll reach out.",
  },
  fields: [
    { key: 'fullName',  column: 'FullName',  label: 'Full name',        kind: 'text',        autoComplete: 'name', layout: 'half' },
    { key: 'djName',    column: 'DJName',    label: 'DJ name',          kind: 'text',        layout: 'half' },
    { key: 'dob',       column: 'DOB',       label: 'Date of birth',    kind: 'date',        layout: 'half' },
    { key: 'email',     column: 'Email',     label: 'Email',            kind: 'email',       autoComplete: 'email', layout: 'half' },
    { key: 'phone',     column: 'Phone',     label: 'Mobile',           kind: 'phone',       autoComplete: 'tel',   layout: 'half' },
    { key: 'genres',    column: 'Genres',    label: 'Genres',           kind: 'text',        placeholder: 'Tech house, melodic, garage…', layout: 'half' },
    { key: 'instagram', column: 'Instagram', label: 'Instagram',        kind: 'text',        placeholder: '@yourhandle', layout: 'half' },
    { key: 'tiktok',    column: 'TikTok',    label: 'TikTok (optional)', kind: 'optionalUrl', placeholder: '@yourhandle or URL', layout: 'half' },
    { key: 'soundcloud', column: 'SoundCloud', label: 'SoundCloud link', kind: 'url', placeholder: 'https://soundcloud.com/…' },
    {
      key: 'experience', column: 'Experience', label: 'Previous experience', kind: 'longtext', rows: 5, maxLength: 4000,
      hint: 'Tell us where you have played, any residencies, mixes, releases, radio shows, or relevant music experience.',
    },
    {
      key: 'support', column: 'Support', label: 'How can you support Outlines?', kind: 'longtext', rows: 5, maxLength: 4000,
      hint: 'Think social media promotion, inviting your network, bringing the right crowd, creating content, or supporting the event beyond your set. We work with DJs who treat Outlines like something they are helping build.',
    },
    {
      key: 'producing',
      column: 'Are you producing too? Share details.',
      label: 'Are you producing too?',
      kind: 'longtext',
      required: false,
      rows: 4,
      maxLength: 4000,
    },
  ],
});
