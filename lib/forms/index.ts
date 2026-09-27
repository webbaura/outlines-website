// Registry of every form config. Scripts iterate this to derive NocoDB
// schema (setup) and to verify the deployed schema (verify).

import type { FormConfig } from './types';
import { cafeDiscoForm } from './cafeDisco';
import { djForm } from './dj';
import { guestForm } from './guest';
import { hostForm } from './host';
import { labelForm } from './label';
import { newsletterForm } from './newsletter';

export const FORM_CONFIGS: readonly FormConfig[] = [
  cafeDiscoForm,
  djForm,
  guestForm,
  hostForm,
  labelForm,
  newsletterForm,
];

export { cafeDiscoForm, djForm, guestForm, hostForm, labelForm, newsletterForm };
