'use client';

import { useState } from 'react';
import FormField from './FormField';
import FormTextarea from './FormTextarea';
import SubmitButton from './SubmitButton';
import Honeypot from './Honeypot';
import RecaptchaNotice from './RecaptchaNotice';
import { useFormSubmit } from '@/lib/useFormSubmit';

const INITIAL = {
  fullName: '',
  djName: '',
  dob: '',
  email: '',
  phone: '',
  genres: '',
  instagram: '',
  tiktok: '',
  soundcloud: '',
  experience: '',
  support: '',
};

type FieldKey = keyof typeof INITIAL;

export default function DJApplicationForm() {
  const [form, setForm] = useState(INITIAL);
  const { state, fieldErrors, submit, warmCaptcha } = useFormSubmit(
    '/api/forms/dj',
    { recaptchaAction: 'dj_application' },
  );

  const onChange =
    (key: FieldKey) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget as HTMLFormElement);
    await submit({ ...form, _hp: fd.get('_hp') });
  };

  if (state.status === 'success') {
    return (
      <div className="text-center py-16">
        <p className="text-xs font-[family-name:var(--font-montserrat)] text-white/40 uppercase tracking-[0.15em] mb-4">
          Submitted
        </p>
        <p className="text-white/70 max-w-md mx-auto">
          Thanks for putting your name forward. If you&apos;re a fit, we&apos;ll reach out.
        </p>
      </div>
    );
  }

  const submitting = state.status === 'submitting';

  return (
    <form
      onSubmit={handleSubmit}
      onFocus={warmCaptcha}
      className="flex flex-col gap-7"
      noValidate
    >
      <Honeypot />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7">
        <FormField
          label="Full name"
          name="fullName"
          autoComplete="name"
          required
          disabled={submitting}
          value={form.fullName}
          onChange={onChange('fullName')}
          error={fieldErrors.fullName}
        />
        <FormField
          label="DJ name"
          name="djName"
          required
          disabled={submitting}
          value={form.djName}
          onChange={onChange('djName')}
          error={fieldErrors.djName}
        />
        <FormField
          label="Date of birth"
          name="dob"
          type="date"
          required
          disabled={submitting}
          value={form.dob}
          onChange={onChange('dob')}
          error={fieldErrors.dob}
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
          disabled={submitting}
          value={form.email}
          onChange={onChange('email')}
          error={fieldErrors.email}
        />
        <FormField
          label="Mobile"
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          disabled={submitting}
          value={form.phone}
          onChange={onChange('phone')}
          error={fieldErrors.phone}
        />
        <FormField
          label="Genres"
          name="genres"
          placeholder="Tech house, melodic, garage…"
          required
          disabled={submitting}
          value={form.genres}
          onChange={onChange('genres')}
          error={fieldErrors.genres}
        />
        <FormField
          label="Instagram"
          name="instagram"
          placeholder="@yourhandle"
          required
          disabled={submitting}
          value={form.instagram}
          onChange={onChange('instagram')}
          error={fieldErrors.instagram}
        />
        <FormField
          label="TikTok (optional)"
          name="tiktok"
          placeholder="@yourhandle or URL"
          disabled={submitting}
          value={form.tiktok}
          onChange={onChange('tiktok')}
          error={fieldErrors.tiktok}
        />
      </div>

      <FormField
        label="SoundCloud link"
        name="soundcloud"
        type="url"
        inputMode="url"
        placeholder="https://soundcloud.com/…"
        required
        disabled={submitting}
        value={form.soundcloud}
        onChange={onChange('soundcloud')}
        error={fieldErrors.soundcloud}
      />

      <FormTextarea
        label="Previous experience"
        name="experience"
        rows={5}
        required
        disabled={submitting}
        value={form.experience}
        onChange={onChange('experience')}
        hint="Tell us where you have played, any residencies, mixes, releases, radio shows, or relevant music experience."
        error={fieldErrors.experience}
      />

      <FormTextarea
        label="How can you support Outlines?"
        name="support"
        rows={5}
        required
        disabled={submitting}
        value={form.support}
        onChange={onChange('support')}
        hint="Think social media promotion, inviting your network, bringing the right crowd, creating content, or supporting the event beyond your set. We work with DJs who treat Outlines like something they are helping build."
        error={fieldErrors.support}
      />

      {state.status === 'error' && (
        <p className="text-white/70 text-sm border border-white/15 px-4 py-3" role="alert">
          {state.message}
        </p>
      )}

      <div className="pt-4 flex flex-col gap-4">
        <SubmitButton label="Submit interest" loading={submitting} />
        <RecaptchaNotice />
      </div>
    </form>
  );
}
