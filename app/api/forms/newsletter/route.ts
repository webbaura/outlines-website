import { handleFormSubmit } from '@/lib/forms/handler';
import { newsletterForm } from '@/lib/forms/newsletter';

export const POST = handleFormSubmit(newsletterForm);
