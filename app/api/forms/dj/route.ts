import { handleFormSubmit } from '@/lib/forms/handler';
import { djForm } from '@/lib/forms/dj';

export const POST = handleFormSubmit(djForm);
