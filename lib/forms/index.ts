// Registry of every form config. Scripts iterate this to derive NocoDB
// schema (setup) and to verify the deployed schema (verify).

import type { FormConfig } from './types';
import { djForm } from './dj';
import { guestForm } from './guest';
import { hostForm } from './host';
import { newsletterForm } from './newsletter';

export const FORM_CONFIGS: readonly FormConfig[] = [
  djForm,
  guestForm,
  hostForm,
  newsletterForm,
];

export { djForm, guestForm, hostForm, newsletterForm };
