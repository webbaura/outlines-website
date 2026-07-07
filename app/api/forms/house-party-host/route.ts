import { handleFormSubmit } from '@/lib/forms/handler';
import { hostForm } from '@/lib/forms/host';

export const POST = handleFormSubmit(hostForm);
