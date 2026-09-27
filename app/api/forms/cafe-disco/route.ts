import { handleFormSubmit } from '@/lib/forms/handler';
import { cafeDiscoForm } from '@/lib/forms/cafeDisco';

export const POST = handleFormSubmit(cafeDiscoForm);
