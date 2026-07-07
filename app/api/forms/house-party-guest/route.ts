import { handleFormSubmit } from '@/lib/forms/handler';
import { guestForm } from '@/lib/forms/guest';

export const POST = handleFormSubmit(guestForm);
