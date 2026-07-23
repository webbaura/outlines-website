import { defineForm } from './types';

export const labelForm = defineForm({
  endpoint: '/api/forms/music-label',
  table: 'label',
  recaptchaAction: 'label_submission',
  submitLabel: 'Submit to label',
  gap: 'lg',
  successCopy: {
    title: 'Submitted',
    body: "Thanks for sending your music through. If it's a fit for Outlines Recordings, we'll be in touch.",
  },
  fields: [
    { key: 'fullName',   column: 'FullName',   label: 'Full name',       kind: 'text',        autoComplete: 'name',  layout: 'half' },
    { key: 'artistName', column: 'ArtistName', label: 'Artist name',     kind: 'text',        layout: 'half' },
    { key: 'email',      column: 'Email',      label: 'Email',           kind: 'email',       autoComplete: 'email', layout: 'half' },
    { key: 'phone',      column: 'Phone',      label: 'Mobile',          kind: 'phone',       autoComplete: 'tel',   layout: 'half' },
    { key: 'instagram',  column: 'Instagram',  label: 'Instagram',       kind: 'text',        placeholder: '@yourhandle', layout: 'half' },
    { key: 'soundcloud', column: 'SoundCloud', label: 'SoundCloud',      kind: 'optionalUrl', placeholder: 'https://soundcloud.com/…', layout: 'half' },
    {
      key: 'trackLinks',
      column: 'TrackLinks',
      label: 'Track links',
      kind: 'urlList',
      placeholder: 'https://…',
      addLabel: 'Add another track',
      maxItems: 10,
      hint: 'Private SoundCloud, Dropbox, WeTransfer or streaming links. Add one per track.',
    },
    {
      key: 'about',
      column: 'About',
      label: 'About the music',
      kind: 'longtext',
      rows: 5,
      maxLength: 4000,
      hint: 'Tell us about the release, the sound, and why Outlines is the right home for it.',
    },
  ],
});
