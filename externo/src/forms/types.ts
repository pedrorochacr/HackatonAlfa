import { FormValues } from '@/app/inscricao/page';

export type FormElement = 'input' | 'select';
export type InputType =
  | 'text'
  | 'number'
  | 'date'
  | 'email'
  | 'password'
  | 'file'
  | 'radio'
  | 'checkbox'
  | 'inputarea';
export type FormInput = {
  name: keyof FormValues;
  element: FormElement;
  inputType?: InputType;
  label: string;
  placeholder: string;
  options?: string[];
  inline?: boolean;
};
