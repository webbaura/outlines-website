'use client';

import { useState } from 'react';
import FormField from './FormField';
import SubmitButton from './SubmitButton';
import Honeypot from './Honeypot';
import RecaptchaNotice from './RecaptchaNotice';
import { useFormSubmit } from '@/lib/useFormSubmit';

export default function HousePartyGuestForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', instagram: '' });
  const { state, fieldErrors, submit, warmCaptcha } = useFormSubmit(
    '/api/forms/house-party-guest',
    { recaptchaAction: 'house_party_guest' },
  );

  const onChange = (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget as HTMLFormElement);
    await submit({
      ...form,
      _hp: fd.get('_hp'),
    });
  };

  if (state.status === 'success') {
    return (
      <div className="text-center py-12">
        <p className="text-xs font-[family-name:var(--font-montserrat)] text-white/40 uppercase tracking-[0.15em] mb-4">
          You&apos;re on the list
        </p>
        <p className="text-white/70">We&apos;ll be in touch when the next one drops.</p>
      </div>
    );
  }

  const submitting = state.status === 'submitting';

  return (
    <form
      onSubmit={handleSubmit}
      onFocus={warmCaptcha}
      className="flex flex-col gap-6"
      noValidate
    >
      <Honeypot />

      <FormField
        label="Name"
        name="name"
        type="text"
        autoComplete="name"
        required
        disabled={submitting}
        value={form.name}
        onChange={onChange('name')}
        error={fieldErrors.name}
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
        label="Instagram"
        name="instagram"
        type="text"
        placeholder="@yourhandle"
        required
        disabled={submitting}
        value={form.instagram}
        onChange={onChange('instagram')}
        error={fieldErrors.instagram}
      />

      {state.status === 'error' && (
        <p className="text-white/70 text-sm border border-white/15 px-4 py-3" role="alert">
          {state.message}
        </p>
      )}

      <div className="pt-2 flex flex-col gap-4">
        <SubmitButton label="Get invited" loading={submitting} />
        <RecaptchaNotice />
      </div>
    </form>
  );
}
